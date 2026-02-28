"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function NovaExperiencia() {
    const router = useRouter();
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);

    // Estados do formulário
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [isCurrent, setIsCurrent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Precisa estar logado!");
            return;
        }

        const { error } = await supabase.from("experiences").insert([
            {
                role,
                company,
                start_date: startDate,
                end_date: isCurrent ? null : endDate,
                description,
                is_current: isCurrent,
                user_id: user.id
            },
        ]);

        setIsLoading(false);

        if (error) {
            console.error(error);
            alert("Erro ao criar experiência: " + error.message);
        } else {
            router.push("/admin/experiencias");
            router.refresh();
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <button
                onClick={() => router.push("/admin/experiencias")}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> Voltar
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass border border-zinc-800/50 p-8 rounded-2xl relative overflow-hidden backdrop-blur-xl"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white">Adicionar Experiência</h1>
                    <p className="text-zinc-400 text-sm mt-1">Detalhes do seu trabalho.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Cargo / Função *</label>
                            <input type="text" required value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50" placeholder="Engenheiro de Software Sênior" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Empresa *</label>
                            <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50" placeholder="Nome da Empresa LTDA" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Data de Início *</label>
                            <input type="text" required value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50" placeholder="Ex: Jan 2022" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex justify-between items-center">
                                Data de Término
                                <label className="flex items-center gap-2 cursor-pointer text-purple-400">
                                    <input type="checkbox" checked={isCurrent} onChange={(e) => setIsCurrent(e.target.checked)} className="rounded border-zinc-700 bg-zinc-900 text-purple-500 focus:ring-purple-500 focus:ring-offset-zinc-900 w-4 h-4 cursor-pointer accent-purple-500" />
                                    Ainda trabalho aqui
                                </label>
                            </label>
                            <input type="text" disabled={isCurrent} required={!isCurrent} value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50" placeholder="Ex: Dez 2023" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Descrição / Atividades Realizadas *</label>
                            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-semibold rounded-xl px-4 py-3 mt-6 transition-all disabled:opacity-50">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Salvar Experiência</>}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
