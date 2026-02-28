"use client";

import { motion } from "framer-motion";
import { Save, Loader2, UserCircle, UploadCloud, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminPerfil() {
    const router = useRouter();
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(true);

    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [roleTitle, setRoleTitle] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [statusText, setStatusText] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            setIsFetchingData(true);
            const { data, error } = await supabase.from('profiles').select('*').single();
            if (data) {
                setId(data.id);
                setName(data.name || "");
                setRoleTitle(data.role_title || "");
                setAge(data.age || "");
                setLocation(data.location || "");
                setBio(data.bio || "");
                setStatusText(data.status_text || "");
                setAvatarUrl(data.avatar_url || "");
                setGithubUrl(data.github_url || "");
                setLinkedinUrl(data.linkedin_url || "");
                setEmail(data.email || "");
            }
            setIsFetchingData(false);
        };
        fetchProfile();
    }, [supabase]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `profiles/${fileName}`; // Pasta profiles no Storage

        const { error: uploadError } = await supabase.storage
            .from('portfolio-images') // Nome do Bucket que o usuário deverá criar
            .upload(filePath, file);

        if (uploadError) {
            console.error(uploadError);
            alert("Erro ao fazer upload da imagem. O bucket 'portfolio-images' foi criado?");
            setIsUploading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(filePath);

        setAvatarUrl(publicUrl);
        setIsUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Sessão inválida!");
            setIsLoading(false);
            return;
        }

        const profileData = {
            name,
            role_title: roleTitle,
            age,
            location,
            bio,
            status_text: statusText,
            avatar_url: avatarUrl,
            github_url: githubUrl,
            linkedin_url: linkedinUrl,
            email,
            user_id: user.id
        };

        let result: any;
        if (id) {
            result = await supabase.from('profiles').update(profileData).eq('id', id).select();
        } else {
            result = await supabase.from('profiles').insert([profileData]).select();
        }

        setIsLoading(false);

        if (result.error) {
            console.error("Supabase Error:", result.error);
            alert("Erro ao salvar perfil: " + (result.error.message || JSON.stringify(result.error)));
        } else {
            alert("Perfil salvo com sucesso!");
            if (!id && result.data && result.data[0]) {
                setId(result.data[0].id);
            }
            router.refresh();
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white mb-2">
                    Perfil & Sobre
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-zinc-400">
                    Defina as informações centrais que aparecem no topo do seu portfólio.
                </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass border border-zinc-800/50 p-8 rounded-2xl relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />

                {isFetchingData ? (
                    <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-500" /></div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Seção Básica */}
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4 border-b border-zinc-800/50 pb-2">
                                <UserCircle className="w-5 h-5 text-purple-400" /> Informações Pessoais
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Nome Completo *</label>
                                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50" placeholder="Ex: João da Silva" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Cargo / Título Principal *</label>
                                    <input type="text" required value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50" placeholder="Ex: Desenvolvedor Full-Stack" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Idade</label>
                                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50" placeholder="Ex: 25 anos" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Localização</label>
                                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50" placeholder="Ex: São Paulo, Brasil" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Status de Disponibilidade</label>
                                    <input type="text" value={statusText} onChange={(e) => setStatusText(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50" placeholder="Ex: Disponível para oportunidades" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Biografia / Resumo *</label>
                                    <textarea required value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50" placeholder="Conte um pouco sobre sua trajetória, paixões e foco principal de atuação..." />
                                </div>
                            </div>
                        </div>

                        {/* Mídia & Links */}
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4 border-b border-zinc-800/50 pb-2 mt-4">
                                Links & Avatar
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Foto de Perfil</label>
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-zinc-700 overflow-hidden bg-zinc-900 flex-shrink-0 flex items-center justify-center">
                                            {avatarUrl ? (
                                                <Image src={avatarUrl} alt="Preview Avatar" fill className="object-cover" />
                                            ) : (
                                                <ImageIcon className="w-8 h-8 text-zinc-600" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <label className="flex items-center justify-center gap-2 w-full md:w-fit px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium cursor-pointer transition-colors">
                                                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UploadCloud className="w-5 h-5" /> Enviar Nova Foto</>}
                                                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
                                            </label>
                                            <p className="text-xs text-zinc-500 mt-2">Formatos aceitos: JPG, PNG, WEBP. Tamanho máx: 2MB.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email de Contato</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50" placeholder="contato@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Perfil do Github</label>
                                    <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50" placeholder="https://github.com/SeuUser" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Perfil do Linkedin</label>
                                    <input type="text" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50" placeholder="https://linkedin.com/in/seuuser" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-semibold rounded-xl px-4 py-3 mt-6 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 group">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Salvar Perfil</>}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
