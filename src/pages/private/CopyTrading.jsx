import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useGetTradersQuery,
  useStartCopyingMutation,
  useStopCopyingMutation,
} from "../../api/apiSlice"; // Adjust path as needed
import {
  HiOutlineUsers,
  HiOutlineArrowTrendingUp,
  HiOutlineCheckCircle,
  HiOutlineArrowPath,
} from "react-icons/hi2";

const CopyTradingPage = () => {
  // 1. Get current user data from Redux to see who they are already copying
  const { user } = useSelector((state) => state.auth);

  // 2. RTK Query Hooks
  const { data: traders = [], isLoading } = useGetTradersQuery();
  const [startCopying, { isLoading: isStarting }] = useStartCopyingMutation();
  const [stopCopying, { isLoading: isStopping }] = useStopCopyingMutation();

  // 3. Logic: Check if a trader is in the user's copiedTraders list
  const isFollowing = (traderId) => {
    return user?.copiedTraders?.some((t) => t.traderId === traderId);
  };

  const handleCopy = async (trader) => {
    const amount = window.prompt(
      `Enter amount to allocate for ${trader.name}:`,
      "1000",
    );
    if (!amount || isNaN(amount)) return;

    try {
      await startCopying({
        traderId: trader._id,
        amount: Number(amount),
      }).unwrap();
      toast.success(`Mirroring ${trader.name}'s institutional moves!`, {
        icon: "🚀",
      });
    } catch (err) {
      toast.error(err.data?.message || "Allocation failed");
    }
  };

  const handleStop = async (traderId, name) => {
    if (
      !window.confirm(
        `Stop mirroring ${name}? Funds will return to trading balance.`,
      )
    )
      return;
    try {
      await stopCopying({ traderId }).unwrap();
      toast.success(`Position closed for ${name}`);
    } catch (err) {
      toast.error(err.data?.message || "Action failed");
    }
  };

  if (isLoading)
    return (
      <div className="p-20 text-center text-gray-500 animate-pulse uppercase font-black tracking-widest">
        Initialising Social Terminal...
      </div>
    );

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
          Social <span className="text-sky-500">Terminal</span>
        </h1>
        <p className="text-gray-500 text-sm italic">
          Mirror institutional moves in real-time.
        </p>
      </div>

      {/* --- SECTION: ACTIVE PORTFOLIO --- */}
      {user?.copiedTraders?.length > 0 && (
        <section className="animate-in slide-in-from-top-4 duration-500">
          <div className="bg-[#05070A] border border-sky-500/20 rounded-[2rem] overflow-hidden shadow-2xl shadow-sky-500/5">
            <div className="p-6 border-b border-white/5 bg-sky-500/5 flex justify-between items-center">
              <h2 className="text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500 animate-ping" />
                Live Mirroring Terminal
              </h2>
              <div className="text-right">
                <p className="text-[8px] text-gray-500 uppercase font-black">
                  Trading Balance
                </p>
                <p className="text-xs font-bold text-sky-400">
                  ${user?.tradingBalance?.toLocaleString()}
                </p>
              </div>
            </div>

            <table className="w-full text-left">
              <thead className="text-[9px] text-gray-500 uppercase font-black bg-white/[0.01]">
                <tr>
                  <th className="p-5">Strategist</th>
                  <th className="p-5">Allocated</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {user.copiedTraders.map((copy) => {
                  const traderDetails = traders.find(
                    (t) => t._id === copy.traderId,
                  );
                  return (
                    <tr
                      key={copy.traderId}
                      className="hover:bg-white/[0.01] transition-colors group"
                    >
                      <td className="p-5">
                        <span className="text-sm font-bold text-white uppercase italic">
                          {traderDetails?.name || "Active Strategist"}
                        </span>
                      </td>
                      <td className="p-5 font-mono text-xs text-emerald-500">
                        ${copy.amountAllocated?.toLocaleString()}
                      </td>
                      <td className="p-5">
                        <span className="text-[9px] font-black text-sky-500 uppercase bg-sky-500/10 px-2 py-1 rounded">
                          Mirroring Live
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button
                          disabled={isStopping}
                          onClick={() =>
                            handleStop(copy.traderId, traderDetails?.name)
                          }
                          className="px-4 py-2 bg-red-500/10 text-red-500 rounded-xl text-[9px] font-black uppercase hover:bg-red-500 hover:text-white transition-all"
                        >
                          {isStopping ? "Closing..." : "Close Position"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* --- SECTION: DISCOVERY GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {traders.map((trader) => {
          const following = isFollowing(trader._id);
          return (
            <div
              key={trader._id}
              className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6 group hover:border-sky-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-sky-500 border border-white/5 text-xl">
                  {trader.avatar}
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <p className="text-[10px] font-black text-emerald-500 italic">
                    {trader.roi} ROI
                  </p>
                </div>
              </div>

              <h3 className="text-white font-bold mb-1 uppercase tracking-tight">
                {trader.name}
              </h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-6 tracking-widest">
                {trader.followers} Followers • {trader.winRate} Win Rate
              </p>

              <button
                onClick={() => handleCopy(trader)}
                disabled={following || isStarting}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${
                  following
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default"
                    : "bg-white/5 text-white hover:bg-sky-500 hover:text-black shadow-lg"
                }`}
              >
                {following ? (
                  <>
                    <HiOutlineCheckCircle size={16} /> Mirroring
                  </>
                ) : (
                  <>
                    <HiOutlineArrowTrendingUp size={16} /> Start Mirroring
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

export default CopyTradingPage;
