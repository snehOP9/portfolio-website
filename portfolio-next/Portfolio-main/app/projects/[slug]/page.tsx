import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/case-study-page";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const study = getCaseStudy((await params).slug); return study ? { title: study.title, description: study.summary, alternates: { canonical: `/projects/${study.slug}/` }, openGraph: { title: study.title, description: study.summary, url: `/projects/${study.slug}/`, images: [{ url: "/og.png", width: 1200, height: 630, alt: `${study.title} by Sneh Raunak` }] }, twitter: { card: "summary_large_image", title: study.title, description: study.summary, images: ["/og.png"] } } : {}; }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { const study = getCaseStudy((await params).slug); if (!study) notFound(); return <CaseStudyPage study={study} />; }
