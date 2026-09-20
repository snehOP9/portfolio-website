import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/case-study-page";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const study = getCaseStudy((await params).slug); return study ? { title: study.title, description: study.summary, alternates: { canonical: `/projects/${study.slug}/` } } : {}; }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { const study = getCaseStudy((await params).slug); if (!study) notFound(); return <CaseStudyPage study={study} />; }
