import { useEffect, useRef } from 'react';

export default function FluidArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source (Generative Liquid Shader with mouse interaction)
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Pseudo-random noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // 2D Noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      // Fractional Brownian Motion
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = -1.0 + 2.0 * uv;
        p.x *= u_resolution.x / u_resolution.y;

        // Smooth mouse coordinates
        vec2 m = u_mouse / u_resolution.xy;
        m = -1.0 + 2.0 * m;
        m.x *= u_resolution.x / u_resolution.y;

        // Interactive mouse force field
        float distToMouse = length(p - m);
        float mouseInfluence = smoothstep(0.8, 0.0, distToMouse);

        // Domain Warping for Fluid Flow
        vec2 q = vec2(0.0);
        q.x = fbm(p + 0.12 * u_time);
        q.y = fbm(p + vec2(1.0));

        vec2 r = vec2(0.0);
        r.x = fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.15 * u_time + m * mouseInfluence * 0.4);
        r.y = fbm(p + 3.0 * q + vec2(8.3, 2.8) + 0.09 * u_time);

        float f = fbm(p + 4.0 * r);

        // Luxury Palette Mapping (Black, Dark Red, Rich Gold, Platinum)
        vec3 colorBg = vec3(0.03, 0.03, 0.04);       // Obsidian Dark
        vec3 colorRed = vec3(0.55, 0.05, 0.08);      // Crimson Luxury Red
        vec3 colorGold = vec3(0.83, 0.68, 0.22);     // Gold Foil
        vec3 colorLight = vec3(0.95, 0.85, 0.65);    // Platinum Champagne

        vec3 col = mix(colorBg, colorRed, clamp(f * f * 3.5, 0.0, 1.0));
        col = mix(col, colorGold, clamp(length(q) * 0.8, 0.0, 1.0));
        col = mix(col, colorLight, clamp(r.x * r.x * 1.5, 0.0, 1.0));

        // Subtle Vignette
        float vignette = 1.0 - dot(uv - 0.5, uv - 0.5) * 1.2;
        col *= clamp(vignette, 0.2, 1.0);
        
        // Output with contrast adjustment
        col = pow(col, vec3(0.95));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Compile Helper
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup buffer
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    // Resize
    const resize = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = rect.height - (e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial mouse center values
    mouseRef.current.targetX = canvas.width / 2;
    mouseRef.current.targetY = canvas.height / 2;
    mouseRef.current.x = canvas.width / 2;
    mouseRef.current.y = canvas.height / 2;

    let animationId: number;
    let startTime = Date.now();

    // Render loop
    const render = () => {
      // Smooth interpolation for lag effect
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, (Date.now() - startTime) * 0.001);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '400px',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      position: 'relative',
      background: '#070707'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
      {/* Outer subtle edge shine */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '24px',
        pointerEvents: 'none',
        boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)'
      }} />
    </div>
  );
}
