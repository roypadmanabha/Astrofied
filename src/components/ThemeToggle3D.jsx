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
                <Sphere ref={sphereRef} args={[1, 32, 32]}>
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
        <div className="fixed bottom-8 right-8 z-50 w-24 h-24 cursor-pointer" onClick={toggleTheme}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Scene />
            </Canvas>
            <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <span className="text-2xl">{isDarkMode ? '🌙' : '☀️'}</span>
            </motion.div>
        </div>
    );
}
