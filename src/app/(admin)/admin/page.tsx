"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function AdminProjetos() {
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

    return (
        <div className="max-w-4xl mx-auto space-y-12">
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
                <div className="text-zinc-500 py-10 text-center border-2 border-dashed border-zinc-800/50 rounded-2xl glass p-8">
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
                                    <button
                                        onClick={() => router.push(`/admin/novo-projeto/${project.id}`)}
                                        className="p-2 bg-zinc-800/50 hover:bg-purple-500/20 text-zinc-400 hover:text-purple-400 rounded-lg transition-colors" title="Editar"
                                    >
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
    );
}
