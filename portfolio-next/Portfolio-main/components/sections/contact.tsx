"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Copy, Send, Loader2, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import Magnetic from "@/components/effects/magnetic";
import { useSound } from "@/providers/sound-provider";

/* ─── Social SVG Icons ─── */
export function GithubIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

export function LinkedinIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

export function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
        </svg>
    );
}

export function XIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.585-6.64 7.585H.472l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153Zm-1.29 19.493h2.04L6.486 3.24H4.298L17.61 20.646Z" />
        </svg>
    );
}

export const socialIconMap: Record<string, React.FC<{ className?: string }>> = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    x: XIcon,
    instagram: InstagramIcon,
};

/* ─── Types ─── */
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

type SendState = "idle" | "sending" | "success" | "error";
type DeliveryError = "activation" | "network" | null;

interface FormSubmitResponse {
    success?: boolean | string;
    message?: string;
}

/* ─── Animated Checkmark ─── */
function AnimatedCheckmark() {
    return (
        <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="mx-auto"
        >
            <motion.circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="3"
                className="text-foreground"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
                d="M24 42L34 52L56 30"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            />
        </motion.svg>
    );
}

/* ─── Animated Error Icon ─── */
function AnimatedErrorIcon() {
    return (
        <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="mx-auto"
        >
            <motion.circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="3"
                className="text-red-500"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
                d="M28 28L52 52"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-red-500"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
            />
            <motion.path
                d="M52 28L28 52"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-red-500"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.65, ease: "easeOut" }}
            />
        </motion.svg>
    );
}

