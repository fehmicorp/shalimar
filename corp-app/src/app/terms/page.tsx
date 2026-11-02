import CenteredLogoDivider from "@/components/layouts/home/projects/divider";


export default function TermsPage() {
  return (
    <main className="relative min-h-screen w-full bg-amber-50 text-stone-900 py-16 px-6 sm:px-12 lg:px-24">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-10 pt-8">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-600/10 text-amber-800 text-[10px] uppercase tracking-[0.25em] font-semibold border border-amber-600/20">
          Legal & Governance
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-stone-900">
          Terms & Conditions
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto font-light leading-relaxed">
          Statutory guidelines, user consent policies, and terms governing appointments at Shalimar Corp.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <CenteredLogoDivider />
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-amber-200 shadow-2xl rounded-3xl p-8 sm:p-14 space-y-10">
        
        {/* Section 1: Communications Consent */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-medium text-stone-900 border-b border-amber-200 pb-3">
            Communication & Consent
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-light leading-relaxed">
            You consent to receive communications from us by way of e-mails, phone calls, and SMS’s with respect to your transactions on our Website. Users will be required to register their valid phone numbers and e-mail addresses to facilitate such communication. We may also use your e-mail address to send You updates, newsletters, changes to features of the Service, and the like to provide You better Services.
          </p>
        </section>

        {/* Section 2: Independent Directors */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-medium text-stone-900 border-b border-amber-200 pb-3">
            Terms & Conditions of Appointment of Independent Directors
          </h2>
          
          <p className="text-stone-700 text-sm sm:text-base font-light leading-relaxed">
            The Independent Directors are being appointed pursuant to the provisions of Sections 149, 150, 152, read with Schedule IV and all other applicable provisions, if any, of the Companies Act, 2013 (‘the Act’) and Companies (Appointment and Qualification of Directors) Rules, 2014 (including any statutory modification(s) or re-enactment thereof for the time being in force).
          </p>

          <p className="text-stone-700 text-sm sm:text-base font-light leading-relaxed">
            The terms and conditions of the said appointments are being aligned accordingly. The outline is reproduced, inter-alia, herein:
          </p>

          <div className="space-y-4 text-stone-700 text-sm sm:text-base font-light leading-relaxed">
            <p>
              <strong>Appointment and Tenure:</strong> Consistent with the applicable provisions of the Companies Act, 2013. Independent Directors will not be liable to retire by rotation. As a member of the board, an Independent Director&apos;s role, duties, and responsibilities will be those normally required under the Companies Act, 2013.
            </p>

            <p className="font-medium text-stone-900 pt-2">
              In terms of Section 166 of the Companies Act, 2013, an Independent Director shall:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-stone-700">
              <li>Act in accordance with the Company&apos;s Articles of Association.</li>
              <li>Act in good faith in order to promote the objects of the Company for the benefit of its members as a whole, and in the best interest of the Company, its employees, the shareholders, the community, and for the protection of the environment.</li>
              <li>Exercise his duties with due and reasonable care, skill, and diligence.</li>
              <li>Not involve himself in a situation in which he may have a direct or indirect interest that conflicts, or possibly may conflict, with the interest of the Company.</li>
              <li>Not achieve or attempt to achieve any undue gain or advantage either to himself or to his relatives, partners, or associates.</li>
              <li>Not assign his office as Director and any assignments.</li>
            </ul>

            <p className="pt-2">
              He shall also abide by the &apos;Code for Independent Directors&apos; as outlined in Schedule IV to the Companies Act, 2013, and duties of directors as provided in the said Act.
            </p>

            <p>
              <strong>Continuation and Termination:</strong> Continuation of appointment is contingent on the Independent Director getting re-elected by the shareholders in accordance with provisions of the Companies Act, 2013 and the Articles of Association of the Company, from time to time in force. He will not be entitled to compensation if the shareholders do not re-elect him at any time. His appointment may also be terminated in accordance with the provisions of the Articles of Association of the Company from time to time in force.
            </p>
          </div>
        </section>

        {/* Footer Note inside card */}
        <div className="pt-6 border-t border-amber-200 text-xs text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Shalimar Corp Governance & Compliance</span>
          <span className="font-mono uppercase tracking-wider text-amber-700">Ref: SCC-DIR-TERMS</span>
        </div>

      </div>
    </main>
  );
}