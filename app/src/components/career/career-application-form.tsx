"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Upload,
  X,
} from "lucide-react";

import type { JobRecord } from "@/data/careers";

interface CareerApplicationFormProps {
  job: JobRecord;
}

interface ApplicationFormData {
  fullName: string;
  dateOfBirth: string;
  hometown: string;
  qualification: string;
  qualificationYear: string;
  phone: string;
  email: string;

  currentCompany: string;
  currentLocation: string;
  currentLpa: string;
  currentDesignation: string;
  roleDescription: string;

  linkedinUrl: string;
}

const initialForm: ApplicationFormData = {
  fullName: "",
  dateOfBirth: "",
  hometown: "",
  qualification: "",
  qualificationYear: "",
  phone: "",
  email: "",

  currentCompany: "",
  currentLocation: "",
  currentLpa: "",
  currentDesignation: "",
  roleDescription: "",

  linkedinUrl: "",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function CareerApplicationForm({
  job,
}: CareerApplicationFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ApplicationFormData>(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (
    field: keyof ApplicationFormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const handleResume = (file?: File) => {
    if (!file) return;

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        resume: "Please upload a PDF, DOC or DOCX file.",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((previous) => ({
        ...previous,
        resume: "Resume size must not exceed 5 MB.",
      }));
      return;
    }

    setResume(file);
    setErrors((previous) => ({
      ...previous,
      resume: "",
    }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!form.dateOfBirth) {
      nextErrors.dateOfBirth = "Date of birth is required.";
    }

    if (!form.hometown.trim()) {
      nextErrors.hometown = "Native / hometown city is required.";
    }

    if (!form.qualification.trim()) {
      nextErrors.qualification = "Highest qualification is required.";
    }

    if (
      !form.qualificationYear ||
      !/^\d{4}$/.test(form.qualificationYear) ||
      Number(form.qualificationYear) > new Date().getFullYear()
    ) {
      nextErrors.qualificationYear = "Enter a valid completed year.";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) {
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.currentCompany.trim()) {
      nextErrors.currentCompany = "Current company is required.";
    }

    if (!form.currentLocation.trim()) {
      nextErrors.currentLocation = "Current location is required.";
    }

    if (!form.currentLpa.trim()) {
      nextErrors.currentLpa = "Current CTC is required.";
    } else if (
      !/^\d+(\.\d{1,2})?$/.test(form.currentLpa)
    ) {
      nextErrors.currentLpa = "Enter CTC in LPA, e.g. 6.5.";
    }

    if (!form.currentDesignation.trim()) {
      nextErrors.currentDesignation = "Current designation is required.";
    }

    if (!form.roleDescription.trim()) {
      nextErrors.roleDescription = "Please describe your current role.";
    }

    if (
      form.linkedinUrl &&
      !/^https:\/\/(www\.)?linkedin\.com\/.+/i.test(form.linkedinUrl)
    ) {
      nextErrors.linkedinUrl = "Enter a valid LinkedIn profile URL.";
    }

    if (!resume) {
      nextErrors.resume = "Please upload your resume.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    const payload = new FormData();

    payload.append("jobId", job.id);
    payload.append("jobTitle", job.title);

    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, value);
    });

    if (resume) {
      payload.append("resume", resume);
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/career/apply", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit application.");
      }

      setSuccess(true);
      setForm(initialForm);
      setResume(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#f8f5ee] px-6 py-24">
        <div className="mx-auto max-w-xl border border-[#e8e0d3] bg-white p-10 text-center md:p-14">
          <CheckCircle2
            size={48}
            className="mx-auto text-[#a47c43]"
          />

          <h1 className="mt-7 font-serif text-3xl text-[#382b20]">
            Application Submitted
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#817361]">
            Thank you for applying for the {job.title} position.
            Your application has been received.
          </p>

          <p className="mt-3 text-xs text-[#a47c43]">
            Job Reference: {job.id}
          </p>

          <Link
            href="/career"
            className="mt-8 inline-flex items-center gap-2 bg-[#b18a50] px-7 py-3 text-sm text-white hover:bg-[#98703b]"
          >
            Explore More Careers
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5ee]">
      {/* Header */}
      <section className="bg-[#382b20] px-6 py-12 text-white md:py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/career/${job.id}`}
            className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-[#c6a16c]"
          >
            <ArrowLeft size={16} />
            Back to Job Details
          </Link>

          <p className="mt-9 text-xs uppercase tracking-[0.25em] text-[#c6a16c]">
            Career Application
          </p>

          <h1 className="mt-4 font-serif text-3xl md:text-5xl">
            Apply for this Position
          </h1>

          <p className="mt-4 text-sm text-white/65">
            {job.title} · {job.location}
          </p>

          <p className="mt-2 text-xs text-[#c6a16c]">
            Job Reference: {job.id}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          noValidate
        >
          {/* Basic information */}
          <FormSection
            number="01"
            title="Basic Information"
            description="Tell us about yourself and your educational background."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Full Name"
                required
                error={errors.fullName}
              >
                <input
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={inputClass(errors.fullName)}
                />
              </Field>

              <Field
                label="Date of Birth"
                required
                error={errors.dateOfBirth}
              >
                <input
                  type="date"
                  value={form.dateOfBirth}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  className={inputClass(errors.dateOfBirth)}
                />
              </Field>

              <Field
                label="Native / Hometown City"
                required
                error={errors.hometown}
              >
                <input
                  value={form.hometown}
                  onChange={(e) => updateField("hometown", e.target.value)}
                  placeholder="e.g. Lucknow, Uttar Pradesh"
                  className={inputClass(errors.hometown)}
                />
              </Field>

              <Field
                label="Highest Qualification"
                required
                error={errors.qualification}
              >
                <input
                  value={form.qualification}
                  onChange={(e) =>
                    updateField("qualification", e.target.value)
                  }
                  placeholder="e.g. MBA, B.Tech, M.Com"
                  className={inputClass(errors.qualification)}
                />
              </Field>

              <Field
                label="Year of Completion"
                required
                error={errors.qualificationYear}
              >
                <input
                  type="number"
                  min="1950"
                  max={new Date().getFullYear()}
                  value={form.qualificationYear}
                  onChange={(e) =>
                    updateField("qualificationYear", e.target.value)
                  }
                  placeholder="e.g. 2022"
                  className={inputClass(errors.qualificationYear)}
                />
              </Field>

              <Field
                label="Phone Number"
                required
                error={errors.phone}
              >
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  maxLength={10}
                  className={inputClass(errors.phone)}
                />
              </Field>

              <Field
                label="Email Address"
                required
                error={errors.email}
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                  className={inputClass(errors.email)}
                />
              </Field>
            </div>
          </FormSection>

          {/* Professional information */}
          <FormSection
            number="02"
            title="Professional Information"
            description="Share details about your current employment and experience."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Current Company"
                required
                error={errors.currentCompany}
              >
                <input
                  value={form.currentCompany}
                  onChange={(e) =>
                    updateField("currentCompany", e.target.value)
                  }
                  placeholder="Enter current company"
                  className={inputClass(errors.currentCompany)}
                />
              </Field>

              <Field
                label="Current Location / City"
                required
                error={errors.currentLocation}
              >
                <input
                  value={form.currentLocation}
                  onChange={(e) =>
                    updateField("currentLocation", e.target.value)
                  }
                  placeholder="e.g. Lucknow, Uttar Pradesh"
                  className={inputClass(errors.currentLocation)}
                />
              </Field>

              <Field
                label="Current CTC (LPA)"
                required
                error={errors.currentLpa}
              >
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.currentLpa}
                  onChange={(e) => updateField("currentLpa", e.target.value)}
                  placeholder="e.g. 6.5"
                  className={inputClass(errors.currentLpa)}
                />
              </Field>

              <Field
                label="Current Designation"
                required
                error={errors.currentDesignation}
              >
                <input
                  value={form.currentDesignation}
                  onChange={(e) =>
                    updateField("currentDesignation", e.target.value)
                  }
                  placeholder="e.g. Senior Executive"
                  className={inputClass(errors.currentDesignation)}
                />
              </Field>

              <div className="md:col-span-2">
                <Field
                  label="Describe Your Current Role"
                  required
                  error={errors.roleDescription}
                >
                  <textarea
                    rows={5}
                    value={form.roleDescription}
                    onChange={(e) =>
                      updateField("roleDescription", e.target.value)
                    }
                    placeholder="Describe your responsibilities, experience, key projects and current role..."
                    className={`${inputClass(errors.roleDescription)} resize-y`}
                  />
                </Field>
              </div>
            </div>
          </FormSection>

          {/* Social information */}
          <FormSection
            number="03"
            title="Professional Profile"
            description="Share your professional online profile."
          >
            <Field
              label="LinkedIn Profile URL"
              error={errors.linkedinUrl}
            >
              <input
                type="url"
                value={form.linkedinUrl}
                onChange={(e) => updateField("linkedinUrl", e.target.value)}
                placeholder="https://www.linkedin.com/in/your-profile"
                className={inputClass(errors.linkedinUrl)}
              />
            </Field>
          </FormSection>

          {/* Resume */}
          <FormSection
            number="04"
            title="Resume / CV"
            description="Upload your latest resume to complete your application."
          >
            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleResume(event.dataTransfer.files?.[0]);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border border-dashed p-8 text-center transition-colors hover:border-[#b18a50] hover:bg-[#faf8f4] ${
                errors.resume ? "border-red-400" : "border-[#d8cbb8]"
              }`}
            >
              <Upload
                size={30}
                className="mx-auto text-[#a47c43]"
              />

              <p className="mt-4 text-sm font-medium text-[#382b20]">
                Click to upload or drag and drop your resume
              </p>

              <p className="mt-2 text-xs text-[#817361]">
                PDF, DOC or DOCX · Maximum file size 5 MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleResume(e.target.files?.[0])}
              />
            </div>

            {resume && (
              <div className="mt-4 flex items-center justify-between border border-[#e8e0d3] bg-white p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText
                    size={22}
                    className="shrink-0 text-[#a47c43]"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#382b20]">
                      {resume.name}
                    </p>
                    <p className="text-xs text-[#817361]">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setResume(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="ml-3 text-[#817361] hover:text-red-600"
                  aria-label="Remove resume"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {errors.resume && (
              <p className="mt-2 text-xs text-red-600">{errors.resume}</p>
            )}
          </FormSection>

          {/* Consent */}
          <div className="border border-[#e8e0d3] bg-white p-5">
            <p className="text-xs leading-6 text-[#817361]">
              By submitting this application, you confirm that the
              information provided is accurate and authorize Shalimar
              Corp Limited to use your application details for recruitment
              and selection purposes, in accordance with its applicable
              privacy policy.
            </p>
          </div>

          {submitError && (
            <p
              role="alert"
              className="border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {submitError}
            </p>
          )}

          {/* Submit */}
          <div className="flex flex-col-reverse justify-between gap-5 border-t border-[#e8e0d3] pt-7 sm:flex-row sm:items-center">
            <Link
              href={`/career/${job.id}`}
              className="inline-flex items-center gap-2 text-sm text-[#817361] hover:text-[#a47c43]"
            >
              <ArrowLeft size={16} />
              Back to Job Details
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-3 bg-[#b18a50] px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-[#98703b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting Application..." : "Submit Application"}
              {!submitting && <ArrowUpRight size={17} />}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-[#e8e0d3] bg-white p-6 md:p-9">
      <div className="mb-8 flex gap-4">
        <span className="font-serif text-2xl text-[#b18a50]">
          {number}
        </span>

        <div>
          <h2 className="font-serif text-2xl text-[#382b20]">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#817361]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-[#382b20]">
        {label}
        {required && <span className="ml-1 text-[#b18a50]">*</span>}
      </label>

      {children}

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

function inputClass(error?: string) {
  return `h-12 w-full border bg-[#fdfcf9] px-4 text-sm text-[#382b20] outline-none transition-colors placeholder:text-[#b2a797] focus:border-[#b18a50] ${
    error ? "border-red-400" : "border-[#e8e0d3]"
  }`;
}