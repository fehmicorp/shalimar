
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { siteConfig } from "@/config/site";

export default function FooterHeader() {
  const address = siteConfig.company.address;

  return (
    <div className="grid grid-cols-1 gap-9 border-b border-[#6b5437]/60 pb-12 px-6 lg:px-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.15fr_2fr_1.15fr_1.2fr] lg:items-start lg:gap-10 lg:pb-16">
      <div className="flex flex-col items-start justify-start lg:pt-2">
        <Link href="/" aria-label="Shalimar Corp Home">
          <Image
            src={logo}
            alt="Shalimar"
            width={200}
            height={90}
            priority
            className="h-auto w-[165px] object-contain sm:w-[180px] lg:w-[185px]"
          />
        </Link>
        <span className="tracking-[0.8rem] uppercase font-semibold font-serif">{siteConfig.name}</span>
      </div>
      <div>
        <h3 className="mb-5 text-base font-semibold tracking-wide text-[#d4ad70]">
          Corporate Office:
        </h3>
        <address className="max-w-sm not-italic text-sm font-normal leading-6 text-[#d4ad70]/90 sm:text-[15px] sm:leading-[25px]">
          {address.street},
          <br className="hidden sm:block" />
          {" "}{address.city}, {address.state}
          <br />
          {address.postalCode}
        </address>
      </div>
      <div>
        <h3 className="mb-5 text-base font-semibold tracking-wide text-[#d4ad70] ">
          Contact
        </h3>
        <div className="space-y-2 text-sm leading-6 text-[#d4ad70]/90 sm:text-[15px] sm:leading-[25px]">
          <p>
            <span className="mr-1">Tel :</span>
            <Link href={`tel:${siteConfig.company.phone}`} className="transition-colors hover:text-white">
              {siteConfig.company.phone}
            </Link>
          </p>
          <p>
            <span className="mr-1">Fax :</span>
            <Link href={`tel:${siteConfig.company.phone2}`} className="transition-colors hover:text-white">
              {siteConfig.company.phone2}
            </Link>
          </p>
        </div>
      </div>
      <div>
        <h3 className="mb-5 text-base font-semibold tracking-wide text-[#d4ad70] ">
          Email
        </h3>
        <Link
          href="mailto:shalimar@shalimar.org"
          className="break-all text-sm leading-6 text-[#d4ad70]/90 transition-colors hover:text-white sm:text-[15px] sm:leading-[25px]"
        >
          {siteConfig.company.email}
        </Link>
      </div>
    </div>
  );
}
