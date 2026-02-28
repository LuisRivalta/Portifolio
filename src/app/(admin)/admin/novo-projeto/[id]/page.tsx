
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function NovoProjeto({ params }: { params: { id: string } }) {
    const router = useRouter();
    const supabase = createClient();
    const isEditing = params.id && params.id !== "novo";
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(isEditing);

    // Estados do formulário
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const fetchProjectData = async () => {
                const { data, error } = await supabase.from('projects').select('*').eq('id', params.id).single();
                if (error) {
                    console.error("Error fetching project:", error);
                    alert("Erro ao carregar projeto: " + error.message);
                    setIsFetchingData(false);
                    return;
                }
                if (data) {
                    setTitle(data.title);
                    setDescription(data.description);
                    setTechnologies(data.technologies?.join(", ") || "");
                    setGithubUrl(data.github_url || "");
                    setLiveUrl(data.live_url || "");
                    setImageUrl(data.image_url || "");
                    setIsFeatured(data.is_featured);
                }
                setIsFetchingData(false);
            };
            fetchProjectData();
        }
    }, [isEditing, params.id, supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Converte a string de tecnologias separadas por vírgula em um array
        const techArray = technologies
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "");

        // Pega o ID do usuário autenticado para preencher pelo banco (ou via policy)
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("Precisa estar logado!");
            setIsLoading(false);
            return;
        }

        const projectData = {
            title,
            description,
            technologies: techArray,
            github_url: githubUrl,
            live_url: liveUrl,
            image_url: imageUrl,
            is_featured: isFeatured,
            user_id: user.id
        };

        let result;
        if (isEditing) {
            result = await supabase.from("projects").update(projectData).eq('id', params.id);
        } else {
            result = await supabase.from("projects").insert([projectData]);
        }

        setIsLoading(false);

        if (result.error) {
            console.error(result.error);
            alert(`Erro ao ${isEditing ? 'atualizar' : 'criar'} projeto: ` + result.error.message);
        } else {
            router.push("/admin");
            router.refresh(); // Força a atualização da lista de projetos no painel
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-6 selection:bg-purple-500/30 selection:text-purple-200">
            <div className="w-full max-w-3xl">
                <button
                    onClick={() => router.push("/admin")}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
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
                        <h1 className="text-2xl font-bold text-white">{isEditing ? 'Editar Projeto' : 'Adicionar Projeto'}</h1>
                        <p className="text-zinc-400 text-sm mt-1">{isEditing ? 'Altere as informações abaixo.' : 'Preencha os detalhes do seu novo projeto em destaque.'}</p>
                    </div>

                    {isFetchingData ? (
                        <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-500" /></div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Título do Projeto *</label>
                                    <input
                                        type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        placeholder="Ex: SaaS Financeiro ou Meu Portfólio"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Descrição Curta *</label>
                                    <textarea
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        placeholder="Resuma o que é esse projeto e o problema que ele resolve."
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Tecnologias (separadas por vírgula) *</label>
                                    <input
                                        type="text"
                                        required
                                        value={technologies}
                                        onChange={(e) => setTechnologies(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        placeholder="Ex: Next.js, Supabase, TailwindCSS, Typescript"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Link do Repositório (Github)</label>
                                    <input
                                        type="text"
                                        value={githubUrl}
                                        onChange={(e) => setGithubUrl(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        placeholder="https://github.com/..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Link do Projeto Online</label>
                                    <input
                                        type="text"
                                        value={liveUrl}
                                        onChange={(e) => setLiveUrl(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        placeholder="https://meuprojeto.com.br"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Link da Imagem / Thumbnail do Projeto</label>
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        placeholder="Ex: /projetos/financeiro.png ou https://..."
                                    />
                                </div>

                                <div className="md:col-span-2 flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isFeatured"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-zinc-700 rounded bg-zinc-900"
                                    />
                                    <label htmlFor="isFeatured" className="ml-2 block text-sm font-medium text-zinc-300">
                                        Projeto em destaque (aparece na página inicial)
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-semibold rounded-xl px-4 py-3 mt-6 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" /> Salvar Projeto
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
