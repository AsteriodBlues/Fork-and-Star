"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useSound from "use-sound";
import { useClientLayoutStore } from "@/store/clientLayoutStore";

const clickSound = "/sounds/click.wav";

type SoundLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function SoundLink({ href, className, children }: SoundLinkProps) {
  const router = useRouter();
  const [play] = useSound(clickSound, { volume: 0.5 });
  const setLoading = useClientLayoutStore((state) => state.setLoading);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Play the sound and set loading but do NOT prevent default navigation
    play();
    setLoading(true);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}