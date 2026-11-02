import FooterEnd from "./end";
import FooterHeader from "./head";
import FooterLinks from "./links";

export default function FooterSection() {
  return (
    <footer id="footer">
      <div className="relative isolate w-full overflow-hidden bg-[#231F20] border-t border-amber-50 px-4 pt-12 sm:px-8 sm:pt-16 lg:px-16 lg:pt-20">
        <FooterHeader />
        <FooterLinks />
      </div>
      <FooterEnd />
    </footer>
  )
}