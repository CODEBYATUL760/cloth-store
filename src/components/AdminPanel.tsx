import { useState, useMemo, FormEvent } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, ShoppingBag, Users, Ticket, 
  Settings, CheckCircle, Package, Edit3, Plus, 
  Trash2, Eye, ShieldAlert, BarChart3, AlertCircle
} from "lucide-react";
import { Product, Order, Coupon } from "../types";

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

export default function AdminPanel({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"analytics" | "products" | "orders" | "customers" | "coupons">("analytics");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Stats
  const stats = useMemo(() => {
    const totalSales = orders.reduce((acc, curr) => acc + curr.total, 0);
    const activeProducts = products.filter(p => p.stock > 0).length;
    const outOfStock = products.length - activeProducts;
    
    // Custom coupon counts
    const activeCouponsCount = 3; 

    return {
      totalSales,
      ordersCount: orders.length,
      activeProducts,
      outOfStock,
      activeCouponsCount,
      uniqueCustomersCount: 142 // Mock
    };
  }, [products, orders]);

  // Product form state
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState(0);
  const [formCategory, setFormCategory] = useState<Product["category"]>("Men");
  const [formSubCategory, setFormSubCategory] = useState<Product["subCategory"]>("Casual Wear");
  const [formStock, setFormStock] = useState(50);
  const [formBrand, setFormBrand] = useState("MBA Kapdewala");
  const [formFabric, setFormFabric] = useState("Fine Cotton Blend");

  const startEdit = (p: Product) => {
    setEditingProduct(p);
    setIsAddingNew(false);
    setFormName(p.name);
    setFormPrice(p.price);
    setFormCategory(p.category);
    setFormSubCategory(p.subCategory);
    setFormStock(p.stock);
    setFormBrand(p.brand);
    setFormFabric(p.fabric);
  };

  const startAdd = () => {
    setEditingProduct(null);
    setIsAddingNew(true);
    setFormName("");
    setFormPrice(99);
    setFormCategory("Men");
    setFormSubCategory("Casual Wear");
    setFormStock(50);
    setFormBrand("MBA Kapdewala");
    setFormFabric("Premium Combed Cotton");
  };

  const handleSaveProduct = (e: FormEvent) => {
    e.preventDefault();
    if (isAddingNew) {
      const newId = `prod-${products.length + 1}`;
      const newSku = `UV-${formCategory.substring(0, 1).toUpperCase()}-${formSubCategory.substring(0, 2).toUpperCase()}-${String(products.length + 1).padStart(3, "0")}`;
      const newProduct: Product = {
        id: newId,
        sku: newSku,
        name: formName,
        price: formPrice,
        mrp: Math.round(formPrice * 1.2),
        discount: 15,
        category: formCategory,
        subCategory: formSubCategory,
        stock: formStock,
        brand: formBrand,
        fabric: formFabric,
        washCare: "Machine Wash Cold",
        sizes: formCategory === "Footwear" ? ["40", "41", "42", "43"] : ["S", "M", "L", "XL"],
        colors: ["Midnight Black", "Camel Beige", "Oatmeal Melange"],
        images: ["https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600"],
        description: "Bespoke style built with highly durable premium tailoring.",
        features: ["Double stitching", "Pre-shrunk fabric", "Soft-touch lining"],
        deliveryInfo: "Fast standard premium packaging.",
        returnPolicy: "Flawless 30 days returns.",
        rating: 4.8,
        reviews: [],
        tags: [formCategory.toLowerCase(), "new"]
      };
      onAddProduct(newProduct);
      setIsAddingNew(false);
    } else if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formName,
        price: formPrice,
        category: formCategory,
        subCategory: formSubCategory,
        stock: formStock,
        brand: formBrand,
        fabric: formFabric
      };
      onUpdateProduct(updated);
      setEditingProduct(null);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white p-4 sm:p-8 border border-zinc-900 rounded-3xl overflow-hidden mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-amber-500/10 text-amber-500 text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-amber-500/20">Store Admin</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-500 font-mono">SYSTEM ACTIVE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans tracking-tight text-white font-medium flex items-center gap-2">
            MBA Kapdewala <span className="text-zinc-500 font-light text-base">Admin Dashboard</span>
          </h2>
        </div>

        {/* Nav Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          {[
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "products", label: "Inventory", icon: Package },
            { id: "orders", label: "Orders", icon: ShoppingBag },
            { id: "coupons", label: "Coupons", icon: Ticket }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-black shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Gross Revenues", val: `₹${stats.totalSales.toLocaleString("en-IN")}`, color: "text-emerald-500", desc: "Real-time orders ledger" },
          { label: "Fulfillment Orders", val: stats.ordersCount, color: "text-blue-400", desc: "Checkout transactions" },
          { label: "Active Products", val: `${stats.activeProducts}/${products.length}`, color: "text-amber-500", desc: `${stats.outOfStock} items depleted` },
          { label: "Subscribers & Clients", val: stats.uniqueCustomersCount, color: "text-purple-400", desc: "Newsletter & Profiles" }
        ].map((st, idx) => (
          <div key={idx} className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-xl flex flex-col justify-between">
            <span className="text-xs text-zinc-500 font-mono tracking-wide uppercase">{st.label}</span>
            <div className={`text-xl sm:text-2xl font-bold font-sans mt-2 ${st.color}`}>{st.val}</div>
            <span className="text-[10px] text-zinc-600 font-mono mt-1">{st.desc}</span>
          </div>
        ))}
      </div>

      {/* Tab: Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-zinc-900/20 border border-zinc-850 p-6 rounded-2xl">
              <h3 className="font-sans font-medium text-sm text-zinc-400 mb-4 uppercase tracking-wider font-mono">Gross Revenues Trend (Demo Simulator)</h3>
              
              {/* Micro-bar chart */}
              <div className="h-48 flex items-end justify-between gap-2 pt-6">
                {[1200, 1800, 1400, 2300, 3100, 2700, totalSalesAmount(orders), 4300, 3900, 5200].map((val, i) => {
                  const heightPercentage = Math.min(100, (val / 5200) * 100);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-full bg-zinc-850 hover:bg-amber-500/20 rounded-md transition-colors relative h-full flex items-end overflow-hidden">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercentage}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          className="w-full bg-amber-500 group-hover:bg-amber-400 rounded-b-md"
                        />
                      </div>
                      <span className="text-[9px] text-zinc-500 font-mono">0{i+1}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-zinc-500 mt-4 text-center">Simulated cumulative luxury transactions grouped by date intervals</p>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-medium text-sm text-zinc-400 mb-4 uppercase tracking-wider font-mono">Fulfillment Status</h3>
                <div className="space-y-3.5 mt-4">
                  {[
                    { label: "Delivered", count: orders.filter(o => o.status === "Delivered").length, pct: "65%", col: "bg-emerald-500" },
                    { label: "Shipped", count: orders.filter(o => o.status === "Shipped").length, pct: "20%", col: "bg-blue-400" },
                    { label: "Out for Delivery", count: orders.filter(o => o.status === "Out for Delivery").length, pct: "10%", col: "bg-amber-400" },
                    { label: "Placed/Processing", count: orders.filter(o => o.status === "Placed" || o.status === "Processing").length, pct: "5%", col: "bg-purple-500" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-zinc-300 font-medium">{stat.label}</span>
                        <span className="text-zinc-500 font-mono">{stat.count} orders ({stat.pct})</span>
                      </div>
                      <div className="w-full bg-zinc-850 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.col}`} style={{ width: stat.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-zinc-600 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-850 mt-4 flex items-start gap-1.5">
                <AlertCircle size={14} className="text-zinc-400 flex-shrink-0 mt-0.5" />
                <span>Status tracking uses live local session events. Any status adjustments will update user-facing timelines immediately.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Products */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-sans font-medium text-sm text-zinc-400 uppercase tracking-wider font-mono">Apparel Catalog Management</h3>
            <button
              onClick={startAdd}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              <Plus size={14} /> Add Luxury Product
            </button>
          </div>

          {/* Form */}
          {(isAddingNew || editingProduct) && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSaveProduct}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4"
            >
              <h4 className="font-medium text-sm text-amber-500 border-b border-zinc-800 pb-2 flex items-center gap-1.5">
                <Edit3 size={14} /> {isAddingNew ? "Create New Fashion Design" : `Edit Catalog Item: ${editingProduct?.sku}`}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">Retail Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">Inventory Stock</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={e => setFormStock(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">Top-level Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500/50 text-white"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">Subcategory / Style</label>
                  <select
                    value={formSubCategory}
                    onChange={e => setFormSubCategory(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500/50 text-white"
                  >
                    <option value="Casual Wear">Casual Wear</option>
                    <option value="Formal Wear">Formal Wear</option>
                    <option value="Sportswear">Sportswear</option>
                    <option value="Winter Wear">Winter Wear</option>
                    <option value="Ethnic Wear">Ethnic Wear</option>
                    <option value="Watches">Watches</option>
                    <option value="Bags">Bags</option>
                    <option value="Boots">Boots</option>
                    <option value="Sneakers">Sneakers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">Fictional Brand</label>
                  <input
                    type="text"
                    value={formBrand}
                    onChange={e => setFormBrand(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">Main Fabric</label>
                  <input
                    type="text"
                    value={formFabric}
                    onChange={e => setFormFabric(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingProduct(null);
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Save to Catalog
                </button>
              </div>
            </motion.form>
          )}

          {/* List Products Table */}
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/10">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 font-medium">
                  <th className="p-3">SKU</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Style Cat</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Inventory</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 10).map((p, idx) => (
                  <tr key={idx} className="border-b border-zinc-850 hover:bg-zinc-900/30">
                    <td className="p-3 font-mono text-zinc-400">{p.sku}</td>
                    <td className="p-3 font-medium text-white">{p.name}</td>
                    <td className="p-3">
                      <span className="bg-zinc-800 text-zinc-300 text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-700">
                        {p.category} / {p.subCategory}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-amber-500">₹{p.price.toLocaleString("en-IN")}</td>
                    <td className="p-3">
                      {p.stock > 0 ? (
                        <span className="text-emerald-400 font-medium">{p.stock} units</span>
                      ) : (
                        <span className="text-rose-500 font-medium bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">OUT OF STOCK</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center items-center gap-1.5">
                        <button
                          onClick={() => startEdit(p)}
                          className="p-1 text-zinc-400 hover:text-amber-500 rounded hover:bg-zinc-800 transition-colors"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1 text-zinc-400 hover:text-rose-500 rounded hover:bg-zinc-800 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500 text-right italic">Displaying top 10 items. High-fidelity scroll pagination configured in DB.</p>
        </div>
      )}

      {/* Tab: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <h3 className="font-sans font-medium text-sm text-zinc-400 uppercase tracking-wider font-mono">Active Orders & Shipping</h3>
          
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/10">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 font-medium">
                  <th className="p-3">ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Fulfill Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-500">
                      <AlertCircle className="mx-auto mb-2 text-zinc-600" size={24} />
                      No customer orders have been received in this local sandbox yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((ord, idx) => (
                    <tr key={idx} className="border-b border-zinc-850 hover:bg-zinc-900/30">
                      <td className="p-3 font-mono text-zinc-400">{ord.id}</td>
                      <td className="p-3 text-zinc-300 font-mono">{ord.date}</td>
                      <td className="p-3 font-medium text-white">{ord.shippingAddress.fullName}</td>
                      <td className="p-3 font-bold text-emerald-500">₹{ord.total.toLocaleString("en-IN")}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          ord.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          ord.status === "Shipped" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          ord.status === "Out for Delivery" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <select
                          value={ord.status}
                          onChange={e => onUpdateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-zinc-950 border border-zinc-800 rounded p-1 text-[11px] text-zinc-300 focus:outline-none focus:border-amber-500/50"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Coupons */}
      {activeTab === "coupons" && (
        <div className="space-y-6">
          <h3 className="font-sans font-medium text-sm text-zinc-400 uppercase tracking-wider font-mono">Bespoke Coupons & Promos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { code: "VOGUE10", type: "10% OFF", desc: "For basket sizes over $100", bg: "from-amber-500/10 to-transparent", border: "border-amber-500/20" },
              { code: "WELCOME50", type: "$50 USD FLAT", desc: "For basket sizes over $250", bg: "from-blue-500/10 to-transparent", border: "border-blue-500/20" },
              { code: "LUXEVIP", type: "20% OFF", desc: "For premium spends over $400", bg: "from-purple-500/10 to-transparent", border: "border-purple-500/20" }
            ].map((cp, idx) => (
              <div key={idx} className={`bg-gradient-to-r ${cp.bg} border ${cp.border} p-5 rounded-2xl flex flex-col justify-between`}>
                <div>
                  <span className="font-mono text-zinc-500 text-[10px] uppercase block mb-1">PROMOTION ACTIVE</span>
                  <div className="font-mono text-xl font-bold tracking-widest text-white">{cp.code}</div>
                  <div className="text-sm font-semibold text-amber-500 mt-2">{cp.type}</div>
                  <p className="text-xs text-zinc-400 mt-1">{cp.desc}</p>
                </div>
                <div className="text-[10px] text-zinc-500 mt-4 font-mono">Usage status: Standard checkout validation</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function totalSalesAmount(orders: Order[]): number {
  return orders.reduce((sum, o) => sum + o.total, 0);
}
