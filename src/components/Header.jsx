export default function Header({ subtitle, children }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        {/* Johnson & Johnson Logo */}
        <div className="flex items-center gap-2">
          <div className="text-[#D21034] font-bold text-lg">Johnson&Johnson</div>
          {subtitle && <span className="text-gray-500 text-sm">{subtitle}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {children}

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-300 ml-4"></div>
      </div>
    </header>
  );
}
