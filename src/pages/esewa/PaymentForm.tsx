import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  customerName: string;
}

const PaymentForm = ({ open, onOpenChange, amount, customerName }: PaymentFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    amount: amount,
    tax_amount: "0",
    total_amount: amount,
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/",
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

  // Pre-fill first name from customer name
  useEffect(() => {
    if (customerName) {
      const names = customerName.split(' ');
      setFirstName(names[0] || "");
      setLastName(names.slice(1).join(' ') || "");
    }
  }, [customerName]);

  // Update amount when prop changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      amount: amount,
      total_amount: amount
    }));
  }, [amount]);

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
    // Dialog will close automatically when form submits
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-4 mt-2"
        >
          <div className={`field ${shake.amount ? "shake" : ""}`}>
            <label htmlFor="amount" className="block text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className={`field ${shake.firstName ? "shake" : ""}`}>
            <label htmlFor="fname" className="block text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              value={firstName}
              onChange={handleFirstNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className={`field ${shake.lastName ? "shake" : ""}`}>
            <label htmlFor="lname" className="block text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              value={lastName}
              onChange={handleLastNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hidden fields remain the same */}
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
          <input
            type="hidden"
            name="success_url"
            value={formData.success_url}
          />
          <input
            type="hidden"
            name="failure_url"
            value={formData.failure_url}
          />
          <input
            type="hidden"
            name="signed_field_names"
            value={formData.signed_field_names}
          />
          <input type="hidden" name="signature" value={formData.signature} />

          {error && (
            <div className="error-message text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2 mt-3">
              All input fields are required
            </div>
          )}

          <Button type="submit" className="w-full mt-2">
            Pay via E-Sewa
          </Button>
        </form>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .shake input {
            animation: shake 0.15s ease-in-out 0s 2;
            border-color: #dc3545;
            background-color: #f8d7da;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentForm;