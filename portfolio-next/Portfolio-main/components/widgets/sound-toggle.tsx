"use client";

import { useSound } from "@/providers/sound-provider";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function SoundToggle() {
    const { isMuted, toggleMute, playClick, playHover } = useSound();

    const handleClick = () => {
        if (!isMuted) {
            playClick(); // Play click right before muting
        }
        toggleMute();
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={playHover}
            className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-secondary/10 text-muted-foreground transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
            <motion.div
                initial={false}
                animate={{ scale: isMuted ? 0 : 1, opacity: isMuted ? 0 : 1, rotate: isMuted ? -45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ scale: isMuted ? 1 : 0, opacity: isMuted ? 1 : 0, rotate: isMuted ? 0 : 45 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
        </button>
    );
}
