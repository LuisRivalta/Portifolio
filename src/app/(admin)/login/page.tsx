"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Credenciais inválidas. Verifique seu e-mail e senha.");
            setIsLoading(false);
            return;
        }

        // Sucesso! Atualiza a página e encaminha pro Admin (o middleware cuida do resto)
        router.push("/admin");
        router.refresh();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6 selection:bg-purple-500/30 selection:text-purple-200">
            {/* Glow Effects */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="glass border border-zinc-800/50 p-8 rounded-2xl relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-zinc-700/50 mb-4 bg-zinc-900/50">
                            <Lock className="w-6 h-6 text-purple-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Acesso Restrito</h1>
                        <p className="text-sm text-zinc-400 mt-1">Área para gerenciamento do portfólio</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                                E-mail
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                placeholder="seu-email@exemplo.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                                Senha
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl px-4 py-3 mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Entrar no Painel <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                            &larr; Voltar para o site
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
