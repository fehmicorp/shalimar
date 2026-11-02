
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";

const enquiryTypes = [
  "Project Enquiry",
  "Property Purchase",
  "Investment Enquiry",
  "Commercial Property",
  "Property Management",
  "Partnership / Business",
  "Careers",
  "General Enquiry",
  "Other",
];

const propertyTypes = [
  "Residential Apartment",
  "Villa / Independent House",
  "Commercial Office",
  "Retail / Showroom",
  "Land / Plot",
  "Not Decided",
];

const budgetRanges = [
  "Below ₹25 Lakhs",
  "₹25 Lakhs – ₹50 Lakhs",
  "₹50 Lakhs – ₹75 Lakhs",
  "₹75 Lakhs – ₹1 Crore",
  "₹1 Crore – ₹2 Crore",
  "₹2 Crore – ₹5 Crore",
  "Above ₹5 Crore",
  "Not Decided",
];

const contactMethods = ["Phone Call", "WhatsApp", "Email"];

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Head Office",
    value: "Lucknow, Uttar Pradesh, India",
    description: "Visit our corporate office.",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91-522-4030444",
    description: "Speak with our team.",
    href: "tel:+915224030444",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "shalimar@shalimar.org",
    description: "Send us your enquiry.",
    href: "mailto:shalimar@shalimar.org",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    value: "Monday – Saturday",
    description: "Contact our team during business hours.",
  },
];

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  enquiryType: string;
  project: string;
  propertyType: string;
  budget: string;
  contactMethod: string;
  message: string;
  consent: boolean;
}

