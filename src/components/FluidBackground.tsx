import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // We want a full screen quad. When camera is orthographic or we bypass MVP matrix,
    // we can just map position to gl_Position directly.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    // Fix aspect ratio distortion
    st.x *= uResolution.x / uResolution.y;

    // Time variables for smoother, faster fluid movement
    float t = uTime * 0.12; // Increased speed for a more dynamic, flowing feel
    
    vec2 q = vec2(0.);
    q.x = fbm(st + 0.05 * t); // Added slight horizontal drift
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm(st + 1.2 * q + vec2(1.7, 9.2) + 0.2 * t);
    r.y = fbm(st + 1.2 * q + vec2(8.3, 2.8) + 0.18 * t);

    float f = fbm(st + r);

    // Deep & Elegant Neon Colors (Concept 2: Abyssal Bioluminescence)
    vec3 colorBase = vec3(0.005, 0.01, 0.04);  // Deep abyssal blue/purple base
    vec3 colorGlow1 = vec3(0.00, 0.95, 1.00);  // Smooth Neon Turquoise
    vec3 colorGlow2 = vec3(1.00, 0.37, 0.00);  // Subtle Neon Orange highlights
    vec3 colorShadow = vec3(0.002, 0.005, 0.02); // Ink-like dark shadow

    vec3 color = mix(colorBase, colorShadow, clamp(f*f * 4.0, 0.0, 1.0));
    
    // Softer, more fluid blends with slightly wider spread
    color = mix(color, colorGlow1, clamp(length(q) * 0.75, 0.0, 1.0));
    color = mix(color, colorGlow2, clamp(length(r.x) * 0.55, 0.0, 1.0));

    // Increase contrast to make neons pop against the dark depth
    color = pow(color * f * 2.0, vec3(1.5));
    
    // Soft vignette
    vec2 uv = gl_FragCoord.xy / uResolution.xy - 0.5;
    float vignette = 1.0 - dot(uv, uv) * 1.5;
    color *= smoothstep(0.0, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) }
  }), [size]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* 2x2 plane covers the entire screen in normalized device coordinates */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function FluidBackground() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#000', overflow: 'hidden', pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={isMobile ? 0.3 : [1, 1.5]} // Extremely low resolution on mobile to save GPU cycles on the heavy fbm shader
        gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }} // Antialias not needed for full screen quad
      >
        <FluidPlane />
      </Canvas>
    </div>
  );
}
