import React, { useState, type FormEvent } from "react";
import contactUsSVG from "@/assets/ContactUs.svg";
import HeroImg from "@/assets/Services's/tour-packages.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import usePost from "@/hooks/usePost";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export default function ContactUs() {
  const { mutate: post, isPending: loading } = usePost<ApiResponse>("/api/contact");

  const [form, setForm] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await post(form);
  };

  return (
    <div className="relative mb-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
          <img src={contactUsSVG} alt="Contact Us" className="w-2/3 md:w-1/3 h-auto" />
        </div>
        <img
          src={HeroImg}
          alt="Contact Hero"
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover brightness-75 rounded-b-3xl"
        />
      </div>

      {/* Contact Section */}
      <section className="px-4 md:px-12 lg:px-24 py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <Card className="shadow-xl border border-gray-100 rounded-3xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-center text-gray-800">
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="px-10 py-2 text-lg"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Google Map */}
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg">
            <div className="aspect-video w-full h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.9828716551706!2d83.45434074498259!3d27.686924265218074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996867c9efa2843%3A0x3ad80129177b80f1!2sCrimson%20College%20of%20Technology!5e0!3m2!1sen!2snp!4v1762348384819!5m2!1sen!2snp"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
          <Card className="shadow-xl border border-gray-100 rounded-3xl hover:shadow-2xl transition-all duration-300">
            <CardTitle className="px-4">Contact Us</CardTitle>
            <CardContent>
              <p className="mb-2">Email:bijen@gmail.com </p>
              <p className="mb-2">Phone: +977 9841234567</p>
              <p className="mb-2">Address: Butwal, Nepal</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
