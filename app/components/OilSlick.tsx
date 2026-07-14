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
  float h = fbm(p * 1.7 + 2.2 * q + vec2(0.0, drift));
  h = 0.5 + 0.5 * (h * 1.6); // remap signed fbm to ~0..1

  // thin-film interference palette (oil on water)
  vec3 iri = 0.5 + 0.5 * cos(6.28318 * (h * 3.8 + vec3(0.00, 0.33, 0.67)) + t * 1.5);
  iri = iri * iri * (3.0 - 2.0 * iri);
  // petrol bias: violet/blue/teal only — green and red held down
  iri *= vec3(0.6, 0.42, 1.2);

  // sheen lives in a band of the field, patch-masked so black pools remain
  float sheen = smoothstep(0.38, 0.5, h) * (1.0 - smoothstep(0.6, 0.78, h));
  float patch = smoothstep(-0.18, 0.32, q.x);
  sheen = pow(sheen, 1.3) * patch;

  vec3 base = vec3(0.026, 0.024, 0.036);
  vec3 col = base + iri * sheen * 0.26;

  // gentle vignette to keep edges quiet
  float vig = 1.0 - 0.38 * pow(length(uv - vec2(0.5, 0.45)), 1.6);
  col *= vig;

  // grain
  col += (hash1(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.022;

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
