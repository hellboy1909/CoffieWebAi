import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { dispatch } = useCart();

  const roastColor = {
    "Light Roast": "bg-amber-100 text-amber-800",
    "Medium Roast": "bg-orange-100 text-orange-800",
    "Dark Roast": "bg-stone-200 text-stone-800",
  }[product.roast] || "bg-gray-100 text-gray-800";

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-[#F0E6DC] overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Product Image Area */}
      <div
        className="relative h-48 sm:h-56 bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] flex items-center justify-center cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roastColor}`}>
            {product.roast}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#2C1810]/10 text-[#2C1810]">
            {product.category}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#2C1810]/0 group-hover:bg-[#2C1810]/5 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-[#2C1810] font-medium bg-white/80 px-3 py-1.5 rounded-full">
            View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif font-semibold text-[#2C1810] text-base sm:text-lg leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-[#8B5E3C] font-medium">{product.rating}</span>
          </div>
        </div>

        <p className="text-xs text-[#8B5E3C] mb-2">{product.origin} · {product.weight}</p>

        {/* Flavor Notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 text-[10px] sm:text-xs bg-[#FFF8F0] text-[#8B5E3C] rounded-full border border-[#F0E6DC]"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F0E6DC]">
          <span className="text-xl font-bold text-[#2C1810]">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch({ type: "ADD_ITEM", product })}
            className="px-4 py-2 bg-[#2C1810] hover:bg-[#4A2C2A] text-[#F5E6D3] text-sm font-medium rounded-full transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
