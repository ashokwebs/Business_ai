import { BoardRoomClient } from "@/components/boardroom/BoardRoomClient";

export default function BoardRoomPage() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col pt-4 px-4 md:px-8 pb-4 w-full">
      <div className="mb-4 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-1 flex items-center gap-2">
            The Board Room <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] uppercase tracking-wider font-bold animate-pulse">Live</span>
          </h2>
          <p className="text-sm text-on-surface-variant">
            Direct interface with Prism (Architect). Monitor executive council telemetry in real-time.
          </p>
        </div>
      </div>
      
      {/* Client Component handling the interactive state */}
      <BoardRoomClient />
    </div>
  );
}
