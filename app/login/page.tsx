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
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  if (status === "loading") return <LoadingPage/>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-2xl p-10 border border-[#b3003b]"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-center mb-8 text-[#ff0055]"
        >
          Authiq
        </motion.h1>

        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-white text-black font-semibold shadow-md hover:bg-gray-200 transition"
          >
            <FaGoogle size={20} /> Sign in with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => signIn("github")}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[#111] text-white font-semibold shadow-md border border-[#ff0055] hover:bg-[#1a1a1a] transition"
          >
            <FaGithub size={20} /> Sign in with GitHub
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          Powered by next-auth
        </motion.p>
      </motion.div>
    </div>
  );
}
