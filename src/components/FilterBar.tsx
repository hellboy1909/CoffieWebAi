import { categories, roasts } from "../data/products";

interface FilterBarProps {
  selectedCategory: string;
  selectedRoast: string;
  onCategoryChange: (category: string) => void;
  onRoastChange: (roast: string) => void;
  resultCount: number;
}

export default function FilterBar({
  selectedCategory,
  selectedRoast,
  onCategoryChange,
  onRoastChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#F0E6DC] shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <label className="text-xs font-medium text-[#8B5E3C] uppercase tracking-wider mb-2 block">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#2C1810] text-[#F5E6D3] shadow-sm"
                    : "bg-[#FFF8F0] text-[#8B5E3C] hover:bg-[#F5E6D3] border border-[#F0E6DC]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Roast Filter */}
        <div className="flex-1">
          <label className="text-xs font-medium text-[#8B5E3C] uppercase tracking-wider mb-2 block">
            Roast Level
          </label>
          <div className="flex flex-wrap gap-2">
            {roasts.map((roast) => (
              <button
                key={roast}
                onClick={() => onRoastChange(roast)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedRoast === roast
                    ? "bg-[#2C1810] text-[#F5E6D3] shadow-sm"
                    : "bg-[#FFF8F0] text-[#8B5E3C] hover:bg-[#F5E6D3] border border-[#F0E6DC]"
                }`}
              >
                {roast}
              </button>
            ))}
          </div>
        </div>

        {/* Result Count */}
        <div className="sm:text-right">
          <span className="text-sm text-[#8B5E3C]">
            <span className="font-bold text-[#2C1810]">{resultCount}</span>{" "}
            {resultCount === 1 ? "coffee" : "coffees"} found
          </span>
        </div>
      </div>
    </div>
  );
}
