"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Globe, Link2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { getUserFromJWT } from "@/hooks/getUser";

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
  const [redirectUrl, setRedirectUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    url?: string;
    redirectUrl?: string;
  }>({});

  // Only render after client mount
  useEffect(() => setMounted(true), []);

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

    if (!redirectUrl.trim()) newErrors.redirectUrl = "Redirect URL is required";
    else if (!isValidUrl(redirectUrl)) newErrors.redirectUrl = "Please enter a valid redirect URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, url, redirectUrl, isValidUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    try {
      setLoading(true);
      const normalizedUrl = formatUrl(url);
      const normalizedRedirect = formatUrl(redirectUrl);
      const data = await getUserFromJWT();

      if (!data?.id) {
        toast.error("User not authenticated.");
        return;
      }

      const res = await axios.post(`/api/website/add`, {
        userId: data.id,
        websiteUrl: normalizedUrl,
        redirectUrl: normalizedRedirect,
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

  if (!mounted) return null; // prevent SSR/client mismatch

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto py-12 px-6 space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-rose-500/10 border border-rose-500/40 shadow-md backdrop-blur-sm">
            <Globe className="w-12 h-12 text-rose-500" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight">
          Register Your Website
        </h1>

        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Provide your website details below. Once submitted, the URL becomes
          locked in for verification purposes.
        </p>

        <div className="max-w-md mx-auto pt-4 space-y-3 text-left">
          {[
            "Double-check your website URL before submitting—this cannot be changed later.",
            "An API key will be generated instantly after registration.",
            "Keep your API key safe—treat it like a password.",
            "You can update your website name anytime from your dashboard.",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <p className="text-sm text-muted-foreground">{t}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Website Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500" /> Website Name
          </label>
          <Input
            placeholder="My Awesome Website"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            disabled={loading}
            className={`bg-input border-2 transition-all ${
              errors.name
                ? "border-destructive"
                : "border-rose-500/30 focus:border-rose-500/60"
            }`}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        {/* Website URL */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Link2 className="w-4 h-4 text-rose-500" /> Website URL
          </label>
          <Input
            placeholder="example.com or https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (errors.url) setErrors((prev) => ({ ...prev, url: undefined }));
            }}
            disabled={loading}
            className={`bg-input border-2 transition-all ${
              errors.url
                ? "border-destructive"
                : "border-rose-500/30 focus:border-rose-500/60"
            }`}
          />
          {errors.url && <p className="text-xs text-destructive">{errors.url}</p>}
        </div>

        {/* Redirect URL */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Link2 className="w-4 h-4 text-rose-500" /> Redirect URL
          </label>
          <Input
            placeholder="https://example.com/callback"
            value={redirectUrl}
            onChange={(e) => {
              setRedirectUrl(e.target.value);
              if (errors.redirectUrl) setErrors((prev) => ({ ...prev, redirectUrl: undefined }));
            }}
            disabled={loading}
            className={`bg-input border-2 transition-all ${
              errors.redirectUrl
                ? "border-destructive"
                : "border-rose-500/30 focus:border-rose-500/60"
            }`}
          />
          {errors.redirectUrl && <p className="text-xs text-destructive">{errors.redirectUrl}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-2.5 rounded-lg relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-rose-400 to-rose-500 opacity-0 group-hover:opacity-50"
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
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Register Website
              </>
            )}
          </span>
        </Button>
      </form>
    </motion.div>
  );
}
