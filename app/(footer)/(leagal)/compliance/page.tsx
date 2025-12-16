import React from "react";

export default function CompliancePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-emerald-600">Compliance</h1>
          <p className="mt-3 text-sm text-gray-500">
            Our commitment to regulatory and industry standards
          </p>
        </header>

        {/* Intro */}
        <section className="mb-10">
          <p className="leading-relaxed">
            Authiq is designed with compliance in mind. We align our security,
            privacy, and operational practices with recognized standards to
            help customers meet their regulatory obligations.
          </p>
        </section>

        {/* GDPR */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">GDPR</h2>
          <p className="leading-relaxed">
            Authiq supports compliance with the General Data Protection
            Regulation (GDPR). We process personal data lawfully, transparently,
            and only for specified purposes, while enabling data subject rights
            such as access, correction, and deletion.
          </p>
        </section>

        {/* CCPA */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">CCPA</h2>
          <p className="leading-relaxed">
            For California residents, Authiq aligns with the California Consumer
            Privacy Act (CCPA). We do not sell personal information and provide
            mechanisms to exercise privacy rights where applicable.
          </p>
        </section>

        {/* SOC 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">SOC 2</h2>
          <p className="leading-relaxed">
            Our controls are designed to align with SOC 2 Trust Service
            Principles, including security, availability, and confidentiality.
            Policies and procedures are reviewed and improved on an ongoing
            basis.
          </p>
        </section>

        {/* Data Processing */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Data Processing & Subprocessors
          </h2>
          <p className="leading-relaxed">
            Authiq acts as a data processor for customer data. We work with
            trusted subprocessors to deliver our services and ensure contractual
            safeguards are in place to protect data.
          </p>
        </section>

        {/* Audits */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Audits & Reviews
          </h2>
          <p className="leading-relaxed">
            We conduct regular internal reviews and risk assessments to
            validate our controls and improve our compliance posture as the
            platform evolves.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-14 border-t pt-6">
          <h2 className="text-xl font-semibold text-emerald-600 mb-2">
            Compliance Contact
          </h2>
          <p className="text-sm text-gray-600">
            For compliance-related questions, contact us at
            <span className="text-emerald-600 font-medium"> ayush.jslab@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
