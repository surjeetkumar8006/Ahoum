import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, CreditCard, Truck, Tag, ShoppingBag, Loader2 } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    deliveryMethod,
    paymentMethod,
    promoCode,
    checkoutStatus,
    isCheckoutModalOpen,
    updateQuantity,
    removeFromCart,
    setDeliveryMethod,
    setPaymentMethod,
    applyPromoCode,
    removePromoCode,
    setCheckoutModalOpen,
    placeOrder,
    getItemsCount,
    getSubtotal,
    getDeliveryCost,
    getTotal,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (!promoInput.trim()) return;

    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Try 'NECTAR10' or 'FREESHIP'");
    }
  };

  const handlePlaceOrder = async () => {
    const success = await placeOrder();
    setCheckoutModalOpen(false);
    if (success) {
      navigate("/order-success");
    } else {
      navigate("/order-failure");
    }
  };

  const cartCount = getItemsCount();
  const subtotal = getSubtotal();
  const delivery = getDeliveryCost();
  const discount = promoCode?.discountAmount || 0;
  const total = getTotal();

  const isCheckoutLoading = checkoutStatus === "loading";

  // Sidebar / Modal Checkout Fields Content
  const CheckoutFieldsContent = () => (
    <div className="space-y-4">
      {/* Delivery Selector */}
      <div className="flex flex-col text-left">
        <label className="text-xs text-dark-muted font-bold mb-1 flex items-center space-x-1.5">
          <Truck size={14} className="text-primary" />
          <span>Delivery Option</span>
        </label>
        <select
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
          className="bg-bg-light border border-transparent rounded-xl py-2 px-3 text-sm font-semibold text-dark focus:outline-none focus:bg-white focus:border-primary/20 cursor-pointer"
        >
          <option value="Home Delivery ($2.00)">Home Delivery - $2.00 (1 hour)</option>
          <option value="Store Pickup (Free)">Store Pickup - Free (Collect in store)</option>
        </select>
      </div>

      {/* Payment Selector (Allows failure testing) */}
      <div className="flex flex-col text-left">
        <label className="text-xs text-dark-muted font-bold mb-1 flex items-center space-x-1.5">
          <CreditCard size={14} className="text-primary" />
          <span>Payment Option</span>
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="bg-bg-light border border-transparent rounded-xl py-2 px-3 text-sm font-semibold text-dark focus:outline-none focus:bg-white focus:border-primary/20 cursor-pointer"
        >
          <option value="Visa **** 4242">Visa ending 4242 (Succeeds)</option>
          <option value="Visa **** 9999 (Failing Card)">Visa ending 9999 (Fails for testing error)</option>
        </select>
      </div>

      {/* Promo Code Form */}
      <div className="flex flex-col text-left">
        <label className="text-xs text-dark-muted font-bold mb-1 flex items-center space-x-1.5">
          <Tag size={14} className="text-primary" />
          <span>Promo Code</span>
        </label>
        {promoCode ? (
          <div className="flex items-center justify-between bg-primary-soft text-primary font-bold px-3 py-2 rounded-xl text-xs">
            <span>Code Applied: {promoCode.code} (-${promoCode.discountAmount.toFixed(2)})</span>
            <button onClick={removePromoCode} className="text-dark hover:text-red-500 font-extrabold focus:outline-none">
              <X size={14} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex space-x-2">
            <input
              type="text"
              placeholder="e.g. NECTAR10"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoError("");
              }}
              className="flex-1 bg-bg-light border border-transparent rounded-xl py-2 px-3 text-xs text-dark focus:outline-none focus:bg-white focus:border-primary/20 placeholder-gray-300 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-colors focus:outline-none"
            >
              Apply
            </button>
          </form>
        )}
        {promoError && (
          <span className="text-[10px] text-red-500 font-bold mt-1 animate-shake">{promoError}</span>
        )}
        <span className="text-[10px] text-dark-muted font-semibold mt-1">Hint: Use codes NECTAR10 or FREESHIP</span>
      </div>

      {/* Cost Calculations */}
      <div className="pt-4 border-t border-gray-100 space-y-2 text-xs font-semibold text-dark-muted">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-dark">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-dark">${delivery.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-primary font-bold">
            <span>Discount Applied</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-extrabold text-dark pt-2 border-t border-dashed border-gray-100">
          <span>Total Cost</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-[10px] text-dark-muted text-left leading-relaxed font-semibold">
        By placing an order you agree to our{" "}
        <span className="text-primary hover:underline cursor-pointer">Terms And Conditions</span>.
      </p>
    </div>
  );

  return (
    <div className="w-full bg-white px-4 md:px-6 pt-4 pb-6 select-none animate-fade-in relative flex-1 flex flex-col">
      {/* Title */}
      <h1 className="text-xl font-bold text-center text-dark mb-6 [.desktop-layout-active_&]:hidden">
        My Cart
      </h1>

      <h1 className="hidden [.desktop-layout-active_&]:block text-2xl font-extrabold text-left text-dark mb-6 tracking-tight">
        Shopping Cart
      </h1>

      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="w-24 h-24 bg-primary-soft rounded-full flex items-center justify-center text-primary mb-4 border border-primary/15">
            <ShoppingBag size={42} />
          </div>
          <h2 className="text-lg font-bold text-dark mb-1">Your cart is empty</h2>
          <p className="text-xs text-dark-muted max-w-[220px] mx-auto leading-relaxed">
            Add items to your cart to see them here. Explore our organic categories!
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-6 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-2xl shadow transition-colors focus:outline-none"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        /* Grid Container (Split on Desktop, stacked on Mobile) */
        <div className="grid grid-cols-1 [.desktop-layout-active_&]:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Cart Items Lists (2/3 width on Desktop) */}
          <div className="[.desktop-layout-active_&]:col-span-2 space-y-4 max-h-[440px] overflow-y-auto no-scrollbar [.desktop-layout-active_&]:max-h-none pr-1">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center space-x-4 border-b border-gray-100 pb-4 relative group animate-fade-in"
              >
                {/* Item Image */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-bg-light/30 border border-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                  />
                </div>

                {/* Info & Quantity controls */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between text-left">
                  <div className="max-w-[170px] md:max-w-[200px]">
                    <h3 className="font-bold text-dark text-sm leading-tight line-clamp-1">{item.product.name}</h3>
                    <span className="text-[10px] text-dark-muted block mt-0.5">{item.product.unit}</span>
                  </div>

                  {/* Quantity adjustment */}
                  <div className="flex items-center space-x-3 mt-2 md:mt-0">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 md:w-8 md:h-8 border border-gray-200 rounded-xl flex items-center justify-center text-dark-muted hover:border-primary hover:text-primary transition-colors active:scale-95 focus:outline-none"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-sm text-dark w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 md:w-8 md:h-8 border border-gray-200 rounded-xl flex items-center justify-center text-primary hover:border-primary active:scale-95 focus:outline-none"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Price and Remove Button */}
                <div className="flex flex-col items-end justify-between h-16 md:h-20 pl-2">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-dark-muted hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <X size={15} />
                  </button>
                  <span className="font-extrabold text-sm text-dark">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Summary Checkout Card (Desktop Only - 1/3 width) */}
          <aside className="hidden [.desktop-layout-active_&]:block bg-white border border-gray-100 p-6 rounded-2xl sticky top-24 shadow-sm animate-fade-in">
            <h2 className="font-extrabold text-lg text-dark mb-4 pb-2 border-b border-gray-50 flex items-center justify-between">
              <span>Checkout Summary</span>
              <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">
                {cartCount} Items
              </span>
            </h2>
            <CheckoutFieldsContent />
            <button
              onClick={handlePlaceOrder}
              disabled={isCheckoutLoading}
              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-2xl shadow-lg transition-all duration-300 mt-6 active:scale-98 focus:outline-none flex items-center justify-center space-x-2 text-sm"
            >
              {isCheckoutLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <span>Place Order (${total.toFixed(2)})</span>
              )}
            </button>
          </aside>

        </div>
      )}

      {/* Mobile Sticky Go to Checkout Trigger Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-[76px] left-0 right-0 p-4 bg-white/85 backdrop-blur-md border-t border-gray-100 z-30 shrink-0 [.desktop-layout-active_&]:hidden">
          <button
            onClick={() => setCheckoutModalOpen(true)}
            className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-2xl shadow-lg transition-all duration-300 active:scale-98 focus:outline-none flex items-center justify-between px-6 text-sm"
          >
            <span>Go to Checkout</span>
            <span className="bg-primary-dark text-[11px] font-extrabold px-2 py-1 rounded-lg">
              ${total.toFixed(2)}
            </span>
          </button>
        </div>
      )}

      {/* Mobile Slide-up Checkout Bottom Sheet Modal */}
      {isCheckoutModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 animate-fade-in flex items-end justify-center [.desktop-layout-active_&]:hidden"
          onClick={() => setCheckoutModalOpen(false)}
        >
          {/* Modal Card body */}
          <div
            className="w-full max-h-[90vh] bg-white rounded-t-[30px] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <h2 className="text-lg font-extrabold text-dark">Checkout</h2>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="p-1 text-dark-muted hover:text-dark focus:outline-none"
              >
                <X size={22} />
              </button>
            </div>

            {/* Fields Content */}
            <div className="flex-1 pb-6">
              <CheckoutFieldsContent />
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={isCheckoutLoading}
              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-2xl shadow-lg transition-all duration-300 active:scale-98 focus:outline-none flex items-center justify-center space-x-2 text-sm"
            >
              {isCheckoutLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Placing Order...</span>
                </>
              ) : (
                <span>Place Order</span>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
