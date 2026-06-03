import { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Float, OrbitControls, Html, MeshTransmissionMaterial, Environment, Text3D } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Loader ─── */
function ModelLoader() {
  return (
    <Html center>
      <div className="hud-loader-container">
        <div className="hud-loader-spinner" />
        <span className="hud-data-text" style={{ fontSize: '0.75rem', marginTop: '12px', color: '#D4AF37', letterSpacing: '2px' }}>
          LOADING GLASS TYPOGRAPHY...
        </span>
      </div>
    </Html>
  );
}

interface GlassConfig {
  colorPreset: string;
  speed: number;
  roughness: number;
  transmission: number;
  distortion: number;
}

const colorMap: Record<string, string> = {
  silver: '#ffffff',
  gold: '#D4AF37',
  ruby: '#ff3366',
  emerald: '#10b981',
  obsidian: '#1a1a1a'
};

/* ─── Floating Ambient Dust Particles ─── */
function AmbientDust({ colorPreset }: { colorPreset: string }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6.0;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6.0;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6.0;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = t * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <float32BufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={colorMap[colorPreset] || '#ffffff'}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── 3D Glass Typography Sculpture ─── */
function GlassTypography({ isHovered, config }: { isHovered: boolean; config: GlassConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const currentRotationY = useRef(0);
  const currentRotationX = useRef(0);
  const baseRotationY = useRef(0); // For continuous slow motion rotation

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow digital showcase continuous rotation
    baseRotationY.current -= delta * 0.25 * config.speed;

    let targetRotationY = baseRotationY.current;
    let targetRotationX = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.05;

    // React to mouse movement
    if (isHovered) {
      targetRotationY += state.pointer.x * 0.6;
      targetRotationX += -state.pointer.y * 0.3;
    }

    // Smooth lerping
    currentRotationY.current += (targetRotationY - currentRotationY.current) * 3.0 * delta;
    currentRotationX.current += (targetRotationX - currentRotationX.current) * 3.0 * delta;

    groupRef.current.rotation.y = currentRotationY.current;
    groupRef.current.rotation.x = currentRotationX.current;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.75}
          height={0.4}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.06}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={16}
        >
          1618
          <MeshTransmissionMaterial
            backside={false}
            samples={4}
            resolution={512}
            thickness={1.5}
            chromaticAberration={0.15}
            anisotropy={0.3}
            distortion={config.distortion}
            distortionScale={0.3}
            temporalDistortion={0.05}
            transmission={config.transmission}
            roughness={config.roughness}
            color={colorMap[config.colorPreset] || "#ffffff"}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Text3D>
      </Center>

      {/* Internal Silver Light Sphere inside the text - Removed to clean fog effect */}
    </group>
  );
}

/* ─── Minimal HUD Overlay ─── */
function TypographyHUD({ isHovered }: { isHovered: boolean }) {
  return (
    <Html center pointerEvents="none">
      <div 
        style={{ 
          position: 'relative',
          width: '380px',
          height: '240px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isHovered ? 0.9 : 0.2,
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {/* Minimal corner brackets */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: '1px solid #ffffff', borderLeft: '1px solid #ffffff', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', borderTop: '1px solid #ffffff', borderRight: '1px solid #ffffff', opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '10px', height: '10px', borderBottom: '1px solid #ffffff', borderLeft: '1px solid #ffffff', opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: '1px solid #ffffff', borderRight: '1px solid #ffffff', opacity: 0.5 }} />

        {/* Brand Text */}
        <div style={{ position: 'absolute', left: '-20px', bottom: '-40px', textAlign: 'left', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '2px', color: '#ffffff', opacity: 0.8 }}>
          VOLUMETRIC TYPE // 1618<br/>
          MATERIAL // CHROME GLASS<br/>
        </div>
      </div>
    </Html>
  );
}

/* ─── Export 3D Scene Canvas ─── */
export default function Hero3DScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isHovered, setIsHovered] = useState(false);
  const clickCountRef = useRef(0);
  const [config, setConfig] = useState<GlassConfig>({
    colorPreset: 'silver',
    speed: 1.0,
    roughness: 0.05,
    transmission: 1.0,
    distortion: 0.2
  });

  useEffect(() => {
    // Initial config load
    const savedConfig = localStorage.getItem('1618_3d_config');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (err) {
        // Fallback
      }
    }

    const handleConfigUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setConfig(detail);
      }
    };

    window.addEventListener('1618-config-update', handleConfigUpdate);
    return () => window.removeEventListener('1618-config-update', handleConfigUpdate);
  }, []);

  // Triple click handler to trigger Developer Console
  const handleCanvasClick = () => {
    clickCountRef.current += 1;
    if (clickCountRef.current >= 3) {
      window.dispatchEvent(new CustomEvent('open-dev-console'));
      clickCountRef.current = 0;
    }
    // Reset clicks after 2 seconds of inactivity
    setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);
  };

  return (
    <div 
      className="hero-3d-scene-container" 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '280px',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCanvasClick}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 40 }}
        gl={{ antialias: !isMobile, alpha: true, toneMappingExposure: 1.5, powerPreference: "high-performance" }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
      >
        {/* Lüks Sinematik Işıklandırma (Silver / White) */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight position={[4, 5, 6]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-4, -3, -2]} intensity={2.0} color={config.colorPreset === 'gold' ? '#D4AF37' : '#e2e8f0'} />
        <spotLight position={[0, 8, 0]} intensity={3.5} angle={0.8} penumbra={1} color="#ffffff" />
        
        {/* Beyaz/Gümüş arka plan yansımesi veya preset rengi */}
        <pointLight position={[3, 0, -3]} intensity={1.5} color={colorMap[config.colorPreset] || "#ffffff"} />

        <Float speed={2.0} rotationIntensity={0.1} floatIntensity={0.2}>
          <Center>
            <Suspense fallback={<ModelLoader />}>
              <GlassTypography isHovered={isHovered} config={config} />
            </Suspense>
          </Center>
        </Float>

        {/* Çevre Yansımaları - Cam malzemenin kırılması için zorunlu */}
        <Environment preset="city" />

        <AmbientDust colorPreset={config.colorPreset} />

        <TypographyHUD isHovered={isHovered} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
