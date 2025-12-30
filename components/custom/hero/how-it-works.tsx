/* eslint-disable @next/next/no-img-element */
"use client";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Get Your Dashboard",
      description:
        "Access your centralized dashboard to manage authentication, users, and security settings.",
      image: "/dashboard.png",
    },
    {
      number: "02",
      title: "Add Your Website",
      description:
        "Register your website to generate secure credentials and enable authentication services.",
      image: "/add-website-form.png",
    },
    {
      number: "03",
      title: "Get Your Website ID",
      description:
        "Receive a unique Website ID used to securely identify your app during authentication.",
      image: "/add-website-success.png",
    },
    {
      number: "04",
      title: "Select Website",
      description:
        "Choose a registered website to manage login methods, users, and access controls.",
      image: "/select-website.png",
    },
    {
      number: "05",
      title: "Advanced Analytics",
      description:
        "Track login activity, authentication success rates, and security insights in real time.",
      image: "/analysis-1.png",
    },
    {
      number: "06",
      title: "View Login Users",
      description:
        "See all authenticated users, their login providers, sessions, and last activity.",
      image: "/analysis-2.png",
    },
    {
      number: "07",
      title: "Account Overview",
      description:
        "Manage your profile, subscription, API usage, and organization-level preferences.",
      image: "/account.png",
    },
    {
      number: "08",
      title: "Website Settings",
      description:
        "Configure authentication providers, redirect URLs, security rules, and API keys.",
      image: "/settings.png",
    },
  ];

  return (
    <div id="features" className="bg-background mt-10">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[520px] h-[520px] bg-emerald-500/25 blur-[160px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Heading */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance">
              <span className="bg-linear-to-br from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                Authiq Features
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
              A simple, secure flow to integrate authentication, manage users,
              and scale with confidence — in{" "}
              <span className="text-emerald-400 font-medium">just 8 steps</span>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary/10 text-primary">
                        <span className="text-2xl font-bold">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {step.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Content */}
                <div className="flex-1 w-full">
                  <div className="relative overflow-hidden rounded-xl group">
                    <img
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
