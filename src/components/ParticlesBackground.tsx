import { useEffect, useState } from 'react';

interface ParticlesBackgroundProps {
    isDark?: boolean;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    animationDelay: number;
    animationDuration: number;
}

export default function ParticlesBackground({ isDark = false }: ParticlesBackgroundProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const createParticles = () => {
            const newParticles: Particle[] = [];
            const particleCount = 25;

            for (let i = 0; i < particleCount; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.3 + 0.1,
                    animationDelay: Math.random() * 5,
                    animationDuration: 8 + Math.random() * 6,
                });
            }
            setParticles(newParticles);
        };

        createParticles();

        // Add CSS animations to document head
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            @keyframes float-particle {
                0%, 100% { 
                    transform: translate(0px, 0px) scale(1); 
                    opacity: 0.1;
                }
                25% { 
                    transform: translate(30px, -20px) scale(1.2); 
                    opacity: 0.4;
                }
                50% { 
                    transform: translate(-20px, 30px) scale(0.8); 
                    opacity: 0.6;
                }
                75% { 
                    transform: translate(25px, -15px) scale(1.1); 
                    opacity: 0.3;
                }
            }
            
            @keyframes gradient-float {
                0%, 100% { 
                    transform: rotate(0deg) scale(1); 
                }
                33% { 
                    transform: rotate(120deg) scale(1.05); 
                }
                66% { 
                    transform: rotate(240deg) scale(0.95); 
                }
            }
        `;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    const baseColor = isDark ? '#10b981' : '#059669';

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    background: `
                        radial-gradient(circle at 25% 25%, ${baseColor}40 0%, transparent 60%),
                        radial-gradient(circle at 75% 75%, ${baseColor}30 0%, transparent 60%),
                        radial-gradient(circle at 50% 50%, ${baseColor}20 0%, transparent 70%)
                    `,
                    animation: 'gradient-float 20s ease-in-out infinite',
                }}
            />

            {/* Floating particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: baseColor,
                        opacity: particle.opacity,
                        animation: `float-particle ${particle.animationDuration}s ease-in-out infinite`,
                        animationDelay: `${particle.animationDelay}s`,
                        boxShadow: `0 0 ${particle.size * 3}px ${baseColor}50`,
                    }}
                />
            ))}
        </div>
    );
} 