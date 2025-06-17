interface HeaderProps {
  title: string;
  showWallet?: boolean;
  walletBalance?: string;
}

export function Header({ title, showWallet = false, walletBalance = "0" }: HeaderProps) {
  return (
    <div className="flex justify-between items-center p-6 bg-slate-800/50 backdrop-blur-lg">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {showWallet && (
        <div className="flex items-center space-x-2 bg-purple-600/20 px-3 py-2 rounded-full border border-purple-500/30">
          <span className="text-purple-300 text-sm">{walletBalance} RIPPLES</span>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
} 