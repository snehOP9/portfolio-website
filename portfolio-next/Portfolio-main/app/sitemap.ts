import type { MetadataRoute } from "next";
export const dynamic = "force-static";
const routes = ["/", "/projects/sentinelflow/", "/projects/student-performance-predictor/", "/projects/anony-talk/", "/research/short-form-video-xai/"];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((path) => ({ url: `https://snehraunak.in${path}`, lastModified: new Date("2026-09-21"), changeFrequency: "monthly", priority: path === "/" ? 1 : 0.8 })); }
