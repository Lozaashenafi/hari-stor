import { getDashboardStats } from "@/services/product.service";
import { ShoppingBag, Box, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Header */}
      <header>
        <h1 className="font-serif text-4xl md:text-6xl text-white italic">
          Overview
        </h1>
        <p className="text-[#5a3e00] text-xs uppercase tracking-[0.4em] mt-4 font-black">
          Real-time Vault Analytics
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Masterpieces" 
          value={stats.totalProducts} 
          icon={<ShoppingBag className="text-[#5a3e00]" size={20} />} 
          subtitle="Unique hair types"
        />
        <StatCard 
          title="In Hand Inventory" 
          value={stats.inHandCount} 
          icon={<Box className="text-[#5a3e00]" size={20} />} 
          subtitle="Ready for immediate ship"
        />
        <StatCard 
          title="Vault Value" 
          value={`$${stats.inventoryValue.toLocaleString()}`} 
          icon={<DollarSign className="text-[#5a3e00]" size={20} />} 
          subtitle="Estimated stock worth"
        />
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-white font-serif text-2xl italic mb-4">Inventory Management</h3>
            <p className="text-gray-400 text-sm mb-8 max-w-xs leading-relaxed">
              Update textures, manage stock levels, and curate your luxury collections.
            </p>
            <Link href="/admin/products" className="inline-flex items-center gap-3 text-[#5a3e00] text-[10px] uppercase tracking-widest font-black group-hover:gap-5 transition-all">
              Manage Vault <ArrowRight size={14} />
            </Link>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
             <ShoppingBag size={120} className="text-white" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-white font-serif text-2xl italic mb-4">Brand Identity</h3>
            <p className="text-gray-400 text-sm mb-8 max-w-xs leading-relaxed">
              Sync your WhatsApp, Instagram and TikTok links with your global storefront.
            </p>
            <Link href="/admin/profile" className="inline-flex items-center gap-3 text-[#5a3e00] text-[10px] uppercase tracking-widest font-black group-hover:gap-5 transition-all">
              Update Brand <ArrowRight size={14} />
            </Link>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
             <DollarSign size={120} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, subtitle }: { title: string; value: string | number; icon: React.ReactNode; subtitle: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] shadow-xl hover:border-[#5a3e00]/30 transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-black rounded-2xl border border-zinc-800 group-hover:border-[#5a3e00]/50 transition-colors">
          {icon}
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black">Record OK</span>
      </div>
      <h3 className="text-zinc-500 text-[10px] uppercase tracking-widest font-black mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-white text-4xl font-serif italic">{value}</p>
      </div>
      <p className="text-zinc-600 text-[9px] uppercase tracking-tighter mt-4 font-bold">{subtitle}</p>
    </div>
  );
}