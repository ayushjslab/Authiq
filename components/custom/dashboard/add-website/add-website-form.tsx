"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Globe, Link2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface AddWebsitePageProps {
  onSuccess: (data: {
    name: string;
    url: string;
    apiKey: string;
    secretKey: string;
  }) => void;
}

export default function AddWebsitePage({ onSuccess }: AddWebsitePageProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    url?: string;
    redirectUrl?: string;
  }>({});

  useEffect(() => setMounted(true), []);

  const { data: session } = useSession();

  const formatUrl = useCallback((u: string) => {
    if (!u) return u;
    u = u.trim();
    return u.startsWith("http") ? u : `https://${u}`;
  }, []);

  const isValidUrl = useCallback(
    (value: string) => {
      try {
        new URL(formatUrl(value));
        return true;
      } catch {
        return false;
      }
    },
    [formatUrl]
  );

  const validateForm = useCallback(() => {
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Website name is required";

    if (!url.trim()) newErrors.url = "Website URL is required";
    else if (!isValidUrl(url)) newErrors.url = "Please enter a valid URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, url, isValidUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    try {
      setLoading(true);
      const normalizedUrl = formatUrl(url);
      if (!session?.user?.id) {
        toast.error("User not authenticated.");
        return;
      }

      const res = await axios.post(`/api/website/add`, {
        userId: session.user.id,
        websiteUrl: normalizedUrl,
        name,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        onSuccess({
          name,
          url: normalizedUrl,
          apiKey: res.data.website._id,
          secretKey: res.data.website.secretKey,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add website");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <motion.div
      className="relative w-full max-w-3xl mx-auto px-6 py-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="text-center space-y-6 mb-14">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-emerald-500/20 to-emerald-600/30 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex items-center justify-center">
            <Globe className="w-12 h-12 text-emerald-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Register Your Website
        </h1>

        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
          Securely connect your website to Authiq. Once registered, your domain
          is locked for verification and API access.
        </p>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-3xl border border-emerald-500/25 bg-background/60 backdrop-blur-2xl shadow-2xl p-8 md:p-10 space-y-8"
      >
        {/* Info Strip */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          {[
            "URL cannot be changed after submission",
            "Instant API key generation",
            "Secure your API key like a password",
            "Rename your website anytime",
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-emerald-500">●</span>
              <span>{t}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Website Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Website Name
            </label>

            <Input
              placeholder="My Awesome Website"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              disabled={loading}
              className={`h-12 rounded-xl bg-input/70 backdrop-blur border transition-all ${
                errors.name
                  ? "border-destructive"
                  : "border-emerald-500/30 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
              }`}
            />

            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Website URL */}
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Link2 className="w-4 h-4 text-emerald-500" />
              Website URL
            </label>

            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (errors.url) setErrors((p) => ({ ...p, url: undefined }));
              }}
              disabled={loading}
              className={`h-12 rounded-xl bg-input/70 backdrop-blur border transition-all ${
                errors.url
                  ? "border-destructive"
                  : "border-emerald-500/30 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
              }`}
            />

            {errors.url && (
              <p className="text-xs text-destructive">{errors.url}</p>
            )}
          </div>

          {/* CTA */}
          <Button
            type="submit"
            disabled={loading}
            className="relative w-full h-12 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 bg-linear-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-40"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />

            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Register Website
                </>
              )}
            </span>
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}
