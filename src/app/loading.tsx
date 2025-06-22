export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1f1334' }}>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center animate-pulse mx-auto">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <div className="text-white text-lg font-medium">Loading...</div>
        <div className="w-32 h-1 bg-purple-900 rounded-full overflow-hidden mx-auto">
          <div className="w-16 h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 