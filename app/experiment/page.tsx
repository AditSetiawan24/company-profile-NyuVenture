"use client";
import { useState, useEffect } from "react";
import { Loader2, X, ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";
type Rarity = "C" | "R" | "SR" | "SSR";
interface InventoryItem {
  id: string;
  url: string;
  rarity: Rarity;
  date: string;
}
const RARITY_MAP: Record<Rarity, { prob: number; color: string; badge: string; border: string; glow: string }> = {
  C: { prob: 0.6, color: "text-gray-500", badge: "bg-gray-500 text-white", border: "border-gray-300", glow: "" },
  R: { prob: 0.25, color: "text-blue-500", badge: "bg-blue-500 text-white", border: "border-blue-400", glow: "shadow-blue-500/30 shadow-lg" },
  SR: { prob: 0.1, color: "text-purple-500", badge: "bg-purple-500 text-white", border: "border-purple-500", glow: "shadow-purple-500/50 shadow-xl" },
  SSR: { prob: 0.05, color: "text-yellow-500", badge: "bg-yellow-500 text-black font-black", border: "border-yellow-500 ssr-glow", glow: "" },
};
const ITEMS_PER_PAGE = 12;
const API_URL = "https://api.waifu.im/images?IsNsfw=False";
export default function GachaExperimentPage() {
  const [isClient, setIsClient] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [currentPull, setCurrentPull] = useState<InventoryItem | null>(null);
  const [pullImageLoaded, setPullImageLoaded] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | Rarity>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImage, setModalImage] = useState<string | null>(null);
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("gacha_inventory");
    if (saved) {
      setInventory(JSON.parse(saved));
    }
  }, []);
  const rollRarity = (): Rarity => {
    const rand = Math.random();
    if (rand < 0.05) return "SSR";
    if (rand < 0.15) return "SR";
    if (rand < 0.40) return "R";
    return "C";
  };
  const fetchCard = async (retries = 5, rarityTarget: Rarity): Promise<InventoryItem> => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!data || !data.items || data.items.length === 0) throw new Error("Blank");
      const item = data.items[0];
      const url = item.url;
      const sizeStr = item.byteSize;
      const sizeId = String(item.id) || String(Math.floor(Math.random() * 999999));
      const isDuplicate = inventory.some((i) => i.url === url);
      const isOversize = sizeStr > 4194304;
      if ((isDuplicate || isOversize) && retries > 0) {
        return fetchCard(retries - 1, rarityTarget);
      }
      return {
        id: sizeId,
        url: url,
        rarity: rarityTarget,
        date: new Date().toISOString(),
      };
    } catch (e) {
      if (retries > 0) return fetchCard(retries - 1, rarityTarget);
      return {
        id: `fallback-${Date.now()}`,
        url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?w=400&q=80",
        rarity: rarityTarget,
        date: new Date().toISOString()
      };
    }
  };
  const handlePullButton = async () => {
    if (isRolling) return;
    setIsRolling(true);
    setCurrentPull(null);
    setPullImageLoaded(false);
    try {
      const rolledRarity = rollRarity();
      const logicPromise = fetchCard(5, rolledRarity);
      const timerPromise = new Promise(resolve => setTimeout(resolve, 1500));
      const [pulledData] = await Promise.all([logicPromise, timerPromise]);
      const preloadPromise = new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = pulledData.url;
      });
      await preloadPromise;
      setCurrentPull(pulledData);
      setPullImageLoaded(true);
      const newInventory = [pulledData, ...inventory];
      setInventory(newInventory);
      localStorage.setItem("gacha_inventory", JSON.stringify(newInventory));
    } catch (e) {
      console.error(e);
    } finally {
      setIsRolling(false);
    }
  };
  const filteredInventory = inventory.filter(i => filter === "ALL" || i.rarity === filter);
  const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE) || 1;
  const currentItems = filteredInventory.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  if (!isClient) return null;
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-20">
      <section className="bg-gray-800 border-b border-gray-700 py-10 shadow-lg">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-wider flex items-center justify-center gap-3">
             <PackageOpen className="w-10 h-10 text-brand-light" /> Gacha Waifu
          </h1>
          <p className="text-gray-400">Bawa pulang waifumu dan jadilah raja karbit yang sesungguhnya</p>
        </div>
      </section>
      <div className="container mx-auto px-4 max-w-4xl mt-12 flex flex-col gap-16">
        <div className="flex flex-col items-center w-full">
          <div className="bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-700 shadow-2xl w-full max-w-md mx-auto relative overflow-hidden">
            <div className="text-center mb-8">
               <h2 className="text-2xl font-bold">Summon my bini gweh</h2>
            </div>
            <div className="w-full aspect-[3/4] bg-gray-900 rounded-2xl mb-8 relative flex items-center justify-center border-2 border-dashed border-gray-700">
               {!currentPull && !isRolling && (
                 <div className="text-gray-600 text-center uppercase tracking-widest font-semibold flex flex-col items-center">
                   <PackageOpen className="w-12 h-12 mb-2 opacity-50" />
                   Roll...
                 </div>
               )}
               {isRolling && (
                 <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-2xl z-20">
                    <Loader2 className="w-12 h-12 text-brand-light animate-spin" />
                 </div>
               )}
               {currentPull && (
                 <div 
                   className={`absolute inset-0 rounded-2xl border-4 ${RARITY_MAP[currentPull.rarity].border} ${RARITY_MAP[currentPull.rarity].glow} bg-gray-800 overflow-hidden cursor-pointer group transition-all duration-500 animate-in zoom-in-50 fade-in`}
                   onClick={() => setModalImage(currentPull.url)}
                 >
                   {currentPull.rarity === "SSR" && <div className="ssr-shine-effect"></div>}
                   <div className={`absolute top-2 left-2 z-30 px-3 py-1 rounded-lg text-sm ${RARITY_MAP[currentPull.rarity].badge} shadow-lg backdrop-blur-md`}>
                     {currentPull.rarity}
                   </div>
                   {!pullImageLoaded && (
                     <div className="absolute inset-0 bg-gray-700 animate-pulse z-10" />
                   )}
                   <img 
                     src={currentPull.url} 
                     alt="Pulled" 
                     className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${pullImageLoaded ? "opacity-100" : "opacity-0"} `}
                     onLoad={() => setPullImageLoaded(true)}
                   />
                 </div>
               )}
            </div>
            <button 
              onClick={handlePullButton}
              disabled={isRolling}
              className={`w-full py-4 rounded-xl font-black text-lg tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${
                isRolling 
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                  : "bg-brand hover:bg-brand-light text-white shadow-[0_0_20px_rgba(31,122,103,0.5)] hover:scale-105"
              }`}
            >
              {isRolling ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> Summoning...
                </>
              ) : "Summon"}
            </button>
          </div>
        </div>
        <div className="flex flex-col pt-8 lg:pt-0 w-full mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
             <div>
               <h2 className="text-2xl font-bold flex items-center gap-2">
                  Bukankah ini my <span className="text-sm font-normal text-gray-500">[{inventory.length} Total Summons]</span>
               </h2>
             </div>
             <div className="flex gap-2 bg-gray-800 p-1.5 rounded-lg border border-gray-700 w-full md:w-auto overflow-x-auto">
               {["ALL", "SSR", "SR", "R", "C"].map((f) => (
                 <button
                   key={f}
                   onClick={() => setFilter(f as "ALL" | Rarity)}
                   className={`px-4 py-1.5 text-sm font-bold rounded-md transition ${filter === f ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}`}
                 >
                   {f}
                 </button>
               ))}
             </div>
          </div>
          {inventory.length === 0 ? (
            <div className="flex-1 rounded-2xl border-2 border-dashed border-gray-800 flex flex-col items-center justify-center text-gray-500 p-10 mt-4">
              <PackageOpen className="w-16 h-16 mb-4 opacity-30" />
              <p>Inventory Kosong. Lakukan pull di Altar untuk memulai!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-max">
                {currentItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`relative rounded-xl border-2 ${RARITY_MAP[item.rarity].border} overflow-hidden aspect-[3/4] cursor-pointer group hover:scale-[1.05] transition-transform duration-500 bg-gray-800`}
                    onClick={() => setModalImage(item.url)}
                  >
                    {item.rarity === "SSR" && <div className="ssr-shine-effect opacity-50"></div>}
                    <div className={`absolute top-1 left-1 z-10 px-2 py-0.5 rounded text-xs ${RARITY_MAP[item.rarity].badge}`}>
                      {item.rarity}
                    </div>
                    <img 
                      src={item.url} 
                      loading="lazy" 
                      alt="waifu" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-50 transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="font-medium text-gray-400">
                    Halaman <span className="text-white font-bold">{currentPage}</span> dari {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-50 transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {modalImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button 
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
            onClick={() => setModalImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={modalImage} 
            alt="Fullscreen Modal" 
            className="max-w-full max-h-[90vh] object-contain animate-in zoom-in-75 duration-300 rounded-lg shadow-2xl" 
          />
        </div>
      )}
    </div>
  );
}
