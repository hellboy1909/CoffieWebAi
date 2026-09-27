import { useState, useMemo } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { products, Product } from "./data/products";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function AppContent() {
  const { dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRoast, setSelectedRoast] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesRoast =
        selectedRoast === "All" || product.roast === selectedRoast;

      return matchesSearch && matchesCategory && matchesRoast;
    });
  }, [searchQuery, selectedCategory, selectedRoast]);

  const handleCheckout = () => {
    dispatch({ type: "CLOSE_CART" });
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-[#FFFDF9] to-[#FFF8F0]">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => dispatch({ type: "TOGGLE_CART" })}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2C1810]/5 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[#8B5E3C] tracking-wide">
                Freshly roasted & shipped within 24 hours
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] mb-4 leading-tight">
              Exceptional Coffee,{" "}
              <span className="text-[#8B5E3C]">Thoughtfully Sourced</span>
            </h2>
            <p className="text-[#8B5E3C] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Discover our curated selection of single-origin and artisan blends.
              Each bean is carefully selected, expertly roasted, and delivered at peak freshness.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#D4A574]/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#8B5E3C]/5 rounded-full blur-2xl" />
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <FilterBar
          selectedCategory={selectedCategory}
          selectedRoast={selectedRoast}
          onCategoryChange={setSelectedCategory}
          onRoastChange={setSelectedRoast}
          resultCount={filteredProducts.length}
        />

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="font-serif text-xl font-bold text-[#2C1810] mb-2">
              No coffees found
            </h3>
            <p className="text-[#8B5E3C] text-sm">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedRoast("All");
              }}
              className="mt-4 px-5 py-2 bg-[#2C1810] text-[#F5E6D3] text-sm font-medium rounded-full hover:bg-[#4A2C2A] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#2C1810] text-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">☕</span>
                <span className="font-serif font-bold text-lg">Ember & Oak</span>
              </div>
              <p className="text-sm text-[#D4A574]/80 leading-relaxed">
                Specialty coffee roasters dedicated to bringing you the world's finest beans, roasted with care.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-[#D4A574]">Shop</h4>
              <ul className="space-y-2 text-sm text-[#D4A574]/70">
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Single Origin</li>
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Blends</li>
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Subscriptions</li>
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Gift Cards</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-[#D4A574]">Learn</h4>
              <ul className="space-y-2 text-sm text-[#D4A574]/70">
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Brewing Guides</li>
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Coffee Origins</li>
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Sustainability</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-[#D4A574]">Connect</h4>
              <ul className="space-y-2 text-sm text-[#D4A574]/70">
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Instagram</li>
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Twitter</li>
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Newsletter</li>
                <li className="hover:text-[#F5E6D3] cursor-pointer transition-colors">Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#D4A574]/20 mt-8 pt-8 text-center text-xs text-[#D4A574]/50">
            <p>© 2026 Ember & Oak Coffee Roasters. All rights reserved. Crafted with ☕ and care.</p>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Cart onCheckout={handleCheckout} />

      {showCheckout && (
        <Checkout onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
