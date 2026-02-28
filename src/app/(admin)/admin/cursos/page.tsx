"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function AdminCursos() {
    const router = useRouter();
    const supabase = createClient();
    const [courses, setCourses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setIsLoading(true);
        const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
        if (data) setCourses(data);
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja apagar este curso?")) return;
        await supabase.from('courses').delete().eq('id', id);
        fetchCourses();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex items-end justify-between">
                <div>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white mb-2">Gerenciar Cursos</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-zinc-400">Adicione os cursos extracurriculares e especializações.</motion.p>
                </div>
                <button onClick={() => router.push('/admin/cursos/novo')} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-medium rounded-xl px-5 py-2.5 transition-all shadow-lg shadow-purple-500/25">
                    <Plus className="w-5 h-5" /> Novo Curso
                </button>
            </div>

            {isLoading ? (
                <div className="text-zinc-400 py-10 text-center">Carregando cursos...</div>
            ) : courses.length === 0 ? (
                <div className="text-zinc-500 py-10 text-center border-2 border-dashed border-zinc-800/50 rounded-2xl p-8 glass">Nenhum curso cadastrado ainda. Clique em "Novo Curso" para começar!</div>
            ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <div key={course.id} className="glass border border-zinc-800/50 p-6 rounded-2xl flex flex-col gap-3 relative">
                            <div className="absolute top-4 right-4 flex gap-1">
                                <button
                                    onClick={() => router.push(`/admin/cursos/novo/${course.id}`)}
                                    className="p-1.5 bg-zinc-800 hover:bg-purple-500/20 text-zinc-400 hover:text-purple-400 rounded-lg transition-colors" title="Editar"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => handleDelete(course.id)} className="p-1.5 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors" title="Excluir"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>

                            <div className="p-2.5 rounded-xl bg-zinc-800/50 w-fit">
                                <Award className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-100">{course.name}</h3>
                                <p className="text-sm text-zinc-400">{course.institution} • {course.issue_date}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
