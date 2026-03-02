"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Briefcase, BookOpen, Code, ChevronRight, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // High-performance mouse tracking (no React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax calculations
  const rotateX = useTransform(springY, [0, 1200], [15, -15]);
  const rotateY = useTransform(springX, [0, 1920], [-15, 15]);
  const translateX = useTransform(springX, [0, 1920], [-30, 30]);
  const translateY = useTransform(springY, [0, 1200], [-30, 30]);
  const floatX = useTransform(springX, [0, 1920], [20, -20]);
  const floatY = useTransform(springY, [0, 1200], [20, -20]);

  // Dynamic Aura Gradient
  const auraBackground = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.03), transparent 40%)`
  );

  const supabase = createClient();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const [projRes, expRes, courseRes, profileRes] = await Promise.all([
        supabase.from("projects").select("*").eq("is_featured", true).order("created_at", { ascending: false }),
        supabase.from("experiences").select("*").order("created_at", { ascending: false }),
        supabase.from("courses").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").single()
      ]);

      if (projRes.data) setProjects(projRes.data);
      if (expRes.data) setExperiences(expRes.data);
      if (courseRes.data) setCourses(courseRes.data);
      if (profileRes.data) setProfile(profileRes.data);

      setIsLoading(false);
    };

    fetchData();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] selection:bg-purple-500/30">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin glass"></div>
          <p className="text-zinc-500 font-medium animate-pulse tracking-widest text-sm uppercase">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden selection:bg-purple-500/30 selection:text-purple-200 font-sans">
      {/* Background glow effects - Animated Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none animate-blob" />
      <div className="fixed top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none animate-blob animation-delay-2000" />
      <div className="fixed bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-pink-600/5 blur-[150px] pointer-events-none animate-blob animation-delay-4000" />

      {/* Fun Interaction: Magic Cursor Aura (Optimized) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 opacity-70"
        style={{ background: auraBackground }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-xl tracking-tighter text-white flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            MeuPortfólio.
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400"
          >
            <a href="#sobre" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Sobre</a>
            <a href="#experiencia" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Experiência</a>
            <a href="#projetos" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Projetos</a>
            <a href="#cursos" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Cursos</a>
          </motion.div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 flex flex-col gap-40">
        {/* Hero Section */}
        <motion.section
          id="sobre"
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-12"
        >
          <div className="flex-1 flex flex-col gap-6 z-10 min-w-0">
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel w-fit text-sm font-medium text-purple-300 border border-purple-500/10 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500/80"></span>
                </span>
                {profile?.status_text || 'Disponível para oportunidades'}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel w-fit text-sm font-medium text-zinc-300 border border-zinc-700/50">
                📍 {profile?.location || 'Brasil'}
              </div>
              {profile?.age && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel w-fit text-sm font-medium text-zinc-300 border border-zinc-700/50">
                  🎂 {profile.age} anos
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-2 mb-6 mt-4">
              <span className="text-xl md:text-2xl font-medium text-zinc-400 block mb-2">
                Olá, meu nome é
              </span>

              <h1 className="text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[1.1] drop-shadow-lg">
                {profile?.name || 'Seu Nome'}
              </h1>

              {profile?.role_title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight pb-2 mt-4 flex items-center">
                  <span className="text-gradient">
                    {profile.role_title}
                  </span>
                </h2>
              )}
            </motion.div>

            <motion.p variants={fadeIn} className="text-lg text-zinc-400 max-w-xl leading-relaxed whitespace-pre-line font-medium">
              {profile?.bio || 'Sou um Desenvolvedor Full-Stack apaixonado por criar interfaces bonitas, sistemas performáticos e produtos escaláveis que resolvem problemas reais.'}
            </motion.p>

            <motion.div variants={fadeIn} className="flex items-center gap-4 pt-6">
              {profile?.github_url && (
                <a href={profile.github_url} target="_blank" rel="noreferrer" className="p-3.5 rounded-2xl glass-panel hover:bg-white/10 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group shadow-lg">
                  <Github className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
                </a>
              )}
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="p-3.5 rounded-2xl glass-panel hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group shadow-lg">
                  <Linkedin className="w-5 h-5 text-zinc-300 group-hover:text-[#0A66C2] transition-colors" />
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="p-3.5 rounded-2xl glass-panel hover:bg-purple-500/20 hover:border-purple-500/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group shadow-lg">
                  <Mail className="w-5 h-5 text-zinc-300 group-hover:text-purple-400 transition-colors" />
                </a>
              )}
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn}
            className="relative flex-shrink-0 mt-8 md:mt-0 z-10 lg:translate-x-12 xl:translate-x-20"
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-purple-500/50 via-blue-500/40 to-emerald-400/30 rounded-full blur-[100px] opacity-20 animate-pulse lg:translate-x-8"
              style={{ x: translateX, y: translateY }}
            />

            <motion.div
              className="relative w-72 h-72 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] rounded-full sm:rounded-[3rem] border border-white/10 p-2 overflow-hidden glass-panel shadow-2xl group"
              style={{ rotateX, rotateY }}
            >
              <div className="w-full h-full rounded-full sm:rounded-[2.5rem] overflow-hidden relative">
                <Image
                  src={profile?.avatar_url || "/profile.png"}
                  alt="Minha foto de perfil"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Elementos flutuantes decorativos - Interactive Parallax */}
            {profile?.role_title && (
              <motion.div
                style={{
                  x: floatX,
                  y: floatY
                }}
                className="absolute -bottom-4 -left-8 md:-bottom-8 md:-left-12 glass-panel border border-white/10 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-xl shadow-2xl z-20 pointer-events-none"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl shadow-inner">
                  👨‍💻
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-1">Especialista</p>
                  <p className="text-sm font-bold text-white leading-tight max-w-[140px]">{profile.role_title}</p>
                </div>
              </motion.div>
            )}


          </motion.div>
        </motion.section>

        {/* Experiência */}
        <motion.section
          id="experiencia"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="flex flex-col gap-12 relative z-10"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] block-glow">
              <Briefcase className="w-7 h-7" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">Experiência</h2>
          </motion.div>

          {experiences.length === 0 ? (
            <div className="text-zinc-500 py-16 text-center border-2 border-dashed border-zinc-800/50 rounded-3xl glass-panel">
              Nenhuma experiência adicionada.
            </div>
          ) : (
            <div className="relative pl-6 lg:pl-8 ml-3 lg:ml-4">
              {/* Timeline line */}
              <div className="absolute left-[3px] lg:left-[5.5px] top-4 bottom-4 w-px bg-gradient-to-b from-purple-500 via-blue-500/50 to-transparent" />

              <div className="flex flex-col gap-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    variants={fadeIn}
                    className="relative flex flex-col gap-3 group"
                  >
                    {/* Glowing dot on timeline */}
                    <div className="absolute w-4 h-4 bg-zinc-950 rounded-full -left-[30px] lg:-left-[39px] top-1.5 ring-4 ring-zinc-900 border-2 border-purple-500 group-hover:scale-125 group-hover:bg-purple-400 group-hover:border-purple-400 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                      <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-purple-300 transition-colors">{exp.role}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/20 whitespace-nowrap w-fit">
                        {exp.start_date} - {exp.is_current ? "Presente" : exp.end_date}
                      </span>
                    </div>

                    <span className="text-zinc-400 text-lg font-medium flex items-center gap-2">
                      <span className="w-6 h-px bg-zinc-700 inline-block" />
                      {exp.company}
                    </span>

                    <div className="glass-panel p-6 rounded-2xl mt-2 border-white/5 group-hover:border-purple-500/20 transition-colors relative overflow-hidden shadow-lg hover:shadow-purple-500/5">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="text-zinc-400 leading-relaxed text-base whitespace-pre-line relative z-10">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        {/* Projetos */}
        <motion.section
          id="projetos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="flex flex-col gap-12 relative z-10"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Code className="w-7 h-7" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">Projetos em Destaque</h2>
          </motion.div>

          {projects.length === 0 ? (
            <div className="text-zinc-500 py-16 text-center border-2 border-dashed border-zinc-800/50 rounded-3xl glass-panel">
              Nenhum projeto em destaque publicado ainda.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeIn}
                  className="group card-shine flex flex-col rounded-[2.5rem] glass-panel border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all duration-500 relative shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
                  style={{
                    transform: `translateY(${index % 2 !== 0 ? '20px' : '0px'})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="h-64 bg-zinc-900 border-b border-zinc-800 relative overflow-hidden flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0c] z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-700 ease-out flex items-center justify-center">
                      </div>
                    )}

                    {/* Floating Tech Stack Badges on Image */}
                    <div className="absolute bottom-5 left-5 z-20 flex gap-2 flex-wrap">
                      {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white/70 shadow-lg">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col gap-5 relative flex-1 z-20">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                      <p className="text-base text-zinc-400 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 mt-auto border-t border-zinc-800/80">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-colors border border-white/5">
                          <Github className="w-4 h-4" /> Código
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-sm font-bold text-white transition-all shadow-lg shadow-blue-500/25 ml-auto">
                          Ver ao vivo <ExternalLink className="w-4 h-4 block mb-[1px]" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Cursos */}
        <motion.section
          id="cursos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="flex flex-col gap-12 relative z-10"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <BookOpen className="w-7 h-7" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">Cursos e Especializações</h2>
          </motion.div>

          {courses.length === 0 ? (
            <div className="text-zinc-500 py-16 text-center border-2 border-dashed border-zinc-800/50 rounded-3xl glass-panel">
              Nenhum curso adicionado.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={fadeIn}
                  className="p-6 rounded-[2rem] glass-panel border border-white/5 hover:border-emerald-500/30 hover:bg-white/5 transition-all duration-300 group cursor-pointer flex flex-col gap-4 relative shadow-lg hover:-translate-y-1 hover:shadow-emerald-500/10"
                >
                  {course.certificate_url && (
                    <a href={course.certificate_url} target="_blank" rel="noreferrer" className="absolute inset-0 z-10" aria-label="Ver certificado" />
                  )}
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-inner group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-6 h-6 text-emerald-400" />
                    </div>
                    {course.certificate_url && (
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-emerald-500 group-hover:text-white text-zinc-500 transition-colors">
                        <ArrowRight className="w-4 h-4 -rotate-45" />
                      </div>
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{course.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                      <span>{course.institution}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                      <span>{course.issue_date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-white/5 bg-black/40 backdrop-blur-xl relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-lg tracking-tighter text-white">MeuPortfólio.</span>
          </div>
          <p className="text-sm font-medium text-zinc-500">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-500">
            <span className="flex items-center gap-1">Feito com <span className="text-white hover:text-purple-400 transition-colors cursor-pointer">Next.js</span></span>
            <span className="flex items-center gap-1">& <span className="text-white hover:text-green-400 transition-colors cursor-pointer">Supabase</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
