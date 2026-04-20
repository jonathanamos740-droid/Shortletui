import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  variant?: "signin" | "signup";
}

export function AuthModal({ open, onClose, variant = "signin" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(variant);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // for signup

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${activeTab} -`, { email, password, name });
    alert(`${activeTab.toUpperCase()} successful! Check console.`);
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-[400px] max-h-[90vh] overflow-y-auto rounded-[24px] p-6 shadow-2xl border-none z-[10000] data-[state=open]:duration-500 data-[state=open]:ease-[cubic-bezier(0.16,1,0.3,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {activeTab === "signin" ? "Welcome back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Enter your details to {activeTab === "signin" ? "sign in" : "sign up"} to ShortletNG
          </DialogDescription>
        </DialogHeader>

        <div className="flex bg-gray-100 rounded-[12px] p-1 mb-6">
          <Button
            variant={activeTab === "signin" ? "default" : "ghost"}
            className={`flex-1 rounded-[10px] h-10 font-bold transition-all duration-300 ${activeTab === 'signin' ? 'bg-[#008751] hover:bg-[#00703c] text-white shadow-md scale-100' : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 scale-[0.98]'}`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </Button>
          <Button
            variant={activeTab === "signup" ? "default" : "ghost"}
            className={`flex-1 rounded-[10px] h-10 font-bold transition-all duration-300 ${activeTab === 'signup' ? 'bg-[#008751] hover:bg-[#00703c] text-white shadow-md scale-100' : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 scale-[0.98]'}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-semibold ml-1">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="h-12 rounded-[12px] bg-gray-50 border-gray-200 focus-visible:ring-[#008751] focus-visible:border-[#008751] transition-all px-4 text-[15px]"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-semibold ml-1">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="h-12 rounded-[12px] bg-gray-50 border-gray-200 focus-visible:ring-[#008751] focus-visible:border-[#008751] transition-all px-4 text-[15px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-semibold ml-1">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 rounded-[12px] bg-gray-50 border-gray-200 focus-visible:ring-[#008751] focus-visible:border-[#008751] transition-all px-4 text-[15px] tracking-widest"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 rounded-[12px] bg-[#008751] hover:bg-[#00703c] text-white font-bold text-[16px] shadow-[0_8px_20px_rgba(0,135,81,0.25)] hover:shadow-[0_10px_25px_rgba(0,135,81,0.35)] hover:-translate-y-[2px] transition-all duration-300 mt-2"
          >
            {activeTab === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <DialogFooter className="sm:justify-between pt-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            {activeTab === "signin"
              ? "Don’t have an account? "
              : "Already have an account? "}
            <button
              type="button"
              className="font-semibold underline underline-offset-2 text-primary hover:text-[#008751]"
              onClick={() => {
                setActiveTab(activeTab === "signin" ? "signup" : "signin");
              }}
            >
              {activeTab === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
          <DialogClose asChild>
            <Button variant="ghost" className="h-9 px-4">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

