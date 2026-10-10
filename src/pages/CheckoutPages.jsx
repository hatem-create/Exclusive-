import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function CheckoutPage() {
  const {
    cart,
    coupon,
    t,
    setCart,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    discountAmount,
    cartTotal,
  } = useStore();
  const [complete, setComplete] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const subtotal = cartSubtotal();
  const discount = discountAmount();
  const total = cartTotal();

  function handleCoupon(event) {
    event.preventDefault();
    if (applyCoupon(couponCode)) {
      setCouponMessage("Coupon applied: 10% off.");
      return;
    }
    setCouponMessage("Invalid coupon. Try EXCLUSIVE10.");
  }

  function handleCheckout(event) {
    event.preventDefault();
    setComplete(true);
    setCart([]);
    removeCoupon();
  }

  if (!cart.length && !complete) {
    return (
      <div className="page">
        <div className="empty">
          <div>🛒</div>
          <h2>{t.empty}</h2>
          <Link className="red-btn" to="/shop">
            {t.continue}
          </Link>
        </div>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="page success">
        <div>✓</div>
        <h1>{t.success}</h1>
        <p>{t.simulated}</p>
        <Link className="red-btn" to="/shop">
          {t.continue}
        </Link>
      </div>
    );
  }

  return (
    <div className="page checkout checkout-page">
      <section className="billing-details">
        <div className="crumb">Account / My Account / Product / View Cart / Checkout</div>
        <h1>Billing Details</h1>
        <form onSubmit={handleCheckout}>
          <label>
            First Name *
            <input required name="firstName" autoComplete="given-name" />
          </label>
          <label>
            Company Name
            <input name="company" autoComplete="organization" />
          </label>
          <label>
            Street Address *
            <input required name="address" autoComplete="street-address" />
          </label>
          <label>
            Apartment, floor, etc. (optional)
            <input name="apartment" autoComplete="address-line2" />
          </label>
          <label>
            Town/City *
            <input required name="city" autoComplete="address-level2" />
          </label>
          <label>
            Phone Number *
            <input required type="tel" name="phone" autoComplete="tel" />
          </label>
          <label>
            Email Address *
            <input required type="email" name="email" autoComplete="email" />
          </label>
          <label className="save-details">
            <input type="checkbox" defaultChecked />
            Save this information for faster check-out next time
          </label>
          <button className="red-btn checkout-place-order" type="submit">
            {t.place}
          </button>
        </form>
      </section>

      <aside className="checkout-summary">
        <div className="checkout-products">
          {cart.map((item) => (
            <div key={item.id} className="checkout-product">
              <span>
                <img src={item.image} alt="" />
                {item.name}
              </span>
              <b>${(item.price * item.qty).toFixed(2)}</b>
            </div>
          ))}
        </div>
        <p>
          {t.subtotal}
          <b>${subtotal.toFixed(2)}</b>
        </p>
        <p>
          Shipping
          <b>Free</b>
        </p>
        {coupon && (
          <p>
            Coupon ({coupon})
            <b>-${discount.toFixed(2)}</b>
            <button className="coupon-remove" onClick={removeCoupon}>
              Remove
            </button>
          </p>
        )}
        <p className="checkout-total">
          {t.total}
          <b>${total.toFixed(2)}</b>
        </p>

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            Bank
          </label>
          <div className="payment-brands" aria-label="Accepted payment methods">
            VISA　Mastercard　PayPal
          </div>
          <label>
            <input
              type="radio"
              name="payment"
              value="delivery"
              checked={paymentMethod === "delivery"}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            Cash on delivery
          </label>
        </div>

        <form className="checkout-coupon" onSubmit={handleCoupon}>
          <input
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            placeholder="Coupon Code"
            aria-label="Coupon code"
          />
          <button className="red-btn" type="submit">
            Apply Coupon
          </button>
        </form>
        {couponMessage && (
          <p className={coupon ? "coupon-success" : "coupon-error"}>
            {couponMessage}
          </p>
        )}
      </aside>
    </div>
  );
}
