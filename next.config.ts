/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // این خط باعث می‌شه پروژه به صورت فایل‌های HTML/CSS/JS خروجی داده بشه
  images: {
    unoptimized: true, // برای خروجی استاتیک ضروریه
  },
};

export default nextConfig;