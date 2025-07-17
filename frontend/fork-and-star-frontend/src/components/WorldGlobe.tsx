"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";

const cityData = [
  { city: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { city: "New York", lat: 40.7128, lng: -74.006 },
  { city: "Tokyo", lat: 35.6895, lng: 139.6917 },
  { city: "Paris", lat: 48.8566, lng: 2.3522 },
];

function latLngToVector3(lat: number, lng: number, radius = 5) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

function CityMarker({
  position,
  city,
  onSelectCity,
}: {
  position: THREE.Vector3;
  city: string;
  onSelectCity: (city: string) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
    if (ref.current) ref.current.scale.set(scale, scale, scale);
  });

  return (
    <>
      <mesh
        ref={ref}
        position={position}
        onClick={() => onSelectCity(city)}
        className="cursor-pointer"
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#facc15" />
      </mesh>

      <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.13, 32]} />
        <meshBasicMaterial color="#fb7185" transparent opacity={0.6} />
      </mesh>

      {/* Floating modern label */}
      <Html
        position={[position.x, position.y + 0.3, position.z]}
        style={{
          background: "rgba(0,0,0,0.7)",
          padding: "4px 10px",
          borderRadius: "6px",
          color: "#facc15",
          fontWeight: "bold",
          fontSize: "12px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
        center
      >
        {city}
      </Html>
    </>
  );
}

function Earth({ texture }: { texture: THREE.Texture | null }) {
  return (
    <>
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial map={texture || undefined} roughness={1} metalness={0} />
      </mesh>

      {/* Subtle glow */}
      <mesh>
        <sphereGeometry args={[5.1, 64, 64]} />
        <meshBasicMaterial color="#fb7185" transparent opacity={0.02} />
      </mesh>
    </>
  );
}

export default function WorldGlobe({ onSelectCity }: { onSelectCity: (city: string) => void }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
      (tex) => setTexture(tex),
      undefined,
      (err) => console.error("Texture load error:", err)
    );
  }, []);

  return (
    <div className="w-full h-[70vh] rounded-3xl overflow-hidden relative border border-yellow-500 shadow-2xl">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          <Earth texture={texture} />
          {cityData.map((cityObj) => (
            <CityMarker
              key={cityObj.city}
              city={cityObj.city}
              position={latLngToVector3(cityObj.lat, cityObj.lng)}
              onSelectCity={onSelectCity}
            />
          ))}
        </Suspense>
        <Stars radius={80} depth={50} count={15000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <style jsx>{`
        div::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, #facc1530, #fb718520, #818cf810);
          filter: blur(80px);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}