/* ─── Floating Label Input ─── */
function FloatingInput({
    id,
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    error,
    isTextArea = false,
}: {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    isTextArea?: boolean;
}) {
    const baseClasses =
        "peer w-full rounded-xl border border-border/70 bg-secondary/20 px-5 pt-7 pb-3 text-sm text-foreground placeholder-transparent outline-none transition-all duration-300 hover:border-foreground/50 focus:border-foreground/60 focus:bg-background/70 focus:ring-2 focus:ring-foreground/20";
    const errorClasses = error ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : "";

    return (
        <div className="relative group">
            {isTextArea ? (
                <textarea
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={4}
                    className={`${baseClasses} ${errorClasses} resize-none`}
                    aria-label={label}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            ) : (
                <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${baseClasses} ${errorClasses}`}
                    aria-label={label}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            )}
            <label
                htmlFor={id}
                className={`pointer-events-none absolute left-5 top-3 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${error ? "text-red-500" : "text-muted-foreground peer-focus:text-foreground"
                    }`}
            >
                {label}
            </label>

            <AnimatePresence>
                {error && (
                    <motion.p
                        id={`${id}-error`}
                        role="alert"
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        className="text-xs text-red-500 mt-1.5 pl-1 font-medium"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Main Contact Section ─── */
export default function Contact() {
    const { content, dict } = useLanguage();
    const { playClick } = useSound();

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [sendState, setSendState] = useState<SendState>("idle");
    const [deliveryError, setDeliveryError] = useState<DeliveryError>(null);
    const [copied, setCopied] = useState(false);

    const updateField = useCallback((field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    }, []);

    const validate = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) newErrors.name = dict.nameRequired;
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = dict.emailInvalid;
        if (!formData.subject.trim()) newErrors.subject = dict.subjectRequired;
        if (formData.message.trim().length < 10) newErrors.message = dict.messageTooShort;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, dict]);

    const submitForm = useCallback(async () => {
        if (!validate()) return;

        setDeliveryError(null);
        setSendState("sending");

        try {
            const response = await fetch(
                `https://formsubmit.co/ajax/${encodeURIComponent(content.contact.email)}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        subject: formData.subject.trim(),
                        message: formData.message.trim(),
                        _subject: `[Portfolio] ${formData.subject.trim()}`,
                        _replyto: formData.email.trim(),
                        _template: "table",
                        _url: window.location.href,
                    }),
                },
            );

            const result = (await response.json()) as FormSubmitResponse;
            const succeeded = result.success === true || result.success === "true";

            if (!response.ok || !succeeded) {
                setDeliveryError(/activat/i.test(result.message ?? "") ? "activation" : "network");
                setSendState("error");
                return;
            }

            setFormData({ name: "", email: "", subject: "", message: "" });
            setSendState("success");
        } catch {
            setDeliveryError("network");
            setSendState("error");
        }
    }, [content.contact.email, formData, validate]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            void submitForm();
        },
        [submitForm],
    );

    const handleCopyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(content.contact.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard API not available */
        }
    }, [content.contact.email]);

    const getSocialIcon = (label: string) => {
        const key = label.toLowerCase();
        return socialIconMap[key] || null;
    };

    return (
        <section className="relative pt-24 md:pt-32 xl:pt-48 bg-background overflow-hidden border-t border-border/50">

            {/* ─── Background Effects ─── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-foreground/[0.02] rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-foreground/[0.015] rounded-full blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div id="contact-content" className="container relative z-10 mx-auto scroll-mt-28 px-container">

                {/* ─── Section Header ─── */}
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-16 lg:mb-24">
                    <div className="flex flex-col gap-4">
                        <BlurReveal>
                            <span className="title-counter">[006]</span>
                        </BlurReveal>
                        <BlurReveal>
                            <h2 className="title">{dict.title.contact}</h2>
                        </BlurReveal>
                    </div>
                </div>

                {/* ─── Two-Column Layout ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 max-w-6xl mx-auto mb-24 xl:mb-40">

                    {/* ─── Left Column: Info ─── */}
                    <div className="flex flex-col gap-10">

                        <BlurReveal>
                            <h3 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tighter leading-[1.1] text-foreground">
                                {dict.contactHeading}
                            </h3>
                        </BlurReveal>

                        <BlurReveal delay={0.1}>
                            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
                                {dict.contactDescription}
                            </p>
                        </BlurReveal>

                        {/* ─── Contact Details ─── */}
                        <div className="flex flex-col gap-5">
                            {/* Email — click to copy */}
                            <BlurReveal delay={0.15}>
                                <Magnetic intensity={0.1}>
                                    <button
                                        onClick={() => {
                                            playClick();
                                            handleCopyEmail();
                                        }}
                                        className="group flex w-fit items-center gap-3 rounded-xl border border-border/60 bg-secondary/15 px-3 py-2 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-secondary/30"
                                        aria-label={`Copy email: ${content.contact.email}`}
                                    >
                                        <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center bg-background shrink-0 transition-all duration-500 group-hover:bg-foreground group-hover:border-foreground/30">
                                            <Mail className="w-4 h-4 text-foreground transition-colors duration-500 group-hover:text-background" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="mb-0.5 text-xs font-mono tracking-widest uppercase text-muted-foreground">
                                                {dict.sendEmail}
                                            </span>
                                            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                {content.contact.email}
                                                <AnimatePresence mode="wait">
                                                    {copied ? (
                                                        <motion.span
                                                            key="copied"
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.8 }}
                                                            className="text-xs font-mono tracking-wider text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full"
                                                        >
                                                            {dict.copied}
                                                        </motion.span>
                                                    ) : (
                                                        <motion.span
                                                            key="copy"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                        >
                                                            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><Copy className="h-3.5 w-3.5" />Copy</span>
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </span>
                                        </div>
                                    </button>
                                </Magnetic>
                            </BlurReveal>

                            {/* Location */}
                            <BlurReveal delay={0.2}>
                                <div className="group flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center bg-background shrink-0">
                                        <MapPin className="w-4 h-4 text-foreground" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-0.5">
                                            {dict.locationLabel}
                                        </span>
                                        <span className="text-sm font-medium text-foreground">
                                            {content.contact.location}
                                        </span>
                                    </div>
                                </div>
                            </BlurReveal>
                        </div>

                        {/* ─── Social Icons ─── */}
                        <BlurReveal delay={0.3}>
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                {content.social.map((link: { label: string; href: string }) => {
                                    const IconComponent = getSocialIcon(link.label);
                                    return (
                                        <Magnetic key={link.label} intensity={0.2}>
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={playClick}
                                                className="group relative w-11 h-11 rounded-full border border-border/50 flex items-center justify-center bg-background transition-all duration-500 hover:bg-foreground hover:border-foreground/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:rotate-3 hover:scale-110"
                                                aria-label={link.label}
                                            >
                                                {IconComponent ? (
                                                    <IconComponent className="w-4 h-4 text-foreground transition-colors duration-500 group-hover:text-background" />
                                                ) : (
                                                    <span className="text-xs font-bold text-foreground transition-colors duration-500 group-hover:text-background">
                                                        {link.label[0]}
                                                    </span>
                                                )}
                                            </a>
                                        </Magnetic>
                                    );
                                })}
                            </div>
                        </BlurReveal>

                        {/* ─── Mobile Scroll Indicator ─── */}
                        <div className="flex w-full flex-col items-center justify-center gap-4 pb-4 pt-10 text-muted-foreground lg:hidden">
                            <div className="w-px h-12 bg-border relative overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-1/2 bg-foreground"
                                    animate={{
                                        y: ["0%", "100%", "0%"]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>
                            <span className="text-xs font-mono tracking-[0.12em] uppercase opacity-70">
                                {dict.scrollDown} to send message
                            </span>
                        </div>
                    </div>

                    {/* ─── Right Column: Contact Form ─── */}
                    <BlurReveal delay={0.15}>
                        <div className="relative">
                            {/* Glass card */}
                            <div className="relative rounded-2xl border border-border/30 bg-card/50 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/5">
                                {/* Top accent line */}
                                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

                                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                                    <FloatingInput
                                        id="name"
                                        label={dict.formName}
                                        placeholder={dict.formNamePlaceholder}
                                        value={formData.name}
                                        onChange={(v) => updateField("name", v)}
                                        error={errors.name}
                                    />
                                    <FloatingInput
                                        id="email"
                                        label={dict.formEmail}
                                        placeholder={dict.formEmailPlaceholder}
                                        type="email"
                                        value={formData.email}
                                        onChange={(v) => updateField("email", v)}
                                        error={errors.email}
                                    />
                                    <FloatingInput
                                        id="subject"
                                        label={dict.formSubject}
                                        placeholder={dict.formSubjectPlaceholder}
                                        value={formData.subject}
                                        onChange={(v) => updateField("subject", v)}
                                        error={errors.subject}
                                    />
                                    <FloatingInput
                                        id="message"
                                        label={dict.formMessage}
                                        placeholder={dict.formMessagePlaceholder}
                                        value={formData.message}
                                        onChange={(v) => updateField("message", v)}
                                        error={errors.message}
                                        isTextArea
                                    />

                                    {/* ─── Send Button ─── */}
                                    <button
                                        type="submit"
                                        onClick={playClick}
                                        disabled={sendState === "sending"}
                                        className="group relative mt-2 flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-signal bg-signal text-[#07100a] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                                    >
                                        {/* Shine sweep */}
                                        <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-12 group-hover:duration-1000 group-hover:translate-x-full">
                                            <div className="relative h-full w-8 bg-background/15" />
                                        </div>
                                        <span className="relative z-10 flex items-center gap-3 text-sm font-semibold tracking-[0.15em] uppercase">
                                            {sendState === "sending" ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    {dict.sending}
                                                </>
                                            ) : (
                                                <>
                                                    {dict.sendMessage}
                                                    <Send className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </BlurReveal>
                </div>

                {/* ─── Footer ─── */}
                <footer className="mt-10 flex w-full flex-col gap-6 border-t border-border/50 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <div><p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">2026 <span className="mx-2 text-signal">/</span> SNEH RAUNAK.</p><p className="mt-2 text-xs text-muted-foreground">ML systems and full-stack product work.</p></div>
                    <div className="flex flex-wrap gap-x-5 gap-y-3 font-mono text-xs tracking-[.1em] text-muted-foreground">
                        <a href="https://github.com/snehOP9" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GITHUB</a>
                        <a href="https://www.linkedin.com/in/sneh-raunak/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LINKEDIN</a>
                        <a href="/resume/Sneh_Raunak_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">RESUME</a>
                        <a href={`mailto:${content.contact.email}`} className="hover:text-foreground">EMAIL</a>
                    </div>
                </footer>
            </div>

            {/* ─── Sending / Success / Error Overlay ─── */}
            <AnimatePresence>
                {sendState !== "idle" && sendState !== "sending" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                            onClick={() => sendState === "error" ? undefined : setSendState("idle")}
                        />

                        {/* Content Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10 flex flex-col items-center text-center gap-6 px-8 py-12 sm:px-12 max-w-md mx-4 rounded-2xl border border-border/30 bg-card/90 backdrop-blur-xl shadow-2xl"
                        >
                            {sendState === "success" && (
                                <>
                                    <AnimatedCheckmark />
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-bold tracking-tight text-foreground">
                                            {dict.successTitle}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {dict.successSubtitle}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSendState("idle")}
                                        className="group relative flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-foreground px-8 text-background transition-all duration-500 hover:bg-background hover:text-foreground hover:border-foreground/30"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase">
                                            {dict.close}
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                                        </span>
                                    </button>
                                </>
                            )}

                            {sendState === "error" && (
                                <>
                                    <AnimatedErrorIcon />
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-bold tracking-tight text-foreground">
                                            {deliveryError === "activation" ? dict.activationTitle : dict.errorTitle}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {deliveryError === "activation" ? dict.activationSubtitle : dict.errorSubtitle}
                                        </p>
                                    </div>
                                    <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                                        <button
                                            onClick={() => setSendState("idle")}
                                            className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-border/50 px-6 text-foreground transition-all duration-500 hover:bg-secondary/30"
                                        >
                                            <span className="text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-2">
                                                <X className="w-3.5 h-3.5" />
                                                {dict.close}
                                            </span>
                                        </button>
                                        {deliveryError !== "activation" && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSendState("idle");
                                                    setTimeout(() => void submitForm(), 100);
                                                }}
                                                className="group relative flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-foreground px-6 text-background transition-all duration-500 hover:bg-background hover:text-foreground hover:border-foreground/30"
                                            >
                                                <span className="relative z-10 text-xs font-semibold tracking-[0.15em] uppercase">
                                                    {dict.retry}
                                                </span>
                                            </button>
                                        )}
                                        <a
                                            href={`mailto:${content.contact.email}?subject=${encodeURIComponent(`[Portfolio] ${formData.subject}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`}
                                            className="group relative flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-signal bg-signal px-6 text-[#07100a] transition-all duration-300 hover:brightness-110"
                                        >
                                            <span className="relative z-10 flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
                                                <Mail className="h-3.5 w-3.5" />
                                                {dict.emailDirectly}
                                            </span>
                                        </a>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Sending Overlay (separate so it shows during API call) ─── */}
            <AnimatePresence>
                {sendState === "sending" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10 flex flex-col items-center text-center gap-5 px-8 py-12 sm:px-12 max-w-md mx-4 rounded-2xl border border-border/30 bg-card/90 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="relative w-16 h-16">
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-border/30"
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-foreground"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-lg font-bold tracking-tight text-foreground">
                                    {dict.sendingOverlayTitle}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {dict.sendingOverlaySubtitle}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
