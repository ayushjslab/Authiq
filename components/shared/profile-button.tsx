"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";

export default function ProfileButton() {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  if(! session || !session.user) {
    return null
  }
  const {user} = session

  console.log(user)

  const handleLogout = async () => {
    try {
        const res = await axios.post(`/api/logout`)
        if(res.data.success) {
          toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error("Internal server error")
    }
  }

  return (
    <div className="relative select-none">
        
      {/* Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 bg-background/40 backdrop-blur-xl 
                   px-4 py-2 rounded-full border border-border/60
                   hover:border-primary/50 transition-all duration-200"
      >
        <motion.img
          src={user.image!}
          alt="profile"
          className="w-9 h-9 rounded-full object-cover border border-primary/40"
          whileHover={{ rotate: 5 }}
        />

        {/* User Info */}
        <div className="text-left">
          <p className="text-sm font-semibold text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        {/* Icon */}
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 rounded-xl bg-card/80 
                       backdrop-blur-xl border border-border/70 shadow-xl
                       overflow-hidden"
          >
           
            {/* Options */}
            <div className="p-2 flex flex-col">
              {["Dashboard", "Settings", "Billing"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{
                    backgroundColor: "rgba(220,38,38,0.08)",
                    x: 4,
                  }}
                  className="text-left px-4 py-2 rounded-lg text-sm text-foreground 
                             hover:text-primary transition-colors"
                >
                  {item}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ backgroundColor: "rgba(220,38,38,0.15)", x: 4 }}
                onClick={() => handleLogout()}
                className="text-left px-4 py-2 rounded-lg text-sm text-destructive font-semibold mt-1"
              >
                Log Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
