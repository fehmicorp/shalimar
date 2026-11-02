"use client";

import { Printer, Mail, MessageCircle } from "lucide-react";

interface PolicyActionsProps {
  title: string;
}

const getUTMUrl = (source: string, medium: string, campaign: string) => {
  if (typeof window === "undefined") return "";
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("utm_source", source);
  currentUrl.searchParams.set("utm_medium", medium);
  currentUrl.searchParams.set("utm_campaign", campaign);
  currentUrl.searchParams.set("utm_content", "policy_share");
  return currentUrl.toString();
};

export default function PolicyActions({ title }: PolicyActionsProps) {
  const getPolicyContent = () => {
    const element = document.getElementById("policy-content");
    if (!element) return "";
    const content = element.cloneNode(true) as HTMLElement;
    content
      .querySelectorAll(".no-print, button, nav")
      .forEach((element) => element.remove());
    return content.innerText.trim();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const content = getPolicyContent();
    const shareUrl = getUTMUrl("email", "share_button", "corporate_governance");
    
    const body = [
      `Dear Recipient,`,
      ``,
      `Please review the official disclosure document from Shalimar Corp Limited:`,
      ``,
      `POLICY / DISCLOSURE: ${title}`,
      `=`.repeat(title.length + 22),
      ``,
      content,
      ``,
      `--------------------------------------------------`,
      `You can also view this policy document live on our portal:`,
      shareUrl,
      ``,
      `By,`,
      `Shalimar Corp Limited`,
      `www.shalimarcorp.com`
    ].join("\n");

    const subject = encodeURIComponent(`Shalimar Corp Limited - Official Policy: ${title}`);
    const emailBody = encodeURIComponent(body);
    window.location.href = `mailto:?subject=${subject}&body=${emailBody}`;
  };

  const handleWhatsApp = () => {
    const shareUrl = getUTMUrl("whatsapp", "social_share", "corporate_governance");
    
    const message = [
      `*Shalimar Corp Limited | Official Disclosure*`,
      ``,
      `📄 *${title}*`,
      ``,
      `Please find the statutory policy details and compliance guidelines using the link below:`,
      ``,
      `🔗 *View Document:* ${shareUrl}`,
      ``,
      `_Shalimar Corp Limited - Governance Desk_`
    ].join("\n");

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="no-print flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex cursor-pointer items-center gap-2 border border-[#b18a50] px-5 py-2.5 text-sm font-medium text-[#382b20] transition-colors hover:bg-[#b18a50] hover:text-white"
      >
        <Printer size={16} />
        Print
      </button>

      <button
        type="button"
        onClick={handleEmail}
        className="inline-flex cursor-pointer items-center gap-2 border border-[#b18a50] px-5 py-2.5 text-sm font-medium text-[#382b20] transition-colors hover:bg-[#b18a50] hover:text-white"
      >
        <Mail size={16} />
        Email
      </button>

      <button
        type="button"
        onClick={handleWhatsApp}
        className="inline-flex cursor-pointer items-center gap-2 border border-[#b18a50] px-5 py-2.5 text-sm font-medium text-[#382b20] transition-colors hover:bg-[#b18a50] hover:text-white"
      >
        <MessageCircle size={16} />
        WhatsApp
      </button>
    </div>
  );
}