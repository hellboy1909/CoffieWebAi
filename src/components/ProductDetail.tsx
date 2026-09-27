import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", product });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
        >
          <svg className="w-5 h-5 text-[#2C1810]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image */}
        <div className="h-56 sm:h-72 bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] flex items-center justify-center rounded-t-3xl">
          <span className="text-8xl sm:text-9xl">{product.image}</span>
        </div>

        {/* Product Info */}
        <div className="p-6 sm:p-8">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-medium">
              {product.roast}
            </span>
            <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-medium">
              {product.category}
            </span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {product.rating}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mb-1">
            {product.name}
          </h2>
          <p className="text-sm text-[#8B5E3C] mb-4">{product.origin} · {product.weight}</p>

          <p className="text-[#4A2C2A] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Flavor Notes */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#2C1810] mb-2">Tasting Notes</h4>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#FFF8F0] to-[#F5E6D3] text-[#4A2C2A] rounded-full text-sm border border-[#E8D5C4]"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#F0E6DC]">
            <div>
              <span className="text-3xl font-bold text-[#2C1810]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-[#8B5E3C] ml-1">/ {product.weight}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#E8D5C4] rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-[#FFF8F0] transition-colors text-[#2C1810]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-4 py-2 text-sm font-medium text-[#2C1810] min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-[#FFF8F0] transition-colors text-[#2C1810]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-[#2C1810] hover:bg-[#4A2C2A] text-[#F5E6D3]"
                }`}
              >
                {added ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
