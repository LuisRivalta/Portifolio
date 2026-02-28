"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Briefcase, BookOpen, Code, ChevronRight, GraduationCap } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

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

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background glow effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-zinc-800/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tighter bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            MeuPortfólio.
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#experiencia" className="hover:text-white transition-colors">Experiência</a>
            <a href="#projetos" className="hover:text-white transition-colors">Projetos</a>
            <a href="#cursos" className="hover:text-white transition-colors">Cursos</a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 flex flex-col gap-32">
        {/* Hero Section */}
        <motion.section
          id="sobre"
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-12"
        >
          <div className="flex-1 flex flex-col gap-6">
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass w-fit text-sm text-purple-300 border border-purple-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                {profile?.status_text || 'Disponível para oportunidades'}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass w-fit text-sm text-zinc-400 border border-zinc-800/50">
                📍 {profile?.location || 'Brasil'}
              </div>
              {profile?.age && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass w-fit text-sm text-zinc-400 border border-zinc-800/50">
                  🎂 {profile.age} anos
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-1 mb-6 mt-2">
              <span className="text-xl md:text-2xl font-medium text-zinc-400 block mb-3">
                Olá, meu nome é
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                {profile?.name || 'Seu Nome'}
              </h1>

              {profile?.role_title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight pb-2 mt-2 flex items-center">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                    {profile.role_title}
                  </span>
                </h2>
              )}
            </motion.div>

            <motion.p variants={fadeIn} className="text-lg text-zinc-400 max-w-lg leading-relaxed whitespace-pre-line">
              {profile?.bio || 'Sou um Desenvolvedor Full-Stack apaixonado por criar interfaces bonitas, sistemas performáticos e produtos escaláveis que resolvem problemas reais.'}
            </motion.p>

            <motion.div variants={fadeIn} className="flex items-center gap-4 pt-4">
              {profile?.github_url && (
                <a href={profile.github_url} target="_blank" rel="noreferrer" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group">
                  <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </a>
              )}
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group">
                  <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group">
                  <Mail className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </a>
              )}
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="relative flex-shrink-0 mt-8 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-[2.5rem] blur-3xl opacity-20 animate-pulse" />
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] rounded-[2.5rem] border border-zinc-700/50 p-2.5 overflow-hidden glass rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                <Image
                  src={profile?.avatar_url || "/profile.png"}
                  alt="Minha foto de perfil"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Elemento flutuante decorativo */}
            {profile?.role_title && (
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass border border-zinc-700/50 p-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl"
              >
                <div className="text-3xl">👨‍💻</div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight max-w-[120px]">{profile.role_title}</p>
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
          className="flex flex-col gap-10"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl font-bold tracking-tight text-white">Experiência</h2>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-zinc-500 py-10 text-center border-2 border-dashed border-zinc-800/50 rounded-2xl glass">
              Nenhuma experiência adicionada.
            </div>
          ) : (
            <div className="flex flex-col gap-6 border-l border-zinc-800/50 pl-6 lg:pl-8 ml-3 lg:ml-4">
              {experiences.map((exp) => (
                <motion.div key={exp.id} variants={fadeIn} className="relative flex flex-col gap-2">
                  <div className="absolute w-3 h-3 bg-zinc-800 rounded-full -left-[31px] lg:-left-[39px] top-2 ring-4 ring-zinc-950 border border-zinc-700 pointer-events-none" />
                  <span className="text-sm font-medium text-purple-400">
                    {exp.start_date} - {exp.is_current ? "Presente" : exp.end_date}
                  </span>
                  <h3 className="text-xl font-semibold text-zinc-100">{exp.role}</h3>
                  <span className="text-zinc-500 text-sm pb-2">{exp.company}</span>
                  <p className="text-zinc-400 leading-relaxed max-w-2xl whitespace-pre-line">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
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
          className="flex flex-col gap-10"
        >
          <motion.div variants={fadeIn} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-blue-400" />
              <h2 className="text-3xl font-bold tracking-tight text-white">Projetos em Destaque</h2>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-zinc-500 py-10 text-center border-2 border-dashed border-zinc-800/50 rounded-2xl glass">
              Nenhum projeto em destaque publicado ainda.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col rounded-2xl glass border border-zinc-800/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="h-48 bg-zinc-900 border-b border-zinc-800 relative overflow-hidden flex items-center justify-center">
                    {/* Imagem do Projeto Real ou um Placeholder animado */}
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col gap-4 relative flex-1">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-100 mb-1">{project.title}</h3>
                      <p className="text-sm text-zinc-400 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.technologies?.map((tech: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-800/50 text-xs font-medium text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-4 mt-auto border-t border-zinc-800/50">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                          <Github className="w-4 h-4" /> Código
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors ml-auto">
                          Ver ao vivo <ExternalLink className="w-4 h-4" />
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
          className="flex flex-col gap-10"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <h2 className="text-3xl font-bold tracking-tight text-white">Cursos e Especializações</h2>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-zinc-500 py-10 text-center border-2 border-dashed border-zinc-800/50 rounded-2xl glass">
              Nenhum curso adicionado.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={fadeIn}
                  className="p-5 rounded-2xl glass border border-zinc-800/50 hover:bg-zinc-800/20 transition-colors group cursor-pointer flex flex-col gap-3 relative"
                >
                  {course.certificate_url && (
                    <a href={course.certificate_url} target="_blank" rel="noreferrer" className="absolute inset-0 z-10" aria-label="Ver certificado" />
                  )}
                  <div className="p-2.5 rounded-xl bg-zinc-800/50 w-fit">
                    <GraduationCap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-100 group-hover:text-emerald-300 transition-colors">{course.name}</h3>
                    <p className="text-sm text-zinc-500">{course.institution} • {course.issue_date}</p>
                  </div>
                  {course.certificate_url && (
                    <div className="flex items-center text-xs font-medium text-zinc-400 mt-2">
                      Ver certificado <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="mt-32 border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Meu Portfólio. Todos os direitos reservados.</p>
          <p>
            Construído com <span className="text-white hover:text-purple-400 transition-colors">Next.js</span> & <span className="text-white hover:text-green-400 transition-colors">Supabase</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
