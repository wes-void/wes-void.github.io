/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages (no Node server at runtime).
  output: 'export',
  // Pages serves each route as a folder with index.html, e.g. /work/threshold-os/.
  trailingSlash: true,
  // next/image optimization needs a server; the site uses plain <img>, so disable it.
  images: { unoptimized: true },
}

export default nextConfig
