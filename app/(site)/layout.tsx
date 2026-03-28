import React from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* You can add a Navbar here later */}
      <main className="flex-grow">
        {children}
      </main>
      {/* You can add a Footer here later */}
    </div>
  );
}