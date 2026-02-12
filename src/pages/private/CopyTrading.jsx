import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  useGetTradersQuery,
  useGetTraderByIdQuery,
  useStartCopyingMutation,
  useGetMyProfileQuery,
} from "../../api/apiSlice";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineCheckCircle,
  HiOutlineXMark,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiCheckBadge,
} from "react-icons/hi2";

const CopyTradingPage = () => {
  const {
    data: userProfile,
    isLoading: isUserLoading,
    refetch,
  } = useGetMyProfileQuery();
  const { data: traders = [], isLoading: isTradersLoading } =
    useGetTradersQuery();
  const [startCopying, { isLoading: isStarting }] = useStartCopyingMutation();

  const [selectedTrader, setSelectedTrader] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [sortBy, setSortBy] = useState("roi");
  const [currentPage, setCurrentPage] = useState(1);

  const tradersPerPage = 6;

  const { data: traderDetail } = useGetTraderByIdQuery(selectedTrader?._id, {
    skip: !selectedTrader,
  });

  const normalizeId = (id) => (typeof id === "object" ? id?._id : id);

  const isFollowing = (traderId) =>
    userProfile?.copiedTraders?.some(
      (t) => normalizeId(t.traderId)?.toString() === traderId?.toString(),
    );

  const processedTraders = useMemo(() => {
    let filtered = [...traders];
    if (sortBy === "roi") {
      filtered.sort((a, b) => b.performance?.roi30d - a.performance?.roi30d);
    }
    if (sortBy === "winRate") {
      filtered.sort((a, b) => b.performance?.winRate - a.performance?.winRate);
    }
    return filtered;
  }, [traders, sortBy]);

  const indexOfLast = currentPage * tradersPerPage;
  const indexOfFirst = indexOfLast - tradersPerPage;
  const currentTraders = processedTraders.slice(indexOfFirst, indexOfLast);

  if (isTradersLoading || isUserLoading)
    return (
      <div className="p-20 text-center text-gray-500 animate-pulse uppercase font-black tracking-widest">
        Initialising Secure Social Terminal...
      </div>
    );

  return (
    <div className="space-y-10 p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
          Social <span className="text-sky-500">Terminal</span>
        </h1>
        <p className="text-gray-500 text-xs uppercase mt-2 tracking-widest">
          Mirror institutional-grade strategies in real-time
        </p>
      </header>

      {/* TOOLBAR */}
      <div className="flex justify-between items-center">
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#0A0C12] border border-white/10 px-4 py-2 rounded-xl text-white text-sm focus:ring-2 focus:ring-sky-500 outline-none"
        >
          <option value="roi">Sort by ROI (30D)</option>
          <option value="winRate">Sort by Win Rate</option>
        </select>
      </div>

      {/* TRADER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTraders.map((trader) => {
          const following = isFollowing(trader._id);

          return (
            <div
              key={trader._id}
              className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 hover:border-sky-500/30 transition-all group relative overflow-hidden"
            >
              <div
                className="cursor-pointer flex flex-col items-center text-center space-y-4"
                onClick={() => {
                  setSelectedTrader(trader);
                  setShowDetail(true);
                }}
              >
                {/* TOP ALIGNED IMAGE WITH VERIFIED BADGE */}
                <div className="relative">
                  <div className="h-24 w-24 rounded-3xl overflow-hidden border-2 border-white/5 bg-white/5 flex items-center justify-center group-hover:border-sky-500/50 transition-colors shadow-2xl">
                    {trader.avatar ? (
                      <img
                        src={trader.avatar}
                        alt={trader.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <HiOutlineUser className="text-gray-700" size={40} />
                    )}
                  </div>
                  {trader.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-sky-500 text-black p-1 rounded-lg shadow-lg">
                      <HiCheckBadge size={18} />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-white text-2xl font-black uppercase italic tracking-tight leading-none">
                    {trader.name}
                  </h3>
                  {trader.verified && (
                    <span className="text-[9px] text-sky-500 font-black uppercase tracking-[0.2em] mt-2 block">
                      Verified Strategy
                    </span>
                  )}
                </div>

                <div className="w-full space-y-2 pt-2">
                  <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                      ROI (30D)
                    </span>
                    <span className="text-emerald-500 font-black font-mono">
                      +{trader.performance?.roi30d}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                      Win Rate
                    </span>
                    <span className="text-sky-400 font-black font-mono">
                      {trader.performance?.winRate}%
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={isStarting}
                onClick={() => {
                  setSelectedTrader(trader);
                  setShowDetail(true);
                }}
                className={`w-full mt-6 py-4 rounded-2xl font-black uppercase text-[11px] flex items-center justify-center gap-2 transition-all ${
                  following
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-sky-500 text-black hover:bg-sky-400 shadow-lg shadow-sky-500/10"
                }`}
              >
                {following ? (
                  <>
                    <HiOutlineCheckCircle size={16} /> Mirroring
                  </>
                ) : (
                  <>
                    <HiOutlineArrowTrendingUp size={16} /> View Strategy
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-6 pt-10">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="text-gray-500 hover:text-white uppercase text-xs font-bold transition-colors"
        >
          Previous
        </button>
        <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white text-xs font-black">
          {currentPage}
        </div>
        <button
          onClick={() =>
            setCurrentPage((p) =>
              indexOfLast < processedTraders.length ? p + 1 : p,
            )
          }
          className="text-gray-500 hover:text-white uppercase text-xs font-bold transition-colors"
        >
          Next
        </button>
      </div>

      {/* TRADER DETAIL DRAWER */}
      {showDetail && traderDetail && (
        <div className="fixed inset-0 bg-black/95 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
          <div className="bg-[#0A0C12] max-w-xl w-full p-6 md:p-10 rounded-[2.5rem] border border-white/10 overflow-y-auto max-h-[90vh] shadow-2xl">
            <div className="flex justify-between items-start mb-8">
              <div className="flex flex-col items-center sm:items-start gap-4 w-full">
                <div className="relative">
                  <div className="h-28 w-28 rounded-[2rem] overflow-hidden border-2 border-sky-500/20 bg-white/5 flex items-center justify-center shadow-2xl">
                    {traderDetail.avatar ? (
                      <img
                        src={traderDetail.avatar}
                        alt={traderDetail.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <HiOutlineUser className="text-gray-700" size={48} />
                    )}
                  </div>
                  {traderDetail.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-sky-500 text-black p-1.5 rounded-xl shadow-xl">
                      <HiCheckBadge size={22} />
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-4xl font-black text-white uppercase italic leading-none tracking-tight">
                    {traderDetail.name}
                  </h2>
                  <span className="text-sky-500 text-[10px] uppercase font-black tracking-[0.3em] mt-3 block">
                    Institutional Strategy Profile
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowDetail(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <HiOutlineXMark size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <Stat
                label="ROI 30D"
                value={`${traderDetail.performance?.roi30d}%`}
                highlight="emerald"
              />
              <Stat
                label="Win Rate"
                value={`${traderDetail.performance?.winRate}%`}
                highlight="sky"
              />
              <Stat
                label="Profit Factor"
                value={traderDetail.performance?.profitFactor}
              />
              <Stat
                label="Total ROI"
                value={`${traderDetail.performance?.totalRoi}%`}
              />
              <Stat
                label="Sharpe Ratio"
                value={traderDetail.riskMetrics?.sharpeRatio}
              />
              <Stat
                label="Max Drawdown"
                value={`${traderDetail.riskMetrics?.maxDrawdown}%`}
              />
            </div>

            {isFollowing(traderDetail._id) ? (
              <div className="w-full py-5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-black uppercase rounded-2xl flex items-center justify-center gap-3">
                <HiOutlineCheckCircle size={22} />
                Mirroring Active
              </div>
            ) : (
              <button
                disabled={isStarting}
                onClick={async () => {
                  try {
                    await startCopying({ traderId: traderDetail._id }).unwrap();
                    toast.success("Mirroring Started 🚀");
                    setShowDetail(false);
                    refetch();
                  } catch (err) {
                    toast.error(err?.data?.message || "Check your balance");
                  }
                }}
                className="w-full py-5 bg-sky-500 hover:bg-sky-400 text-black font-black uppercase rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-sky-500/20"
              >
                {isStarting ? "Processing..." : "Start Mirroring"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, value, highlight }) => {
  const getValColor = () => {
    if (highlight === "emerald") return "text-emerald-500";
    if (highlight === "sky") return "text-sky-400";
    return "text-white";
  };

  return (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center sm:items-start">
      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
        {label}
      </p>
      <p className={`font-black text-xl ${getValColor()}`}>{value}</p>
    </div>
  );
};

export default CopyTradingPage;
