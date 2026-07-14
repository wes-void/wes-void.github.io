'use client'

import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform float u_scroll;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.3, 7.1);
    a *= 0.5;
  }
  return v;
}

float hash1(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0);

  float t = u_time * 0.045;
  float drift = u_scroll * 0.55;

  // domain-warped film thickness field
  vec2 q = vec2(
    fbm(p * 1.3 + vec2(t, drift * 0.4)),
    fbm(p * 1.3 + vec2(5.2, 1.3) - vec2(t * 0.7, drift * 0.6))
  );
  float h = fbm(p * 2.2 + 2.2 * q + vec2(0.0, drift));
  h = 0.5 + 0.5 * (h * 1.6); // remap signed fbm to ~0..1

  // liquid chrome on white: electric-blue cores, cyan halo, trace fringe
  float patch = smoothstep(0.0, 0.32, q.x);
  float d = abs(h - 0.58);

  float core = (1.0 - smoothstep(0.022, 0.038, d)) * patch;
  float halo = smoothstep(0.026, 0.04, d) * (1.0 - smoothstep(0.052, 0.068, d)) * patch;
  float fringe = smoothstep(0.058, 0.07, d) * (1.0 - smoothstep(0.078, 0.092, d)) * patch;

  // soft gray marbling so the white reads liquid, not flat
  float chrome = 1.0 - 0.05 * smoothstep(-0.25, 0.45, q.y);

  vec3 col = vec3(0.988, 0.988, 0.992) * chrome;
  col = mix(col, vec3(0.45, 0.92, 1.0), halo * 0.42);
  col = mix(col, vec3(0.9, 0.62, 0.95), fringe * 0.1);
  col = mix(col, vec3(0.14, 0.28, 0.97), min(0.55, core * 0.85));

  // grain
  col += (hash1(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`

export function OilSlick() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', {
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('OilSlick shader:', gl.getShaderInfoLog(s))
      }
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('OilSlick link:', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uScroll = gl.getUniformLocation(prog, 'u_scroll')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let smoothScroll = window.scrollY / window.innerHeight

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let running = true
    const start = performance.now()

    const frame = (now: number) => {
      if (!running) return
      const target = window.scrollY / window.innerHeight
      smoothScroll += (target - smoothScroll) * 0.06
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform1f(uScroll, smoothScroll)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduced) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running && !reduced) raf = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="oil-slick" aria-hidden />
}
