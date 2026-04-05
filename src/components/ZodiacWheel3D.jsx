import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, MeshDistortMaterial, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

function ZodiacScene() {
    const { isDarkMode } = useTheme();
    const ringRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (ringRef.current) {
            ringRef.current.rotation.z = time * 0.2;
            ringRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color={isDarkMode ? '#D4AF37' : '#4B0082'} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={ringRef}>
                    <torusGeometry args={[2, 0.05, 16, 100]} />
                    <meshStandardMaterial
                        color={isDarkMode ? '#bcd437ff' : '#4B0082'}
                        emissive={isDarkMode ? '#c2d437ff' : '#4B0082'}
                        emissiveIntensity={0.5}
                        metalness={1}
                        roughness={0.1}
                    />
                </mesh>

                {/* Inner glow or secondary element */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[1.8, 1.85, 64]} />
                    <meshBasicMaterial color={isDarkMode ? '#D4AF37' : '#4B0082'} transparent opacity={0.3} side={2} />
                </mesh>
            </Float>
        </>
    );
}

export default function ZodiacWheel3D() {
    return (
        <div className="w-full h-[400px] md:h-full">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ZodiacScene />
            </Canvas>
        </div>
    );
}
