import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useGetTradersQuery,
  useStartCopyingMutation,
  useStopCopyingMutation,
  useGetMyProfileQuery, // Added to keep user data fresh
} from "../../api/apiSlice";
import {
  HiOutlineUsers,
  HiOutlineArrowTrendingUp,
  HiOutlineCheckCircle,
  HiOutlineXMark,
} from "react-icons/hi2";

const CopyTradingPage = () => {
  // 1. Get fresh user data from the API rather than just local state
  const { data: userProfile, isLoading: isUserLoading } =
    useGetMyProfileQuery();
  const { data: traders = [], isLoading: isTradersLoading } =
    useGetTradersQuery();

  const [startCopying, { isLoading: isStarting }] = useStartCopyingMutation();
  const [stopCopying, { isLoading: isStopping }] = useStopCopyingMutation();

  // Allocation Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [allocationAmount, setAllocationAmount] = useState("");

  const isFollowing = (traderId) => {
    return userProfile?.copiedTraders?.some((t) => t.traderId === traderId);
  };

  const handleOpenModal = (trader) => {
    setSelectedTrader(trader);
    setShowModal(true);
  };

  const handleConfirmCopy = async (e) => {
    e.preventDefault();
    const amount = Number(allocationAmount);

    if (!amount || amount <= 0) {
      return toast.error("Please enter a valid allocation amount");
    }

    if (userProfile?.tradingBalance < amount) {
      return toast.error("Insufficient Trading Balance");
    }

    try {
      await startCopying({
        traderId: selectedTrader._id,
        amount: amount,
      }).unwrap();

      toast.success(`Strategy synchronized: Mirroring ${selectedTrader.name}`, {
        icon: "🚀",
        style: {
          background: "#05070A",
          color: "#fff",
          border: "1px solid #10b981",
        },
      });

      setShowModal(false);
      setAllocationAmount("");
    } catch (err) {
      toast.error(err.data?.message || "Connection to strategist failed");
    }
  };

  const handleStop = async (traderId, name) => {
    if (
      !window.confirm(
        `Stop mirroring ${name}? Funds will return to your balance.`,
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

  if (isTradersLoading || isUserLoading)
    return (
      <div className="p-20 text-center text-gray-500 animate-pulse uppercase font-black tracking-widest">
        Initialising Secure Social Terminal...
      </div>
    );

  return (
    <div className="space-y-10 p-4 md:p-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
            Social <span className="text-sky-500">Terminal</span>
          </h1>
          <p className="text-gray-500 text-sm italic">
            Mirror institutional moves in real-time.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
          <p className="text-[10px] text-gray-500 uppercase font-black">
            Available Trading Pool
          </p>
          <p className="text-xl font-black text-emerald-500">
            ${userProfile?.tradingBalance?.toLocaleString()}
          </p>
        </div>
      </header>

      {/* --- SECTION: ACTIVE PORTFOLIO --- */}
      {userProfile?.copiedTraders?.length > 0 && (
        <section className="animate-in slide-in-from-top-4 duration-500">
          <div className="bg-[#05070A] border border-sky-500/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-sky-500/5">
              <h2 className="text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                Your Active Strategists ({userProfile.copiedTraders.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[9px] text-gray-400 uppercase font-black bg-white/[0.01]">
                  <tr>
                    <th className="p-6">Strategist</th>
                    <th className="p-6">Capital Allocated</th>
                    <th className="p-6">Performance</th>
                    <th className="p-6 text-right">Terminal Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {userProfile.copiedTraders.map((copy) => {
                    const trader = traders.find((t) => t._id === copy.traderId);
                    return (
                      <tr
                        key={copy.traderId}
                        className="hover:bg-white/[0.01] transition-colors"
                      >
                        <td className="p-6 font-bold text-white uppercase italic">
                          {trader?.name || "Strategist"}
                        </td>
                        <td className="p-6 font-mono text-emerald-500 text-sm">
                          ${copy.amountAllocated?.toLocaleString()}
                        </td>
                        <td className="p-6">
                          <span className="text-sky-500 font-black">
                            {trader?.roi}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <button
                            disabled={isStopping}
                            onClick={() =>
                              handleStop(copy.traderId, trader?.name)
                            }
                            className="px-5 py-2.5 bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black uppercase hover:bg-rose-500 hover:text-white transition-all"
                          >
                            {isStopping ? "Stopping..." : "Close Connection"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* --- SECTION: DISCOVERY GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {traders.map((trader) => {
          const following = isFollowing(trader._id);
          return (
            <div
              key={trader._id}
              className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 group hover:border-sky-500/30 transition-all shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-sky-500/10 flex items-center justify-center font-black text-sky-500 border border-sky-500/20 text-2xl uppercase italic">
                  {trader.avatar.slice(0, 2)}
                </div>
                <div className="text-right">
                  <p className="text-emerald-500 font-black text-lg">
                    {trader.roi}
                  </p>
                  <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
                    Last 30D ROI
                  </p>
                </div>
              </div>

              <h3 className="text-white text-xl font-black uppercase italic mb-1">
                {trader.name}
              </h3>
              <div className="flex gap-4 mb-8">
                <div>
                  <p className="text-gray-400 font-bold text-xs">
                    {trader.followers.toLocaleString()}
                  </p>
                  <p className="text-[8px] text-gray-600 uppercase font-black">
                    Followers
                  </p>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <p className="text-sky-400 font-bold text-xs">
                    {trader.winRate}
                  </p>
                  <p className="text-[8px] text-gray-600 uppercase font-black">
                    Win Rate
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleOpenModal(trader)}
                disabled={following || isStarting}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2 ${
                  following
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-sky-500 text-black hover:bg-sky-400 shadow-lg shadow-sky-500/10"
                }`}
              >
                {following ? (
                  <>
                    <HiOutlineCheckCircle size={18} /> Mirroring
                  </>
                ) : (
                  <>
                    <HiOutlineArrowTrendingUp size={18} /> Start Mirroring
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* ALLOCATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <form
            onSubmit={handleConfirmCopy}
            className="bg-[#0A0C12] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-white uppercase italic">
                Deploy <span className="text-sky-500">Capital</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white"
              >
                <HiOutlineXMark size={24} />
              </button>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1">
                Strategist
              </p>
              <p className="text-white font-bold">{selectedTrader?.name}</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black ml-1">
                Allocation Amount ($)
              </label>
              <input
                autoFocus
                type="number"
                value={allocationAmount}
                onChange={(e) => setAllocationAmount(e.target.value)}
                placeholder="Min. 500"
                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white font-mono outline-none focus:border-sky-500 transition-all"
                required
              />
              <p className="text-[9px] text-gray-600 font-bold text-right italic">
                Max: ${userProfile?.tradingBalance?.toLocaleString()}
              </p>
            </div>

            <button
              type="submit"
              disabled={isStarting}
              className="w-full py-5 bg-sky-500 text-black font-black uppercase rounded-2xl hover:bg-sky-400 transition-all shadow-xl shadow-sky-500/20"
            >
              {isStarting
                ? "Establishing Connection..."
                : "Initialize Mirroring"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CopyTradingPage;
