import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineUsers,
  HiOutlineArrowTrendingUp,
  HiOutlineStopCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const CopyTrading = () => {
  const [myCopies, setMyCopies] = useState([]);

  const masterTraders = [
    {
      id: 1,
      name: "Alexander K.",
      winRate: "94%",
      roi: "+124.5%",
      followers: 1240,
      avatar: "AK",
    },
    {
      id: 2,
      name: "Elena 'The Hawk'",
      winRate: "89%",
      roi: "+82.1%",
      followers: 850,
      avatar: "EH",
    },
    {
      id: 3,
      name: "Crypto Genesis",
      winRate: "76%",
      roi: "+210.8%",
      followers: 3200,
      avatar: "CG",
    },
  ];

  const handleCopy = (trader) => {
    setMyCopies([...myCopies, { ...trader, invested: 1000 }]);

    // Triggering the Success Toast
    toast.success(`Now mirroring ${trader.name}'s trades!`, {
      icon: "🚀",
      duration: 4000,
    });
  };

  const handleStop = (id, name) => {
    setMyCopies(myCopies.filter((t) => t.id !== id));

    // Triggering a Warning/Neutral Toast
    toast(`Stopped following ${name}`, {
      icon: "🛑",
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
          Social Terminal
        </h1>
        <p className="text-gray-500 text-sm">
          Mirror institutional moves in real-time.
        </p>
      </div>

      {/* --- SECTION: ACTIVE PORTFOLIO --- */}
      {myCopies.length > 0 && (
        <section className="animate-in slide-in-from-top-4 duration-500">
          <div className="bg-[#05070A] border border-sky-500/20 rounded-[2rem] overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-sky-500/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {myCopies.map((c) => (
                    <div
                      key={c.id}
                      className="h-6 w-6 rounded-full border-2 border-[#05070A] bg-sky-500 text-[8px] flex items-center justify-center font-bold text-black uppercase"
                    >
                      {c.avatar}
                    </div>
                  ))}
                </div>
                <h2 className="text-white font-black uppercase text-[10px] tracking-widest">
                  Mirroring Terminal
                </h2>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[8px] text-gray-500 uppercase font-black">
                    Total P&L
                  </p>
                  <p className="text-xs font-bold text-emerald-500">+$124.50</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[9px] text-gray-500 uppercase font-black bg-white/[0.01]">
                  <tr>
                    <th className="p-5">Master Strategist</th>
                    <th className="p-5">Allocated</th>
                    <th className="p-5">30D ROI</th>
                    <th className="p-5">Max Drawdown</th>
                    <th className="p-5">Profit/Loss</th>
                    <th className="p-5 text-right">Terminal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {myCopies.map((copy) => (
                    <tr
                      key={copy.id}
                      className="hover:bg-white/[0.01] transition-colors group"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-white uppercase italic">
                            {copy.name}
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <p className="text-[9px] text-gray-600 font-medium">
                          Started: Feb 08, 2026
                        </p>
                      </td>
                      <td className="p-5 font-mono text-xs text-gray-400">
                        ${copy.invested.toLocaleString()}
                      </td>
                      <td className="p-5 font-mono text-xs text-emerald-500 font-bold">
                        {copy.roi}
                      </td>
                      <td className="p-5 font-mono text-xs text-red-400 font-bold">
                        -4.2%
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-emerald-500">
                            +$42.10
                          </span>
                          <span className="text-[9px] text-gray-500 font-bold">
                            +2.4% Today
                          </span>
                        </div>
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => handleStop(copy.id, copy.name)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-white/5 hover:bg-red-500/10 text-red-500 rounded-xl text-[9px] font-black uppercase"
                        >
                          Close Position
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      {/* --- SECTION: DISCOVERY GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {masterTraders.map((trader) => {
          const isFollowing = myCopies.some((t) => t.id === trader.id);
          return (
            <div
              key={trader.id}
              className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6 group transition-all hover:border-white/10"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-sky-500 border border-white/5">
                  {trader.avatar}
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <p className="text-[10px] font-black text-emerald-500 italic">
                    {trader.roi}
                  </p>
                </div>
              </div>

              <h3 className="text-white font-bold mb-1">{trader.name}</h3>
              <div className="flex items-center gap-2 text-gray-500 mb-6">
                <HiOutlineUsers size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {trader.followers} Followers
                </span>
              </div>

              <button
                onClick={() => handleCopy(trader)}
                disabled={isFollowing}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${
                  isFollowing
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-white/5 text-white hover:bg-sky-500 hover:text-black shadow-lg hover:shadow-sky-500/10"
                }`}
              >
                {isFollowing ? (
                  <>
                    <HiOutlineCheckCircle size={16} /> Mirroring
                  </>
                ) : (
                  <>
                    <HiOutlineArrowTrendingUp size={16} /> Copy Trades
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CopyTrading;
