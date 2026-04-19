import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars, MeshTransmissionMaterial } from '@react-three/drei';
import { useTheme } from '@/lib/theme-context';
import * as THREE from 'three';

// Single flowing ribbon wave
const EnergyRibbon = ({ yPos, zPos, color, speed, waveHeight, thickness }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  const geometry = useMemo(() => {
    const segments = 250; // Increased for smoother curves
    const width = 35; // Slightly wider coverage
    const geometry = new THREE.PlaneGeometry(width, thickness, segments, 1);

    return geometry;
  }, [thickness]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Animate wave motion - Slow graceful movement
    const positions = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);

      const waveZ = Math.sin(x * 0.2 + t * speed) * waveHeight +
        Math.cos(x * 0.1 + t * speed * 0.8) * (waveHeight * 0.5);
      positions.setZ(i, waveZ);
    }
    positions.needsUpdate = true;

    // Flow horizontally
    meshRef.current.position.x = ((t * speed * 1.5) % 40) - 20;

    // Pulse opacity
    if (materialRef.current) {
      materialRef.current.opacity = 0.5 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, yPos, zPos]} rotation={[Math.PI / 2.2, 0, 0]}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.2} // Reduced to avoid washing out colors on white
        side={THREE.DoubleSide}
        transparent
        opacity={0.5}
        metalness={0.4} // Silkier feel
        roughness={0.1} // Smoother reflections
        toneMapped={false}
      />
    </mesh>
  );
};

// Floating energy particles
const EnergyParticles = ({ color }: any) => {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;

    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < pos.length; i += 3) {
      pos[i] += velocities[i];
      pos[i + 1] += velocities[i + 1];
      pos[i + 2] += velocities[i + 2];

      // Wrap around
      if (Math.abs(pos[i]) > 15) pos[i] *= -0.8;
      if (Math.abs(pos[i + 1]) > 10) pos[i + 1] *= -0.8;
      if (Math.abs(pos[i + 2]) > 10) pos[i + 2] *= -0.8;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color={color} transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
};

const EnergyWavesScene = () => {
  const { themeConfig } = useTheme();

  const primaryColor = themeConfig.colors.primary || '#2563EB';

  const accentColor = themeConfig.colors.accent || '#22C55E';

  const ribbons = useMemo(() => {
    // Monochrome Palette: Foreground (Black/White), Muted (Gray)
    const mainColor = themeConfig.colors.foreground || '#000000';
    const subColor = themeConfig.colors.muted || '#888888';

    return [
      { yPos: 2, zPos: -5, color: mainColor, speed: 0.4, waveHeight: 1.5, thickness: 1.2 },
      { yPos: 0, zPos: -3, color: subColor, speed: 0.3, waveHeight: 1.8, thickness: 1.5 },
      { yPos: -2, zPos: -4, color: mainColor, speed: 0.5, waveHeight: 1.3, thickness: 1.0 },
      { yPos: 1, zPos: -6, color: subColor, speed: 0.35, waveHeight: 1.6, thickness: 1.1 },
      { yPos: -1, zPos: -2, color: mainColor, speed: 0.45, waveHeight: 1.4, thickness: 1.3 },
    ];
  }, [themeConfig]);

  return (
    <div className="fixed inset-0 -z-10 bg-background transition-colors duration-1000">
      <Canvas camera={{ position: [0, 0, 12], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.7} color={primaryColor} />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color={accentColor} />
        {/* Top-down light for shininess */}
        <directionalLight position={[0, 10, 0]} intensity={0.3} color="#ffffff" />

        {ribbons.map((ribbon, i) => (
          <EnergyRibbon key={i} {...ribbon} />
        ))}

        <EnergyParticles color={themeConfig.colors.foreground || '#888888'} />

        {/* Fog to blend with background - matches theme background */}
        <fog attach="fog" args={[themeConfig.colors.background || '#ffffff', 5, 35]} />
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default EnergyWavesScene;