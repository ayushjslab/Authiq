// website-card.tsx
"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Trash2,
  Key,
  Edit3,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Website {
  id: string;
  name: string;
  url: string;
  hostname: string;
  secretKey: string;
  createdAt: string;
}

export function WebsiteCard({ website }: { website: Website }) {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [name, setName] = useState(website.name);
  const [redirectUrl, setRedirectUrl] = useState(website.url);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openKeys, setOpenKeys] = useState(false);

  const [copied, setCopied] = useState<{ id?: boolean; secretKey?: boolean }>(
    {}
  );

  const queryClient = useQueryClient();

  const copyToClipboard = (text: string, field: "id" | "secretKey") => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    setTimeout(() => setCopied({ ...copied, [field]: false }), 2000);
  };

  const deleteMutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      return axios.delete(`/api/website/${website.id}/delete`);
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["websites"] });
      setLoading(false)
      setOpenDelete(false);
    },
    onError: () => {
      toast.error("Failed to delete");
       setLoading(false)
      setOpenDelete(false);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const editMutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      return axios.put(`/api/website/${website.id}/edit`, {
        name: name.trim(),
        redirectUrl: redirectUrl.trim(),
      });
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "Updated successfully");
      queryClient.invalidateQueries({ queryKey: ["websites"] }); // refresh data
      setLoading(false);
      setOpenEdit(false);
    },
    onError: () => {
      toast.error("Failed to edit");
      setLoading(false);
      setOpenEdit(false);
    },
  });

  const handleSave = () => {
    editMutation.mutate();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      className="relative"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card container */}
      <div className="bg-card border border-border rounded-xl p-6 transition-colors duration-300 hover:border-accent">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="mt-1">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                <Globe className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-foreground wrap-break-word">
                  {website.name}
                </h3>

                <a
                  href={website.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-2 ml-4"
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            <Dialog open={openEdit}>
              <DialogTrigger asChild>
                <button
                  onClick={() => setOpenEdit(true)}
                  className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Edit Website</DialogTitle>
                  <DialogDescription>
                    Update your website's display name and redirect URL.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground">
                      Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Website Name"
                    />
                  </div>

                  {/* Redirect URL Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground">
                      Redirect URL
                    </label>
                    <Input
                      value={redirectUrl}
                      onChange={(e) => setRedirectUrl(e.target.value)}
                      placeholder="https://example.com/redirect"
                    />
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Button onClick={() => setOpenEdit(false)} variant="outline">
                    Cancel
                  </Button>

                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={openKeys}>
              <DialogTrigger asChild>
                <button
                  onClick={() => setOpenKeys(true)}
                  className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  <Key className="w-4 h-4" />
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>{website.name} API Keys</DialogTitle>
                  <DialogDescription>
                    Your API key and secret. Keep them safe and do not share
                    with anyone.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-4">
                  {/* API ID */}
                  <div className="flex items-center justify-between border border-border rounded-md p-2 bg-card/50">
                    <span className="font-mono text-sm break-all">
                      {website.id}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(website.id, "id")}
                    >
                      {copied.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {/* Secret Key */}
                  <div className="flex items-center justify-between border border-border rounded-md p-2 bg-card/50">
                    <span className="font-mono text-sm break-all">
                      {website.secretKey}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(website.secretKey, "secretKey")
                      }
                    >
                      {copied.secretKey ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpenKeys(false)} variant="outline">
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* DELETE BUTTON WITH CONFIRM NAME DIALOG */}
            <Dialog open={openDelete}>
              <DialogTrigger asChild>
                <button
                  onClick={() => setOpenDelete(true)}
                  className="p-2 rounded-lg bg-destructive/10 text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogDescription>
                    To delete{" "}
                    <span className="font-semibold">{website.name}</span>, type
                    its name below. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                {/* Input to confirm name */}
                <div className="flex flex-col gap-2 py-4">
                  <label className="text-sm font-medium">
                    Type website name
                  </label>
                  <input
                    type="text"
                    className="border border-input bg-background px-3 py-2 rounded-md text-sm"
                    placeholder={website.name}
                    onChange={(e) => setConfirmName(e.target.value)}
                  />
                </div>

                <DialogFooter>
                  <Button
                    onClick={() => setOpenDelete(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="destructive"
                    disabled={confirmName !== website.name || loading}
                    onClick={handleDelete}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/30">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Website URL
            </p>
            <a
              href={website.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-mono text-accent hover:underline break-all"
            >
              {website.url}
            </a>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Hostname
            </p>
            <p className="text-sm font-mono text-foreground">
              {website.hostname}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Added On
            </p>
            <p className="text-sm text-foreground">{website.createdAt}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
