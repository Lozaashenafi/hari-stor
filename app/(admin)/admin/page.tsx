import { getDashboardStats } from "@/services/product.service";
import { ShoppingBag, Box, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

const win2k: Record<string, React.CSSProperties> = {
  panel: {
    background: '#d4d0c8',
    border: '2px solid',
    borderColor: '#ffffff #808080 #808080 #ffffff',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
  },
  inset: {
    border: '2px solid',
    borderColor: '#808080 #ffffff #ffffff #808080',
    background: '#fff',
    padding: '6px',
  },
  titleBar: {
    background: 'linear-gradient(to right, #000080, #1084d0)',
    padding: '3px 6px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: '"Trebuchet MS", Arial, sans-serif',
  },
  groupBox: {
    border: '1px solid',
    borderColor: '#808080 #dfdfdf #dfdfdf #808080',
    padding: '8px 10px 10px',
    position: 'relative' as const,
    marginTop: 8,
    background: '#d4d0c8',
  },
  button: {
    background: '#d4d0c8',
    border: '2px solid',
    borderColor: '#ffffff #808080 #808080 #ffffff',
    padding: '4px 12px',
    fontSize: 11,
    cursor: 'pointer',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
    color: '#000',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff',
  },
  label: {
    fontSize: 10,
    color: '#000',
    fontFamily: '"MS Sans Serif", Arial, sans-serif',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000080',
    fontFamily: '"Courier New", monospace',
  },
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif' }}>

      {/* Page Header Group Box */}
      <div style={{ ...win2k.panel, marginBottom: 8 }}>
        <div style={win2k.titleBar}>
          <span>📊</span>
          <span>Overview — Real-time Vault Analytics</span>
        </div>
        <div style={{ padding: '6px 8px' }}>
          <p style={{ fontSize: 11, color: '#000', margin: 0 }}>
            Welcome to the Hari Stor Administration Console. Use the navigation pane on the left to manage your store.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 6, marginBottom: 8 }}>
        <StatCard
          title="Total Masterpieces"
          value={stats.totalProducts}
          icon="🛍️"
          subtitle="Unique hair types"
        />
        <StatCard
          title="In Hand Inventory"
          value={stats.inHandCount}
          icon="📦"
          subtitle="Ready to ship"
        />
        <StatCard
          title="Vault Value"
          value={`$${stats.inventoryValue.toLocaleString()}`}
          icon="💰"
          subtitle="Estimated stock worth"
        />
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 6 }}>
        <ActionPanel
          title="Inventory Management"
          icon="📁"
          description="Update textures, manage stock levels, and curate your luxury collections."
          href="/admin/products"
          linkLabel="Open Vault"
        />
        <ActionPanel
          title="Brand Identity"
          icon="🏢"
          description="Sync your WhatsApp, Instagram and TikTok links with your global storefront."
          href="/admin/profile"
          linkLabel="Edit Brand"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, subtitle }: { title: string; value: string | number; icon: string; subtitle: string }) {
  return (
    <div style={{
      background: '#d4d0c8',
      border: '2px solid',
      borderColor: '#ffffff #808080 #808080 #ffffff',
      boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf',
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
    }}>
      {/* mini title bar */}
      <div style={{
        background: 'linear-gradient(to right, #000080, #1084d0)',
        padding: '2px 6px',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}>
        <span style={{ fontSize: 11 }}>{icon}</span>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 'bold', fontFamily: '"Trebuchet MS", Arial, sans-serif' }}>{title}</span>
      </div>
      <div style={{ padding: '8px 10px' }}>
        {/* inset display */}
        <div style={{
          border: '2px solid',
          borderColor: '#808080 #ffffff #ffffff #808080',
          background: '#fff',
          padding: '4px 8px',
          marginBottom: 6,
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 22, fontWeight: 'bold', color: '#000080', fontFamily: '"Courier New", monospace' }}>{value}</span>
        </div>
        <div style={{ fontSize: 10, color: '#444', textAlign: 'center' }}>{subtitle}</div>
        <div style={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{
            fontSize: 9,
            background: '#008000',
            color: '#fff',
            padding: '1px 4px',
            fontFamily: '"MS Sans Serif", Arial',
          }}>● OK</span>
        </div>
      </div>
    </div>
  );
}

function ActionPanel({ title, icon, description, href, linkLabel }: {
  title: string; icon: string; description: string; href: string; linkLabel: string;
}) {
  return (
    <div style={{
      background: '#d4d0c8',
      border: '2px solid',
      borderColor: '#ffffff #808080 #808080 #ffffff',
      boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf',
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
    }}>
      <div style={{
        background: 'linear-gradient(to right, #000080, #1084d0)',
        padding: '3px 6px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <span style={{ fontSize: 13 }}>{icon}</span>
        <span style={{ color: '#fff', fontSize: 11, fontWeight: 'bold', fontFamily: '"Trebuchet MS", Arial, sans-serif' }}>{title}</span>
      </div>
      <div style={{ padding: '10px' }}>
        <p style={{ fontSize: 11, color: '#000', margin: '0 0 10px', lineHeight: 1.5 }}>{description}</p>
        <div style={{
          borderTop: '1px solid #808080',
          paddingTop: '1px',
          marginBottom: '8px',
        }} />
        <Link
          href={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: '#d4d0c8',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff',
            padding: '4px 12px',
            fontSize: 11,
            color: '#000',
            textDecoration: 'none',
            boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff',
            fontFamily: '"MS Sans Serif", Arial, sans-serif',
          }}
        >
          {linkLabel} <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}
