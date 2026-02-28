"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Home, User, Briefcase, Code, BookOpen, Settings, LogOut } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const navigationItems = [
    { icon: Home, label: "Visão Geral", active: true },
    { icon: User, label: "Perfil & Sobre" },
    { icon: Briefcase, label: "Experiências" },
    { icon: Code, label: "Projetos" },
    { icon: BookOpen, label: "Cursos" },
    { icon: Settings, label: "Configurações" },
];

export default function AdminDashboard() {
    const router = useRouter();
    const supabase = createClient();
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (data) setProjects(data);
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja apagar este projeto?")) return;
        await supabase.from('projects').delete().eq('id', id);
        fetchProjects(); // Recarrega a lista
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 flex selection:bg-purple-500/30 selection:text-purple-200">

            {/* Sidebar Lateral */}
            <aside className="fixed left-0 top-0 w-64 h-full glass border-r border-zinc-800/50 flex flex-col p-6 z-20 backdrop-blur-3xl">
                <div className="mb-10">
                    <span className="font-bold text-xl tracking-tighter bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                        Admin.Portfólio
                    </span>
                </div>

                <nav className="flex-1 space-y-2">
                    {navigationItems.map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-zinc-800/50 flex flex-col gap-4">
                    {/* Simulando avatar logado */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-zinc-700/50 overflow-hidden relative">
                            <Image src="/profile.png" alt="Admin" fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">Seu Nome</p>
                            <p className="text-xs text-zinc-500">Administrador</p>
                        </div>
                    </div>

                    <button onClick={handleLogout} className="w-full flex items-center justify-between text-zinc-400 hover:text-red-400 hover:bg-red-500/10 px-4 py-2 mt-2 rounded-xl transition-all cursor-pointer">
                        <span className="text-sm font-medium">Sair</span>
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </aside>

            {/* Conteúdo Principal */}
            <main className="ml-64 flex-1 p-8 md:p-12 pb-24 relative overflow-hidden">
                {/* Glow Effects Soft */}
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Header da Tela Atual */}
                    <div className="flex items-end justify-between">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-bold text-white mb-2"
                            >
                                Gerenciar Projetos
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-zinc-400"
                            >
                                Crie, edite ou remova os projetos que aparecem no seu portfólio.
                            </motion.p>
                        </div>

                        <button
                            onClick={() => router.push('/admin/novo-projeto')}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-medium rounded-xl px-5 py-2.5 transition-all shadow-lg shadow-purple-500/25"
                        >
                            <Plus className="w-5 h-5" /> Novo Projeto
                        </button>
                    </div>

                    {/* Lista de Projetos */}
                    {isLoading ? (
                        <div className="text-zinc-400 py-10 text-center">Carregando projetos...</div>
                    ) : projects.length === 0 ? (
                        <div className="text-zinc-500 py-10 text-center border-2 border-dashed border-zinc-800/50 rounded-2xl">
                            Nenhum projeto cadastrado ainda. Clique em "Novo Projeto" para começar!
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {projects.map((project) => (
                                <div key={project.id} className="glass border border-zinc-800/50 p-6 rounded-2xl flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white truncate max-w-[220px]">{project.title}</h3>
                                            <p className="text-sm text-zinc-400 line-clamp-1 mt-1">{project.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {/* TODO: Implementar tela de editar no futuro */}
                                            <button className="p-2 bg-zinc-800/50 hover:bg-purple-500/20 text-zinc-400 hover:text-purple-400 rounded-lg transition-colors" title="Editar">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 bg-zinc-800/50 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors" title="Excluir"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-wrap mt-auto">
                                        {project.technologies?.map((tech: string, index: number) => (
                                            <span key={index} className="px-2 py-1 bg-zinc-800 text-xs text-zinc-300 rounded-md">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}
