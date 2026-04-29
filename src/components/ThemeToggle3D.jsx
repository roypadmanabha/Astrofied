import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

function Scene() {
    const { isDarkMode } = useTheme();
    const sphereRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (sphereRef.current) {
            sphereRef.current.rotation.y = time * 0.5;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere ref={sphereRef} args={[1, 64, 64]}>
                    <MeshDistortMaterial
                        color={isDarkMode ? '#D4AF37' : '#4B0082'}
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>
        </>
    );
}

export default function ThemeToggle3D() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div 
            className="fixed bottom-8 right-8 z-50 w-24 h-24 cursor-pointer group" 
            onClick={toggleTheme}
        >
            {/* Background Blob/Circle */}
            <motion.div
                initial={false}
                animate={{
                    backgroundColor: isDarkMode ? '#4169E1' : '#4B0082',
                    scale: [1, 1.05, 1],
                    borderRadius: isDarkMode 
                        ? ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                        : ["50%", "55% 45% 50% 50% / 45% 55% 50% 50%", "50%"],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`absolute inset-0 shadow-2xl transition-colors duration-500 ${
                    isDarkMode 
                        ? 'bg-gradient-to-br from-[#002366] via-[#4169E1] to-[#002366] shadow-blue-500/20' 
                        : 'bg-gradient-to-br from-[#4B0082] via-[#6A0DAD] to-[#4B0082] shadow-purple-500/20'
                }`}
            />

            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="relative z-10">
                <Scene />
            </Canvas>
            <motion.div
                initial={false}
                animate={{ 
                    rotate: isDarkMode ? 0 : 180,
                    scale: isDarkMode ? 1 : 1.1
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
                <span className="text-3xl drop-shadow-lg">{isDarkMode ? '🌙' : '☀️'}</span>
            </motion.div>
        </div>
    );
}
