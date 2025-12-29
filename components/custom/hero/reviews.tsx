"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function Reviews() {
  const reviews = [
    {
      name: "Vikas Babu",
      role: "Frontend Developer",
      image: "https://media.licdn.com/dms/image/v2/D5603AQF8XC_aD97Blw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729187054262?e=2147483647&v=beta&t=YALxKQe-C0GTgWGTom_Umwg3okzlx4HSqWCgL3GPVqo",
      rating: 5,
      text: "Authiq reduced our authentication setup time from 3 weeks to just 2 hours. The documentation is incredible and support is lightning fast.",
      company: "TechCorp",
    },
    {
      name: "Akash Yadav",
      role: "Backend Developer",
      image: "👨‍💻",
      rating: 5,
      text: "Finally, authentication that doesn't feel like a chore to implement. Authiq is the real deal. 10/10 would recommend.",
      company: "StartupXYZ",
    },
    {
      name: "Ayush Saini",
      role: "Full Stack Developer",
      image: "https://avatars.githubusercontent.com/u/166295238?v=4",
      rating: 5,
      text: "The security features are top-notch and the API is so intuitive. We saved thousands in development hours using Authiq.",
      company: "CloudNet",
    },
    {
      name: "Kapil Paliwal",
      role: "Full Stack Developer",
      image: "https://moreseo.net/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fds8zesbaa%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fv1%2Fmywaitlist_site%2Fq7gdvsikvmxptvrynsxq&w=256&q=75",
      rating: 5,
      text: "Enterprise-grade reliability with a consumer-grade simplicity. This is exactly what we've been looking for.",
      company: "FinanceHub",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="reviews" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            What Our Users{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Say</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of developers worldwide.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={review.name}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 + i * 0.05 }}
                  >
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">"{review.text}"</p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <motion.div className="text-3xl" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                 <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full" />
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 pt-12 border-t border-border"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">50K+</p>
            <p className="text-sm text-muted-foreground">Daily Active Users</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">99.99%</p>
            <p className="text-sm text-muted-foreground">Uptime Guarantee</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">10K+</p>
            <p className="text-sm text-muted-foreground">Apps Protected</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
