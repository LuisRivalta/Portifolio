"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function NovoCurso() {
    const router = useRouter();
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);

    // Estados
    const [name, setName] = useState("");
    const [institution, setInstitution] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [certificateUrl, setCertificateUrl] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Precisa estar logado!");
            return;
        }

        const { error } = await supabase.from("courses").insert([
            {
                name,
                institution,
                issue_date: issueDate,
                certificate_url: certificateUrl,
                user_id: user.id
            },
        ]);

        setIsLoading(false);

        if (error) {
            console.error(error);
            alert("Erro ao salvar curso: " + error.message);
        } else {
            router.push("/admin/cursos");
            router.refresh();
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <button
                onClick={() => router.push("/admin/cursos")}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> Voltar
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass border border-zinc-800/50 p-8 rounded-2xl relative overflow-hidden backdrop-blur-xl"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white">Adicionar Curso</h1>
                    <p className="text-zinc-400 text-sm mt-1">Detalhes do curso ou especialização.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Nome do Curso / Especialização *</label>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50" placeholder="Ex: Masterclass Next.js" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Instituição *</label>
                            <input type="text" required value={institution} onChange={(e) => setInstitution(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50" placeholder="Ex: Rocketseat" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Data ou Ano de Conclusão *</label>
                            <input type="text" required value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50" placeholder="Ex: 2023" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">URL do Certificado (Opcional)</label>
                            <input type="text" value={certificateUrl} onChange={(e) => setCertificateUrl(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50" placeholder="https://..." />
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-xl px-4 py-3 mt-6 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed group">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Salvar Curso</>}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
