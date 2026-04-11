import AdminSidebar from "./components/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#fff8f5]">
      <AdminSidebar />
      <div className="ml-[280px] flex-1">
        {/* Top Nav Bar */}
        <header className="sticky top-0 z-30 h-[64px] bg-[#f1f5f9] border-b border-[#e2e8f0]" />
        {/* Main Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
