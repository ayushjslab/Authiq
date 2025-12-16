import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-emerald-600">Terms of Service</h1>
          <p className="mt-3 text-sm text-gray-500">
            Last updated: <span className="font-medium">16 Dec 2025</span>
          </p>
        </header>

        {/* Intro */}
        <section className="mb-10">
          <p className="leading-relaxed">
            These Terms of Service govern your access to and use of Authiq’s
            authentication and identity services. By using Authiq, you agree to
            be bound by these terms.
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Eligibility
          </h2>
          <p className="leading-relaxed">
            You must be legally capable of entering into a binding agreement to
            use Authiq. If you are using Authiq on behalf of an organization, you
            represent that you have the authority to bind that organization.
          </p>
        </section>

        {/* Account Responsibilities */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Account Responsibilities
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must provide accurate and up-to-date information</li>
            <li>You are responsible for all activities under your account</li>
          </ul>
        </section>

        {/* Acceptable Use */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Acceptable Use
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Do not misuse, reverse engineer, or disrupt the service</li>
            <li>Do not use Authiq for unlawful or abusive activities</li>
            <li>Do not attempt to bypass security or rate limits</li>
          </ul>
        </section>

        {/* Service Availability */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Service Availability
          </h2>
          <p className="leading-relaxed">
            Authiq is provided on an “as is” and “as available” basis. We may
            modify, suspend, or discontinue parts of the service at any time
            without liability.
          </p>
        </section>

        {/* Data & Privacy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Data & Privacy
          </h2>
          <p className="leading-relaxed">
            Your use of Authiq is also governed by our Privacy Policy. You retain
            ownership of your data, while granting Authiq permission to process
            it solely to provide the service.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Limitation of Liability
          </h2>
          <p className="leading-relaxed">
            To the maximum extent permitted by law, Authiq shall not be liable
            for any indirect, incidental, or consequential damages arising from
            your use of the service.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Termination
          </h2>
          <p className="leading-relaxed">
            We may suspend or terminate your access to Authiq at any time if you
            violate these terms or use the service in a harmful manner.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Changes to These Terms
          </h2>
          <p className="leading-relaxed">
            We may update these Terms of Service from time to time. Continued
            use of Authiq after changes take effect constitutes acceptance of
            the revised terms.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-14 border-t pt-6">
          <h2 className="text-xl font-semibold text-emerald-600 mb-2">
            Contact Us
          </h2>
          <p className="text-sm text-gray-600">
            If you have questions about these Terms, contact us at
            <span className="text-emerald-600 font-medium"> ayush.jslab@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
