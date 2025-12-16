import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-emerald-600">Privacy Policy</h1>
          <p className="mt-3 text-sm text-gray-500">
            Last updated: <span className="font-medium">16 Dec 2025</span>
          </p>
        </header>

        {/* Intro */}
        <section className="mb-10">
          <p className="leading-relaxed">
            Authiq respects your privacy and is committed to protecting your
            personal data. This Privacy Policy explains how we collect, use,
            store, and protect your information when you use our authentication
            services.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Account information such as email address and user ID</li>
            <li>Authentication data (hashed credentials, tokens, sessions)</li>
            <li>Usage data including IP address, browser type, and timestamps</li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide secure authentication and authorization</li>
            <li>To prevent fraud and abuse</li>
            <li>To improve performance, reliability, and user experience</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Data Sharing
          </h2>
          <p className="leading-relaxed">
            Authiq does not sell your personal data. Information is shared only
            with trusted service providers when necessary to operate and secure
            our services, or when required by law.
          </p>
        </section>

        {/* Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Security
          </h2>
          <p className="leading-relaxed">
            We implement industry-standard security measures including
            encryption, access controls, and continuous monitoring to protect
            your data.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Your Rights
          </h2>
          <p className="leading-relaxed">
            Depending on your location, you may have the right to access,
            correct, or delete your personal data. You may also request data
            portability or restrict processing.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-14 border-t pt-6">
          <h2 className="text-xl font-semibold text-emerald-600 mb-2">
            Contact Us
          </h2>
          <p className="text-sm text-gray-600">
            If you have any questions about this Privacy Policy, please contact
            us at <span className="text-emerald-600 font-medium">ayush.jslab@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
