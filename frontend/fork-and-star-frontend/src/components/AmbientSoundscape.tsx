import { useEffect, useState } from "react";
import useSound from "use-sound";

interface AmbientSoundscapeProps {
  src: string;
  volume?: number;
  className?: string;
}

export default function AmbientSoundscape({ src, volume = 0.5, className }: AmbientSoundscapeProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [playAmbient, { stop: stopAmbient }] = useSound(src, {
    volume,
    loop: true,
    soundEnabled: !isMuted
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      playAmbient();
    } else {
      stopAmbient();
    }
    return () => stopAmbient();
  }, [isPlaying, playAmbient, stopAmbient]);

  // Start playing on mount
  useEffect(() => {
    setIsPlaying(true);
  }, []);

  return (
    <div className={className}>
      <button
        onClick={() => setIsMuted((m) => !m)}
        className="px-4 py-2 rounded-full bg-black/60 text-white text-sm font-medium border border-white/20 hover:bg-black/80 transition-all duration-200 shadow"
        style={{ backdropFilter: "blur(2px)" }}
      >
        {isMuted ? "🔇 Mute" : "🔊 Soundscape"}
      </button>
    </div>
  );
}
