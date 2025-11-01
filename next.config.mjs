/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "res.cloudinary.com", // ✅ added Cloudinary
    ],
  },
};

export default nextConfig;
