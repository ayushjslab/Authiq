import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy } from "lucide-react";

export default function InstallTabs() {
  const [copied, setCopied] = useState(false);

  const commands = {
    npm: "npm install echomark",
    pnpm: "pnpm add echomark",
    yarn: "yarn add echomark",
    bun: "bun add echomark",
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-xl p-3 sm:p-6 bg-background">
      <Card
        className="relative rounded-2xl sm:rounded-3xl shadow-xl 
                 bg-linear-to-br from-emerald-50 to-white 
                 border border-emerald-300 backdrop-blur-sm overflow-hidden"
      >
        {/* Subtle glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/60 to-transparent" />

        <CardContent className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* Heading */}
          <div className="text-center space-y-2">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full 
                       bg-emerald-200/40 text-emerald-700 
                       text-[10px] font-semibold uppercase tracking-widest"
            >
              SDK Installation
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              <span
                className="bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-500 
                         bg-clip-text text-transparent"
              >
                Install Authiq
              </span>
            </h2>

            <p className="text-sm sm:text-base text-emerald-700/80">
              Start authenticating users in minutes with a single install
            </p>
          </div>

          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="bg-emerald-200/40 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-inner backdrop-blur-md flex items-center justify-center gap-1">
              <TabsTrigger
                value="npm"
                className="rounded-lg cursor-pointer py-2 px-2 sm:py-3 sm:px-3 font-medium text-sm sm:text-base text-emerald-800 hover:bg-emerald-200/60 transition-all"
              >
                npm
              </TabsTrigger>
              <TabsTrigger
                value="pnpm"
                className="rounded-lg cursor-pointer py-2 px-2 sm:py-3 sm:px-3 font-medium text-sm sm:text-base text-emerald-800 hover:bg-emerald-200/60 transition-all"
              >
                pnpm
              </TabsTrigger>
              <TabsTrigger
                value="yarn"
                className="rounded-lg cursor-pointer py-2 px-2 sm:py-3 sm:px-3 font-medium text-sm sm:text-base text-emerald-800 hover:bg-emerald-200/60 transition-all"
              >
                yarn
              </TabsTrigger>
              <TabsTrigger
                value="bun"
                className="rounded-lg cursor-pointer py-2 px-2 sm:py-3 sm:px-3 font-medium text-sm sm:text-base text-emerald-800 hover:bg-emerald-200/60 transition-all"
              >
                bun
              </TabsTrigger>
            </TabsList>

            {Object.entries(commands).map(([key, cmd]) => (
              <TabsContent key={key} value={key}>
                <div className="mt-3 sm:mt-4 bg-linear-to-br from-gray-900 to-black text-white p-3 sm:p-5 rounded-xl sm:rounded-2xl relative font-mono text-xs sm:text-sm flex items-center justify-between shadow-lg border border-gray-700">
                  <span className="break-all sm:break-normal">
                    {cmd.split(" ").map((word, i) => {
                      if (
                        word === "npm" ||
                        word === "pnpm" ||
                        word === "bun" ||
                        word === "yarn"
                      )
                        return (
                          <span key={i} className="text-blue-400 font-bold">
                            {word}{" "}
                          </span>
                        );
                      if (word === "install" || word === "add")
                        return (
                          <span key={i} className="text-white">
                            {word}{" "}
                          </span>
                        );
                      if (word === "echomark")
                        return (
                          <span key={i} className="text-emerald-300">
                            authiq
                          </span>
                        );
                      return <span key={i}>{word} </span>;
                    })}{" "}
                  </span>
                  <button
                    onClick={() => handleCopy(cmd)}
                    className="ml-3 p-2 rounded-lg hover:bg-gray-700 active:scale-95 transition-all"
                  >
                    <Copy size={18} />
                  </button>
                  {copied && (
                    <span className="absolute -top-5 right-2 text-emerald-600 text-xs font-semibold">
                      Copied!
                    </span>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
