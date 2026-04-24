import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

/**
 * CloudFlightBg — High-performance Three.js based cloud flight animation.
 * Optimized for Light Mode to provide a "speed flight through clouds" experience.
 */

const CLOUD_COUNT = 35;

function CloudPart({ position, size, opacity }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[size, 12, 12]} />
            <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={opacity} 
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </mesh>
    );
}

function CloudGroup({ speed }) {
    const groupRef = useRef();
    
    // Procedural cloud formation
    const clouds = useMemo(() => {
        return Array.from({ length: CLOUD_COUNT }).map((_, i) => ({
            id: i,
            pos: [
                (Math.random() - 0.5) * 80, 
                (Math.random() - 0.5) * 40, 
                -Math.random() * 150
            ],
            scale: 2 + Math.random() * 5,
            parts: Array.from({ length: 4 }).map(() => ({
                offset: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2],
                size: 1 + Math.random() * 2,
                opacity: 0.1 + Math.random() * 0.15
            }))
        }));
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        groupRef.current.children.forEach((child) => {
            // Move child (which is a cloud group) towards camera
            child.position.z += speed * 60 * delta;

            // Recycling logic
            if (child.position.z > 20) {
                child.position.z = -150;
                child.position.x = (Math.random() - 0.5) * 80;
                child.position.y = (Math.random() - 0.5) * 40;
            }
        });
    });

    return (
        <group ref={groupRef}>
            {clouds.map((cloud) => (
                <group key={cloud.id} position={cloud.pos}>
                    {cloud.parts.map((part, i) => (
                        <CloudPart 
                            key={i} 
                            position={part.offset} 
                            size={part.size} 
                            opacity={part.opacity} 
                        />
                    ))}
                </group>
            ))}
        </group>
    );
}

function Atmosphere() {
    const { viewport } = useThree();
    return (
        <mesh position={[0, 0, -180]}>
            <planeGeometry args={[viewport.width * 20, viewport.height * 20]} />
            <meshBasicMaterial color="#e0f2fe" />
        </mesh>
    );
}

function Scene() {
    const flightSpeed = 1.2;

    return (
        <>
            <fog attach="fog" args={['#f8fafc', 30, 200]} />
            <ambientLight intensity={1.5} />
            
            <CloudGroup speed={flightSpeed} />

            {/* Distant light source (The Sun/Clear Sky) */}
            <mesh position={[0, 5, -190]}>
                <sphereGeometry args={[40, 32, 32]} />
                <meshBasicMaterial color="#fffbeb" transparent opacity={0.4} />
            </mesh>
            
            <Atmosphere />
        </>
    );
}

export default function CloudFlightBg() {
    const { isDarkMode } = useTheme();

    if (isDarkMode) return null;

    return (
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-white">
            <Canvas 
                camera={{ position: [0, 0, 10], fov: 75 }} 
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <Scene />
            </Canvas>

            {/* Speed Vignette & Cinematic Overlays */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Central clear sky focal point glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(186,230,253,0.1)_0%,rgba(255,255,255,0.4)_100%)]" />
                
                {/* Subtle sky color wash */}
                <div className="absolute inset-0 bg-blue-400/5 mix-blend-overlay" />
                
                {/* Motion blur suggestion edges */}
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(255,255,255,0.8)]" />
            </div>

            <style jsx>{`
                canvas {
                    filter: saturate(1.1) brightness(1.05);
                }
            `}</style>
        </div>
    );
}
