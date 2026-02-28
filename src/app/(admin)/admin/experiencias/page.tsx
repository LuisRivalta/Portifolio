"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Calendar, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function AdminExperiencias() {
    const router = useRouter();
    const supabase = createClient();
    const [experiences, setExperiences] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('experiences').select('*').order('created_at', { ascending: false });
        if (data) setExperiences(data);
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja apagar esta experiência?")) return;
        await supabase.from('experiences').delete().eq('id', id);
        fetchExperiences(); // Recarrega a lista
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex items-end justify-between">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-white mb-2"
                    >
                        Gerenciar Experiências
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-zinc-400"
                    >
                        Adicione os locais onde você já trabalhou.
                    </motion.p>
                </div>

                <button
                    onClick={() => router.push('/admin/experiencias/nova')}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-medium rounded-xl px-5 py-2.5 transition-all shadow-lg shadow-purple-500/25"
                >
                    <Plus className="w-5 h-5" /> Nova Experiência
                </button>
            </div>

            {/* Lista */}
            {isLoading ? (
                <div className="text-zinc-400 py-10 text-center">Carregando experiências...</div>
            ) : experiences.length === 0 ? (
                <div className="text-zinc-500 py-10 text-center border-2 border-dashed border-zinc-800/50 rounded-2xl glass p-8">
                    Nenhuma experiência cadastrada ainda. Clique em "Nova Experiência" para começar!
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="flex flex-col gap-4"
                >
                    {experiences.map((exp) => (
                        <div key={exp.id} className="glass border border-zinc-800/50 p-6 rounded-2xl flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                                <p className="text-zinc-400 font-medium mb-3">{exp.company}</p>
                                <p className="text-sm text-zinc-500 whitespace-pre-line">{exp.description}</p>

                                <div className="flex items-center gap-4 mt-4 text-xs font-medium text-zinc-500">
                                    <span className="flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded-md">
                                        <Calendar className="w-3 h-3" /> {exp.start_date} - {exp.is_current ? "Presente" : exp.end_date}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => router.push(`/admin/experiencias/nova/${exp.id}`)}
                                    className="p-2 bg-zinc-800/50 hover:bg-purple-500/20 text-zinc-400 hover:text-purple-400 rounded-lg transition-colors" title="Editar"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(exp.id)}
                                    className="p-2 bg-zinc-800/50 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors" title="Excluir"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
