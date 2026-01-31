export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        {/* Johnson & Johnson Logo */}
        <div className="flex items-center gap-2">
          <div className="text-[#9E0000] font-bold text-lg">Johnson&Johnson</div>
          <span className="text-gray-500 text-sm">Modelling wizard</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Navigation Pills */}
        <button className="px-4 py-2 text-sm font-medium text-white bg-[#9E0000] rounded-full">
          Current pipeline
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">
          Saved models
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center gap-2">
          Notifications
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-300 ml-4"></div>
      </div>
    </header>
  );
}
