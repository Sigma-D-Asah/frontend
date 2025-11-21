export type HeaderProps = {
  title?: string;
  subtitle?: string;
};

export function Header({ title = "Dashboard Overview", subtitle = "Power · Region 1" }: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle ? <p className="text-xs text-gray-500">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xs text-gray-500 text-right">
          <div>Predictive Maintenance Copilot</div>
          <div className="text-xs text-gray-400">Ingestion • Live</div>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3 py-1 border rounded text-sm bg-gray-50">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="text-sm">A25-CS052</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
