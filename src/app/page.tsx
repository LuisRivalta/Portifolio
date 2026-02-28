"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Briefcase, BookOpen, Code, ChevronRight, GraduationCap } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
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
                Disponível para oportunidades
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass w-fit text-sm text-zinc-400 border border-zinc-800/50">
                📍 São Paulo, Brasil
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-2">
              <h2 className="text-xl md:text-2xl font-medium text-zinc-400">
                Olá, eu sou o <span className="text-white font-semibold">Seu Nome</span> <span className="text-sm px-2 py-0.5 ml-2 rounded-md bg-zinc-800/50 text-zinc-300">(25 anos)</span>
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Construindo <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  experiências digitais
                </span>
              </h1>
            </motion.div>

            <motion.p variants={fadeIn} className="text-lg text-zinc-400 max-w-lg leading-relaxed">
              Sou um Desenvolvedor Full-Stack apaixonado por criar interfaces bonitas, sistemas performáticos e produtos escaláveis que resolvem problemas reais.
            </motion.p>

            <motion.div variants={fadeIn} className="flex items-center gap-4 pt-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group">
                <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group">
                <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
              <a href="mailto:contato@email.com" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group">
                <Mail className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-[2rem] blur-2xl opacity-20 animate-pulse" />
            <div className="relative w-64 h-64 md:w-[340px] md:h-[340px] rounded-[2rem] border border-zinc-700/50 p-2 overflow-hidden glass rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                <Image
                  src="/profile.png"
                  alt="Minha foto de perfil"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Elemento flutuante decorativo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass border border-zinc-700/50 p-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl"
            >
              <div className="text-3xl">👨‍💻</div>
              <div>
                <p className="text-sm font-bold text-white leading-none">Desenvolvedor</p>
                <p className="text-xs text-zinc-400 mt-1 mt-1">Full-Stack</p>
              </div>
            </motion.div>
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

          <div className="flex flex-col gap-6 border-l border-zinc-800/50 pl-6 lg:pl-8 ml-3 lg:ml-4">
            {[1, 2].map((i) => (
              <motion.div key={i} variants={fadeIn} className="relative flex flex-col gap-2">
                <div className="absolute w-3 h-3 bg-zinc-800 rounded-full -left-[31px] lg:-left-[39px] top-2 ring-4 ring-zinc-950 border border-zinc-700" />
                <span className="text-sm font-medium text-purple-400">2023 - Presente</span>
                <h3 className="text-xl font-semibold text-zinc-100">Engenheiro de Software Senior</h3>
                <span className="text-zinc-500 text-sm pb-2">Empresa de Tecnologia Inc.</span>
                <p className="text-zinc-400 leading-relaxed max-w-2xl">
                  Liderança técnica no desenvolvimento da plataforma principal, migrando de uma arquitetura legada para microsserviços usando Node.js e Next.js. Redução de 40% no tempo de carregamento.
                </p>
              </motion.div>
            ))}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="group flex flex-col rounded-2xl glass border border-zinc-800/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-48 bg-zinc-900 border-b border-zinc-800 relative overflow-hidden">
                  {/* Placeholder visual para o projeto */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-6 flex flex-col gap-4 relative">
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100 mb-1">Aplicação SaaS #{i}</h3>
                    <p className="text-sm text-zinc-400 line-clamp-2">
                      Plataforma completa para gestão de finanças pessoais com relatórios inteligentes e IA.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-800/50 text-xs font-medium text-zinc-300">Next.js</span>
                    <span className="px-2.5 py-1 rounded-md bg-zinc-800/50 text-xs font-medium text-zinc-300">Supabase</span>
                    <span className="px-2.5 py-1 rounded-md bg-zinc-800/50 text-xs font-medium text-zinc-300">Tailwind</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2 mt-auto">
                    <a href="#" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                      <Github className="w-4 h-4" /> Código
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors ml-auto">
                      Demo <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Bootcamp Go Stack', 'Node.js Microservices', 'UX/UI Foundations'].map((course, i) => (
              <motion.div key={i} variants={fadeIn} className="p-5 rounded-2xl glass border border-zinc-800/50 hover:bg-zinc-800/20 transition-colors group cursor-pointer flex flex-col gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-800/50 w-fit">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-100 group-hover:text-emerald-300 transition-colors">{course}</h3>
                  <p className="text-sm text-zinc-500">Rocketseat • 2023</p>
                </div>
                <div className="flex items-center text-xs font-medium text-zinc-400 mt-2">
                  Ver certificado <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
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
