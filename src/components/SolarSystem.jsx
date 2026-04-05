import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const planets = [
  { name: 'Mercury', color: '#aaaaaa', radius: 0.5, distance: 6, speed: 0.04 },
  { name: 'Venus', color: '#e69a5e', radius: 0.8, distance: 10, speed: 0.015 },
  { name: 'Earth', color: '#4b95f9', radius: 1, distance: 14, speed: 0.01 },
  { name: 'Mars', color: '#c1440e', radius: 0.6, distance: 18, speed: 0.008 },
  { name: 'Jupiter', color: '#c88b3a', radius: 2.5, distance: 26, speed: 0.002 },
  { name: 'Saturn', color: '#f5d796', radius: 2.2, distance: 36, speed: 0.0009, hasRing: true },
  { name: 'Uranus', color: '#e1eeee', radius: 1.5, distance: 45, speed: 0.0004 },
  { name: 'Neptune', color: '#5b5ddf', radius: 1.4, distance: 52, speed: 0.0001 }
];

function Planet({ planet }) {
  const meshRef = useRef();
  const orbitRef = useRef();

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += planet.speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Planet's own rotation
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Orbit Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.distance - 0.05, planet.distance + 0.05, 128]} />
        <meshBasicMaterial color="#ffffff" opacity={0.15} transparent side={THREE.DoubleSide} />
      </mesh>
      
      {/* Planet */}
      <mesh ref={meshRef} position={[planet.distance, 0, 0]}>
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshStandardMaterial color={planet.color} roughness={0.6} metalness={0.2} />
        
        {/* Saturn's Ring */}
        {planet.hasRing && (
          <mesh rotation={[-Math.PI / 3, 0, 0]}>
            <ringGeometry args={[planet.radius * 1.4, planet.radius * 2.2, 64]} />
            <meshBasicMaterial color="#f5d796" opacity={0.7} transparent side={THREE.DoubleSide} />
          </mesh>
        )}
      </mesh>
    </group>
  );
}

function SolarSystemInner() {
  const sunRef = useRef();

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={200} color="#ffeedd" distance={300} decay={1.5} />
      
      {/* Astrofied Glowing Sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial color="#ffaa00" />
      </mesh>
      
      {/* Sun glow effect */}
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial color="#ff7700" transparent opacity={0.3} />
      </mesh>

      {planets.map((planet) => (
        <Planet key={planet.name} planet={planet} />
      ))}
    </>
  );
}

export default function SolarSystem() {
  return (
    <div className="absolute inset-0 z-0 bg-[#020205] overflow-hidden">
      <Canvas camera={{ position: [0, 35, 60], fov: 60 }} dpr={[1, 2]}>
        <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <SolarSystemInner />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3} 
          maxPolarAngle={Math.PI / 2.2} 
          minPolarAngle={Math.PI / 3} 
        />
      </Canvas>
    </div>
  );
}
