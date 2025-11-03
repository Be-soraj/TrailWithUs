import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Ticket } from "lucide-react";
import { Label } from "@/components/ui/label";
import usePost from "@/hooks/usePost";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import PaymentForm from "@/pages/esewa/PaymentForm";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

interface FormData {
  customerName: string;
  customerEmail: string;
  confirmEmail: string;
  customerPhone: string;
  NumberOfTicket: number;
}

interface ApiResponse {
  success: boolean;
  data: {
    _id: string;
    createdAt: string;
    date: string;
    description: string;
    image: string;
    name: string;
    participants: number;
    price: number;
    updatedAt: string;
    __v: number;
    destination: string;
  };
  message: string;
  count: number;
}

export function BookTourForm() {
  const { id: serviceId } = useParams();
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { mutate: createBooking, isPending } = usePost("/booking");

  const { data: apiResponse } = useFetch<ApiResponse>(
    `/services/${serviceId}`,
    ["services"]
  );

  const TicketPrice = apiResponse?.data?.price;

  const onSubmit = (data: FormData) => {
    // Store form data for payment
    setFormData(data);

    const bookingData = {
      serviceId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      NumberOfTicket: data.NumberOfTicket,
    };
    console.log(bookingData);

    createBooking(bookingData, {
      onSuccess: () => {
        toast.success("Booking Successful", {
          description:
            "Your booking has been confirmed! Please complete the payment.",
        });
        setShowPayment(true);
        reset();
      },
      onError: (error: Error) => {
        toast.error("Booking Failed", {
          description: error.message || "Failed to create booking",
        });
      },
    });
  };

  // Calculate amount based on number of tickets (example: $100 per ticket)
  const calculateAmount = (tickets: number): string => {
    const pricePerTicket = TicketPrice ?? 0; // Adjust this based on your pricing
    return (tickets * pricePerTicket).toString();
  };

  return (
    <>
      <Card className="w-full mx-auto shadow-lg rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Book This Tour
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Fill out the form below to reserve your spot. We'll confirm your
            booking shortly.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="customerName"
                className="text-gray-500 font-medium"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="customerName"
                  className="border border-gray-200 h-10 pl-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                  placeholder="John Doe"
                  {...register("customerName", {
                    required: "Name is required",
                  })}
                />
              </div>
              {errors.customerName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.customerName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="customerEmail"
                className="text-gray-500 font-medium"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="customerEmail"
                  type="email"
                  className="border border-gray-200 h-10 pl-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                  placeholder="your@email.com"
                  {...register("customerEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.customerEmail && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.customerEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="customerPhone"
                className="text-gray-500 font-medium"
              >
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="customerPhone"
                  type="tel"
                  className="border border-gray-200 h-10 pl-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                  placeholder="+1 (123) 456-7890"
                  {...register("customerPhone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
              </div>
              {errors.customerPhone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.customerPhone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="NumberOfTicket"
                className="text-gray-500 font-medium"
              >
                Number of Tickets
              </Label>
              <div className="relative">
                <Ticket className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="NumberOfTicket"
                  type="number"
                  placeholder="Enter number of tickets (1-10)"
                  className="border border-gray-200 h-10 pl-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none placeholder:text-gray-200"
                  min="1"
                  max="10"
                  {...register("NumberOfTicket", {
                    required: "Number of tickets is required",
                    min: {
                      value: 1,
                      message: "Minimum 1 ticket",
                    },
                    max: {
                      value: 10,
                      message: "Maximum 10 tickets",
                    },
                    valueAsNumber: true,
                  })}
                />
              </div>
              {errors.NumberOfTicket && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.NumberOfTicket.message}
                </p>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1 h-12" type="button">
                Check Availability
              </Button>
              <Button
                className="flex-1 h-12 hover:bg-[#df6951e3] bg-[#DF6951] text-white"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Booking..." : "Book Now"}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              * Required fields. Your information is secure and will not be
              shared.
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Payment Form Dialog */}
      <PaymentForm
        open={showPayment}
        onOpenChange={setShowPayment}
        amount={formData ? calculateAmount(formData.NumberOfTicket) : "0"}
        customerName={formData?.customerName || ""}
      />
    </>
  );
}
