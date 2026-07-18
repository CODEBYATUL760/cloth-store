import { motion, AnimatePresence } from "motion/react";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: "Men" | "Women" | "Kids" | "Footwear" | "Accessories";
}

export default function SizeGuideModal({ isOpen, onClose, category = "Men" }: SizeGuideModalProps) {
  const menChart = [
    { size: "S", chest: '36" - 38"', waist: '30" - 32"', sleeve: '33"' },
    { size: "M", chest: '39" - 41"', waist: '33" - 35"', sleeve: '34"' },
    { size: "L", chest: '42" - 44"', waist: '36" - 38"', sleeve: '35"' },
    { size: "XL", chest: '45" - 47"', waist: '39" - 41"', sleeve: '36"' },
    { size: "XXL", chest: '48" - 50"', waist: '42" - 44"', sleeve: '37"' }
  ];

  const womenChart = [
    { size: "XS", bust: '31" - 32"', waist: '24" - 25"', hips: '34" - 35"' },
    { size: "S", bust: '33" - 34"', waist: '26" - 27"', hips: '36" - 37"' },
    { size: "M", bust: '35" - 36"', waist: '28" - 29"', hips: '38" - 39"' },
    { size: "L", bust: '37" - 39"', waist: '30" - 32"', hips: '40" - 42"' },
    { size: "XL", bust: '40" - 42"', waist: '33" - 35"', hips: '43" - 45"' }
  ];

  const footwearChart = [
    { eu: "38", usMen: "-", usWomen: "7.5", uk: "5.5", cm: "24.0" },
    { eu: "39", usMen: "6.5", usWomen: "8.5", uk: "6.0", cm: "24.5" },
    { eu: "40", usMen: "7.5", usWomen: "9.5", uk: "6.5", cm: "25.0" },
    { eu: "41", usMen: "8.5", usWomen: "10.5", uk: "7.5", cm: "26.0" },
    { eu: "42", usMen: "9.0", usWomen: "11.5", uk: "8.0", cm: "26.5" },
    { eu: "43", usMen: "10.0", usWomen: "-", uk: "9.0", cm: "27.5" },
    { eu: "44", usMen: "11.0", usWomen: "-", uk: "10.0", cm: "28.5" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Ruler className="text-amber-500" size={20} />
                <h3 className="font-sans font-medium text-lg tracking-wide">Size Chart & Guide</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content body */}
            <div className="space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our designs are crafted to reflect standard tailored fits. Use the table below to find your perfect fit. If your measurements fall between sizes, we recommend selecting the larger size for a relaxed premium silhouette.
              </p>

              {/* Men’s Chart */}
              {(category !== "Women" && category !== "Footwear") && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 mb-2">Men's Apparel Size Guide</h4>
                  <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/50">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 font-medium">
                          <th className="p-2.5">Size</th>
                          <th className="p-2.5">Chest</th>
                          <th className="p-2.5">Waist</th>
                          <th className="p-2.5">Sleeve</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menChart.map((row, idx) => (
                          <tr key={idx} className="border-b border-zinc-850 hover:bg-zinc-900/30">
                            <td className="p-2.5 font-bold text-amber-500">{row.size}</td>
                            <td className="p-2.5 text-zinc-300">{row.chest}</td>
                            <td className="p-2.5 text-zinc-300">{row.waist}</td>
                            <td className="p-2.5 text-zinc-300">{row.sleeve}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Women’s Chart */}
              {category === "Women" && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 mb-2">Women's Apparel Size Guide</h4>
                  <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/50">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 font-medium">
                          <th className="p-2.5">Size</th>
                          <th className="p-2.5">Bust</th>
                          <th className="p-2.5">Waist</th>
                          <th className="p-2.5">Hips</th>
                        </tr>
                      </thead>
                      <tbody>
                        {womenChart.map((row, idx) => (
                          <tr key={idx} className="border-b border-zinc-850 hover:bg-zinc-900/30">
                            <td className="p-2.5 font-bold text-amber-500">{row.size}</td>
                            <td className="p-2.5 text-zinc-300">{row.bust}</td>
                            <td className="p-2.5 text-zinc-300">{row.waist}</td>
                            <td className="p-2.5 text-zinc-300">{row.hips}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Footwear Chart */}
              {category === "Footwear" && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 mb-2">Footwear Conversion</h4>
                  <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/50">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 font-medium">
                          <th className="p-2.5">EU</th>
                          <th className="p-2.5">US Men</th>
                          <th className="p-2.5">US Women</th>
                          <th className="p-2.5">UK</th>
                          <th className="p-2.5">Inches / CM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {footwearChart.map((row, idx) => (
                          <tr key={idx} className="border-b border-zinc-850 hover:bg-zinc-900/30">
                            <td className="p-2.5 font-bold text-amber-500">{row.eu}</td>
                            <td className="p-2.5 text-zinc-300">{row.usMen}</td>
                            <td className="p-2.5 text-zinc-300">{row.usWomen}</td>
                            <td className="p-2.5 text-zinc-300">{row.uk}</td>
                            <td className="p-2.5 text-zinc-300">{row.cm} cm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Accessories / Kids */}
              {(category === "Accessories" || category === "Kids") && (
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 text-center">
                  <p className="text-sm font-medium text-amber-500 mb-1">Standard Sizing Fits All</p>
                  <p className="text-xs text-zinc-400">
                    Accessories are crafted under a premium universal "One Size Fits All" standard with adjustable straps, buckles, or links. For Kids, apparel corresponds directly with biological age years (e.g. 2Y, 4Y, 6Y).
                  </p>
                </div>
              )}
            </div>

            {/* Footer button */}
            <div className="border-t border-zinc-800 pt-4 mt-5 flex justify-end">
              <button
                onClick={onClose}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:text-amber-500 transition-colors text-xs font-medium px-4 py-2 rounded-lg"
              >
                Close Guide
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
