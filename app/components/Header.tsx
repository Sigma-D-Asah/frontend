export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
      {/* Nanti bisa diisi Breadcrumbs */}
      <h2 className="text-lg font-semibold">Dashboard Overview</h2>
      
      <div className="flex items-center gap-4">
        {/* Placeholder untuk Notifikasi dan Profil User */}
        <span>A25-CS052</span>
      </div>
    </header>
  );
}