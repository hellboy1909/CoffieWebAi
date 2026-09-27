import { useState } from "react";
import { useCart } from "../context/CartContext";

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { state, dispatch, totalPrice } = useCart();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const shipping = totalPrice >= 35 ? 0 : 4.99;
  const total = totalPrice + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      dispatch({ type: "CLEAR_CART" });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2C1810] mb-2">
            Order Confirmed!
          </h2>
          <p className="text-[#8B5E3C] mb-2">
            Thank you for your order. Your specialty coffee is on its way.
          </p>
          <p className="text-sm text-[#8B5E3C]/70 mb-6">
            Order #EMB-{Math.random().toString(36).substr(2, 8).toUpperCase()}
          </p>
          <div className="bg-[#FFF8F0] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#8B5E3C]">
              A confirmation email has been sent to <strong>{formData.email || "your email"}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#2C1810] hover:bg-[#4A2C2A] text-[#F5E6D3] font-medium rounded-full transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
          <div className="w-16 h-16 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="font-serif text-xl font-bold text-[#2C1810] mb-2">
            Processing Your Order
          </h2>
          <p className="text-sm text-[#8B5E3C]">
            Please wait while we confirm your payment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-[#F0E6DC] p-5 flex items-center justify-between z-10">
          <h2 className="font-serif text-xl font-bold text-[#2C1810]">Checkout</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 hover:bg-[#FFF8F0] rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-[#2C1810]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form Fields */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[#2C1810] text-[#F5E6D3] rounded-full flex items-center justify-center text-xs">1</span>
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border border-[#E8D5C4] rounded-xl text-sm focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/50 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border border-[#E8D5C4] rounded-xl text-sm focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/50 transition-all"
                  />
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h3 className="text-sm font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[#2C1810] text-[#F5E6D3] rounded-full flex items-center justify-center text-xs">2</span>
                  Shipping Address
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border border-[#E8D5C4] rounded-xl text-sm focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/50 transition-all"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      required
                      className="w-full px-4 py-2.5 border border-[#E8D5C4] rounded-xl text-sm focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/50 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={(e) => handleChange("zip", e.target.value)}
                      required
                      className="w-full px-4 py-2.5 border border-[#E8D5C4] rounded-xl text-sm focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-sm font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[#2C1810] text-[#F5E6D3] rounded-full flex items-center justify-center text-xs">3</span>
                  Payment (Simulated)
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.card}
                    onChange={(e) => handleChange("card", e.target.value)}
                    required
                    maxLength={19}
                    className="w-full px-4 py-2.5 border border-[#E8D5C4] rounded-xl text-sm focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/50 transition-all"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => handleChange("expiry", e.target.value)}
                      required
                      maxLength={5}
                      className="w-full px-4 py-2.5 border border-[#E8D5C4] rounded-xl text-sm focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/50 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleChange("cvv", e.target.value)}
                      required
                      maxLength={4}
                      className="w-full px-4 py-2.5 border border-[#E8D5C4] rounded-xl text-sm focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#F0E6DC] sticky top-20">
                <h3 className="font-serif font-bold text-[#2C1810] mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-2">
                      <span className="text-lg">{item.product.image}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#2C1810] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-[#8B5E3C]">×{item.quantity}</p>
                      </div>
                      <span className="text-xs font-medium text-[#2C1810]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#E8D5C4] pt-3 space-y-2">
                  <div className="flex justify-between text-xs text-[#8B5E3C]">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#8B5E3C]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#2C1810] pt-2 border-t border-[#E8D5C4]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-5 py-3 bg-[#2C1810] hover:bg-[#4A2C2A] text-[#F5E6D3] font-medium rounded-full transition-colors text-sm"
                >
                  Place Order — ${total.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
