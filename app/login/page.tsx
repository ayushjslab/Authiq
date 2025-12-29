"use client";

import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/shared/loading";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  if (status === "loading") return <LoadingPage />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      {/* subtle emerald glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl p-px bg-linear-to-br from-emerald-500/40 via-emerald-600/20 to-transparent shadow-[0_0_40px_rgba(16,185,129,0.25)]"
      >
        <div className="rounded-2xl bg-zinc-950 p-10 backdrop-blur-xl">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-extrabold text-center mb-8 bg-linear-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent tracking-tight"
          >
            Authiq
          </motion.h1>

          <div className="flex flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
              }}
              className="flex cursor-pointer items-center justify-center gap-3 w-full py-3 rounded-xl bg-white text-black font-semibold shadow-lg hover:bg-gray-100 transition"
            >
              <FaGoogle size={20} />
              Continue with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                signIn("github");
              }}
              className="flex items-center cursor-pointer justify-center gap-3 w-full py-3 rounded-xl bg-zinc-900 text-white font-semibold border border-emerald-500/40 hover:border-emerald-500 hover:bg-zinc-800 transition shadow-md"
            >
              <FaGithub size={20} />
              Continue with GitHub
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 text-zinc-500 text-sm"
          >
            Secure authentication powered by Authiq
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
