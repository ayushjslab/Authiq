import React from "react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-emerald-600">Security</h1>
          <p className="mt-3 text-sm text-gray-500">
            How Authiq protects your data and infrastructure
          </p>
        </header>

        {/* Intro */}
        <section className="mb-10">
          <p className="leading-relaxed">
            Security is at the core of Authiq. We design our authentication
            platform with strong safeguards to protect identities, credentials,
            and application access at every layer.
          </p>
        </section>

        {/* Infrastructure Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Infrastructure Security
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Hosted on secure, industry-leading cloud providers</li>
            <li>Network isolation and firewall protection</li>
            <li>Continuous monitoring and automated alerts</li>
          </ul>
        </section>

        {/* Data Protection */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Data Protection
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Encryption in transit using TLS</li>
            <li>Encryption at rest for sensitive data</li>
            <li>Passwords are hashed using modern cryptographic algorithms</li>
          </ul>
        </section>

        {/* Authentication Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Authentication Security
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Secure session and token management</li>
            <li>Protection against brute-force and credential stuffing attacks</li>
            <li>Support for multi-factor authentication</li>
          </ul>
        </section>

        {/* Operational Practices */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Operational Practices
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Principle of least privilege for internal access</li>
            <li>Regular security reviews and updates</li>
            <li>Incident response and recovery procedures</li>
          </ul>
        </section>

        {/* Compliance */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Compliance
          </h2>
          <p className="leading-relaxed">
            Authiq follows industry best practices aligned with common security
            standards. We continuously improve our controls to meet regulatory
            and compliance expectations.
          </p>
        </section>

        {/* Responsible Disclosure */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-emerald-500 mb-3">
            Responsible Disclosure
          </h2>
          <p className="leading-relaxed">
            If you believe you have discovered a security vulnerability, please
            report it responsibly. We appreciate the security community’s help
            in keeping Authiq safe.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-14 border-t pt-6">
          <h2 className="text-xl font-semibold text-emerald-600 mb-2">
            Security Contact
          </h2>
          <p className="text-sm text-gray-600">
            Report security issues to
            <span className="text-emerald-600 font-medium"> ayush.jslab@gmail.com</span>
          </p>
        </section>
      </div>
    </div>
  );
}
