"use client";

import { usePathname, useRouter } from "next/navigation";
import { Briefcase, Code, BookOpen, LogOut, LayoutDashboard, User } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const navigationItems = [
    { icon: User, label: "Perfil & Sobre", path: "/admin/perfil" },
    { icon: Code, label: "Projetos", path: "/admin" },
    { icon: Briefcase, label: "Experiências", path: "/admin/experiencias" },
    { icon: BookOpen, label: "Cursos", path: "/admin/cursos" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();

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
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/admin");

                        return (
                            <button
                                key={item.label}
                                onClick={() => router.push(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-zinc-800/50 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-zinc-700/50 overflow-hidden relative">
                            {/* NOTE: No futuro isso pode buscar da própria tabela profiles */}
                            <Image src="/profile.png" alt="Admin" fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">Administrador</p>
                            <p className="text-xs text-zinc-500">Logado via Supabase</p>
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
                {children}
            </main>
        </div>
    );
}