const initialForm: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  enquiryType: "Project Enquiry",
  project: "",
  propertyType: "",
  budget: "",
  contactMethod: "Phone Call",
  message: "",
  consent: false,
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (
    field: keyof ContactFormData,
    value: string | boolean
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSubmitted(false);

    if (!form.consent) {
      setError("Please accept the consent to continue.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: "Website Contact Page",
          pageUrl:
            typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit your enquiry. Please try again."
        );
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "h-12 w-full border border-[#ded3c3] bg-white px-4 text-sm text-[#382b20] outline-none transition placeholder:text-[#a99b89] focus:border-[#a47c43] focus:ring-1 focus:ring-[#a47c43]/20";

  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#574737]";

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ee] text-[#382b20]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#382b20]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#382b20] via-[#382b20]/95 to-[#382b20]/65" />

        <div className="absolute -right-32 -top-40 h-[550px] w-[550px] rounded-full border border-[#b18a50]/20" />
        <div className="absolute -right-16 -top-24 h-[400px] w-[400px] rounded-full border border-[#b18a50]/20" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b18a50]" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36e]">
                Get In Touch
              </p>
            </div>

            <h1 className="font-serif text-5xl leading-tight text-[#f8f5ee] md:text-7xl">
              Let&apos;s Start a
              <span className="block italic text-[#c6a36e]">
                Conversation.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-8 text-[#e3d9c9] md:text-base">
              Whether you are exploring your dream home, considering an
              investment or looking to collaborate, our team is here to
              understand your requirements and help you take the next step.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">

          {/* LEFT INFORMATION */}
          <aside>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
              Connect With Shalimar
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
              We Would Love
              <span className="block italic text-[#a47c43]">
                To Hear From You.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-8 text-[#817361]">
              Tell us what you are looking for. Share your requirements
              with us and our team will get in touch to assist you.
            </p>

            <div className="mt-10 space-y-7">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#d9c9b2] bg-[#f0e9dd]">
                      <Icon
                        size={19}
                        strokeWidth={1.5}
                        className="text-[#a47c43]"
                      />
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.13em]">
                        {item.title}
                      </h3>

                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-2 block text-sm font-medium text-[#a47c43] transition hover:text-[#382b20]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-sm font-medium text-[#574737]">
                          {item.value}
                        </p>
                      )}

                      <p className="mt-1 text-xs text-[#817361]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 border-l-2 border-[#b18a50] bg-[#f0e9dd] p-6">
              <ShieldCheck
                size={24}
                className="text-[#a47c43]"
                strokeWidth={1.4}
              />

              <h3 className="mt-4 font-serif text-xl">
                Your Enquiry Matters
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#817361]">
                Your submitted information will be used to respond to your
                enquiry and coordinate relevant assistance from our team.
              </p>
            </div>
          </aside>

          {/* ENQUIRY FORM */}
          <div className="border border-[#e3d8c8] bg-white p-6 shadow-[0_15px_45px_rgba(56,43,32,0.05)] md:p-10">

            <div className="mb-9 border-b border-[#e9e0d4] pb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
                Customer Enquiry
              </p>

              <h2 className="mt-3 font-serif text-3xl md:text-4xl">
                How Can We Help You?
              </h2>

              <p className="mt-3 text-sm text-[#817361]">
                Please provide your details and requirements below.
              </p>
            </div>

            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3e9]">
                  <CheckCircle2
                    size={34}
                    className="text-[#66865b]"
                  />
                </div>

                <h3 className="mt-6 font-serif text-3xl">
                  Thank You!
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-[#817361]">
                  Your enquiry has been submitted successfully. Our team
                  will review your requirements and get in touch.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center gap-2 bg-[#382b20] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#a47c43]"
                >
                  Submit Another Enquiry
                  <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* PERSONAL INFORMATION */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center bg-[#f0e9dd] text-xs font-semibold text-[#a47c43]">
                      01
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        autoComplete="name"
                        maxLength={100}
                        value={form.fullName}
                        onChange={(e) =>
                          updateField("fullName", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        autoComplete="email"
                        maxLength={254}
                        value={form.email}
                        onChange={(e) =>
                          updateField("email", e.target.value)
                        }
                        placeholder="name@example.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Mobile Number *
                      </label>
                      <input
                        required
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={20}
                        value={form.phone}
                        onChange={(e) =>
                          updateField("phone", e.target.value)
                        }
                        placeholder="+91 XXXXX XXXXX"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        City / Location
                      </label>
                      <input
                        type="text"
                        autoComplete="address-level2"
                        maxLength={100}
                        value={form.city}
                        onChange={(e) =>
                          updateField("city", e.target.value)
                        }
                        placeholder="Your current city"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* ENQUIRY DETAILS */}
                <div className="border-t border-[#e9e0d4] pt-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center bg-[#f0e9dd] text-xs font-semibold text-[#a47c43]">
                      02
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">
                      Enquiry Details
                    </h3>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={labelClass}>
                        Enquiry Type *
                      </label>
                      <select
                        required
                        value={form.enquiryType}
                        onChange={(e) =>
                          updateField("enquiryType", e.target.value)
                        }
                        className={inputClass}
                      >
                        {enquiryTypes.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Interested Project
                      </label>
                      <input
                        type="text"
                        maxLength={150}
                        value={form.project}
                        onChange={(e) =>
                          updateField("project", e.target.value)
                        }
                        placeholder="Enter project name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Property Type
                      </label>
                      <select
                        value={form.propertyType}
                        onChange={(e) =>
                          updateField("propertyType", e.target.value)
                        }
                        className={inputClass}
                      >
                        <option value="">Select property type</option>
                        {propertyTypes.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Expected Budget
                      </label>
                      <select
                        value={form.budget}
                        onChange={(e) =>
                          updateField("budget", e.target.value)
                        }
                        className={inputClass}
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Preferred Contact Method
                      </label>
                      <select
                        value={form.contactMethod}
                        onChange={(e) =>
                          updateField("contactMethod", e.target.value)
                        }
                        className={inputClass}
                      >
                        {contactMethods.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="border-t border-[#e9e0d4] pt-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center bg-[#f0e9dd] text-xs font-semibold text-[#a47c43]">
                      03
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">
                      Your Requirements
                    </h3>
                  </div>

                  <label className={labelClass}>
                    Message *
                  </label>

                  <textarea
                    required
                    rows={5}
                    maxLength={3000}
                    value={form.message}
                    onChange={(e) =>
                      updateField("message", e.target.value)
                    }
                    placeholder="Tell us about your requirements..."
                    className="w-full resize-y border border-[#ded3c3] bg-white px-4 py-4 text-sm text-[#382b20] outline-none transition placeholder:text-[#a99b89] focus:border-[#a47c43] focus:ring-1 focus:ring-[#a47c43]/20"
                  />

                  <p className="mt-2 text-right text-[10px] text-[#a09280]">
                    {form.message.length}/3000 characters
                  </p>
                </div>

                {/* CONSENT */}
                <div className="border-t border-[#e9e0d4] pt-7">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) =>
                        updateField("consent", e.target.checked)
                      }
                      className="mt-1 h-4 w-4 shrink-0 accent-[#a47c43]"
                    />

                    <span className="text-xs leading-6 text-[#817361]">
                      I agree that Shalimar Corp may contact me using the
                      details provided above regarding my enquiry. I have
                      read and understood the{" "}
                      <Link
                        href="/policy/privacy"
                        target="_blank"
                        className="font-semibold text-[#a47c43] underline underline-offset-2"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    role="alert"
                    className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-3 bg-[#b18a50] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#98703b] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Enquiry
                      <Send size={15} />
                    </>
                  )}
                </button>

                <p className="text-[10px] leading-5 text-[#a09280]">
                  Fields marked with * are mandatory. Please provide
                  accurate contact information so our team can respond
                  to your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-[#b18a50]/20 bg-[#f0e9dd]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="font-serif text-2xl">
              Discover the Shalimar experience.
            </p>
            <p className="mt-2 text-sm text-[#817361]">
              Explore our developments and find a space that feels like yours.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#a47c43] transition hover:text-[#382b20]"
          >
            Explore Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
