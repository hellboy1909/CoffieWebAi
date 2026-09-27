import { useCart } from "../context/CartContext";

interface CartProps {
  onCheckout: () => void;
}

export default function Cart({ onCheckout }: CartProps) {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => dispatch({ type: "CLOSE_CART" })}
      />

      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#F0E6DC]">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#2C1810]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <h2 className="text-lg font-serif font-bold text-[#2C1810]">
              Your Cart
            </h2>
            <span className="px-2 py-0.5 bg-[#FFF8F0] text-[#8B5E3C] text-xs font-medium rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="w-8 h-8 hover:bg-[#FFF8F0] rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-[#2C1810]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-5xl mb-4">🛒</span>
              <p className="text-[#8B5E3C] font-medium">Your cart is empty</p>
              <p className="text-sm text-[#8B5E3C]/70 mt-1">
                Add some delicious coffee to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-[#FFF8F0] rounded-xl border border-[#F0E6DC]"
                >
                  {/* Product Image */}
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shrink-0 border border-[#F0E6DC]">
                    <span className="text-2xl">{item.product.image}</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#2C1810] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#8B5E3C]">{item.product.weight}</p>
                    <p className="text-sm font-bold text-[#2C1810] mt-1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", productId: item.product.id })
                      }
                      className="text-[#8B5E3C]/50 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div className="flex items-center border border-[#E8D5C4] rounded-full bg-white">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            productId: item.product.id,
                            quantity: item.quantity - 1,
                          })
                        }
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#FFF8F0] rounded-full transition-colors text-[#2C1810]"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-6 text-center text-xs font-medium text-[#2C1810]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            productId: item.product.id,
                            quantity: item.quantity + 1,
                          })
                        }
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#FFF8F0] rounded-full transition-colors text-[#2C1810]"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="p-5 border-t border-[#F0E6DC] bg-[#FFF8F0]/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#8B5E3C]">Subtotal</span>
              <span className="text-lg font-bold text-[#2C1810]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4 text-xs text-[#8B5E3C]">
              <span>Shipping</span>
              <span>{totalPrice >= 35 ? "Free" : "$4.99"}</span>
            </div>
            <div className="flex items-center justify-between mb-5 pt-3 border-t border-[#E8D5C4]">
              <span className="font-medium text-[#2C1810]">Total</span>
              <span className="text-xl font-bold text-[#2C1810]">
                ${(totalPrice + (totalPrice >= 35 ? 0 : 4.99)).toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3 bg-[#2C1810] hover:bg-[#4A2C2A] text-[#F5E6D3] font-medium rounded-full transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
            {totalPrice < 35 && (
              <p className="text-xs text-center text-[#8B5E3C] mt-2">
                Add ${(35 - totalPrice).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
