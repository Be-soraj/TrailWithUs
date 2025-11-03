import   { useState, useEffect } from "react";
import  type { ChangeEvent, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

interface FormData {
  amount: string;
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
  product_service_charge: string;
  product_delivery_charge: string;
  product_code: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

interface ShakeState {
  amount: boolean;
  firstName: boolean;
  lastName: boolean;
}

const Esewahome = () => {
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    tax_amount: "0",
    total_amount: "",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/paymentsuccess",
    failure_url: "http://localhost:5173/paymentfailure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
  });

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [shake, setShake] = useState<ShakeState>({
    amount: false,
    firstName: false,
    lastName: false,
  });

  const secret: string = "8gBm/:&EnhH.1/q";

  const generateSignature = (
    total_amount: string,
    transaction_uuid: string,
    product_code: string
  ): string => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code } = formData;
    if (total_amount) {
      const hashedSignature = generateSignature(
        total_amount,
        transaction_uuid,
        product_code
      );
      setFormData((prev) => ({ ...prev, signature: hashedSignature }));
    }
  }, [formData.total_amount, formData.transaction_uuid]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    if (!formData.amount || !firstName.trim() || !lastName.trim()) {
      e.preventDefault();
      setError(true);

      setShake({
        amount: !formData.amount,
        firstName: !firstName.trim(),
        lastName: !lastName.trim(),
      });

      setTimeout(
        () => setShake({ amount: false, firstName: false, lastName: false }),
        500
      );
      return;
    }
    setError(false);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({
      ...prev,
      amount: e.target.value,
      total_amount: e.target.value,
    }));
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
  };

  return (
    <div>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className={`field ${shake.amount ? "shake" : ""}`}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleAmountChange}
          />
        </div>

        <div className={`field ${shake.firstName ? "shake" : ""}`}>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>

        <div className={`field ${shake.lastName ? "shake" : ""}`}>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>

        <input type="hidden" name="tax_amount" value={formData.tax_amount} />
        <input
          type="hidden"
          name="total_amount"
          value={formData.total_amount}
        />
        <input
          type="hidden"
          name="transaction_uuid"
          value={formData.transaction_uuid}
        />
        <input
          type="hidden"
          name="product_code"
          value={formData.product_code}
        />
        <input
          type="hidden"
          name="product_service_charge"
          value={formData.product_service_charge}
        />
        <input
          type="hidden"
          name="product_delivery_charge"
          value={formData.product_delivery_charge}
        />
        <input type="hidden" name="success_url" value={formData.success_url} />
        <input type="hidden" name="failure_url" value={formData.failure_url} />
        <input
          type="hidden"
          name="signed_field_names"
          value={formData.signed_field_names}
        />
        <input type="hidden" name="signature" value={formData.signature} />

        {error && (
          <div className="error-message">All input fields are required</div>
        )}

        <button type="submit" className="btn">
          Pay via E-Sewa
        </button>
      </form>
    </div>
  );
};

export default Esewahome;