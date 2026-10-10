import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Section } from "../components/Layout";
import { categories } from "../data/products";
import { useStore } from "../context/StoreContext";

const ProductGrid = ({ products }) => (
  <div className="grid">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
const Breadcrumb = ({ label }) => <div className="crumb">Home　/　{label}</div>;
export function EmptyState({ text }) {
  const { t } = useStore();
  return (
    <div className="empty">
      <div>♡</div>
      <h2>{text}</h2>
      <Link className="red-btn" to="/shop">
        {t.continue}
      </Link>
    </div>
  );
}

export function HomePage() {
  const { t, products } = useStore();
  return (
    <>
      <div className="hero">
        <aside>
          <b>Categories</b>
          {categories.map((category, index) => (
            <Link
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
            >
              {category}
              {index < 3 && <span>›</span>}
            </Link>
          ))}
        </aside>
        <div className="hero-banner">
          <div>
            <small>Apple iPhone Series</small>
            <h1>{t.hero}</h1>
            <Link to="/shop">{t.shopNow} →</Link>
          </div>
          <div className="phone">
            <img
              src="../hero_endframe__cvklg0xk3w6e_large 2.png"
              alt="hero_endframe"
              className="phone-img"
            />
          </div>
        </div>
      </div>
      <Section
        eyebrow={t.flash}
        title={t.flash}
        action={
          <Link className="round" to="/shop">
            ←　→
          </Link>
        }
      >
        <ProductGrid products={products.slice(0, 4)} />
      </Section>
      <Section eyebrow={t.browse} title={t.browse}>
        <div className="category-grid">
          {[
            "▯ Phones",
            "▤ Computers",
            "⌚ SmartWatch",
            "▱ Camera",
            "♧ HeadPhones",
            "⌑ Gaming",
          ].map((category) => (
            <Link to="/shop" key={category}>
              {category}
            </Link>
          ))}
        </div>
      </Section>
      <Section
        eyebrow={t.best}
        title={t.best}
        action={
          <Link className="red-btn" to="/shop">
            {t.viewAll}
          </Link>
        }
      >
        <ProductGrid products={products.slice(4, 8)} />
      </Section>
      <PromoBanner />
      <Section eyebrow={t.explore} title={t.explore}>
        <ProductGrid products={products.slice(0, 8)} />
        <div className="center">
          <Link className="red-btn" to="/shop">
            {t.viewAll}
          </Link>
        </div>
      </Section>
      <Benefits />
    </>
  );
}
function PromoBanner() {
  return (
    <div className="promo">
      <div>
        <span>Categories</span>
        <h2>
          Enhance Your
          <br />
          Music Experience
        </h2>
        <div className="countdown">
          <b>
            23<small>Hours</small>
          </b>
          <b>
            05<small>Days</small>
          </b>
          <b>
            59<small>Minutes</small>
          </b>
          <b>
            35<small>Seconds</small>
          </b>
        </div>
        <Link className="green-btn" to="/shop">
          Buy Now!
        </Link>
      </div>
      <div className="speaker">
        {" "}
        <img src="../Frame 694.png" alt="speaker" className="speaker" />
      </div>
    </div>
  );
}
function Benefits() {
  return (
    // <div className="benefits">
    //   {[
    //     [
    //       "◉",
    //       "FREE AND FAST DELIVERY",
    //       "Free delivery for all orders over $140",
    //     ],
    //     ["◉", "24/7 CUSTOMER SERVICE", "Friendly 24/7 customer support"],
    //     ["◉", "MONEY BACK GUARANTEE", "We return money within 30 days"],
    //   ].map(([icon, title, text]) => (
    //     <div key={title}>
    //       {icon}
    //       <b>{title}</b>
    //       <small>{text}</small>
    //     </div>
    //   ))}
    // </div>
    <section className="about-benefits">
      <div>
        ◉<b>FREE AND FAST DELIVERY</b>
        <small>Free delivery for all orders over $140</small>
      </div>
      <div>
        ◉<b>24/7 CUSTOMER SERVICE</b>
        <small>Friendly 24/7 customer support</small>
      </div>
      <div>
        ◉<b>MONEY BACK GUARANTEE</b>
        <small>We return money within 30 days</small>
      </div>
    </section>
  );
}

export function ShopPage() {
  const { t, products } = useStore();
  const query = new URLSearchParams(useLocation().search);
  const [category, setCategory] = useState(query.get("category") || "");
  const [sort, setSort] = useState("featured");
  const search = query.get("q")?.toLowerCase() || "";
  const filtered = products.filter(
    (product) =>
      (!category || product.category === category) &&
      product.name.toLowerCase().includes(search),
  );
  const visible =
    sort === "low" ? [...filtered].sort((a, b) => a.price - b.price) : filtered;
  return (
    <div className="page">
      <Breadcrumb label={t.shop} />
      <div className="shop-title">
        <div>
          <span className="eyebrow">{t.explore}</span>
          <h1>{t.shop}</h1>
        </div>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
        </select>
      </div>
      {visible.length ? (
        <ProductGrid products={visible} />
      ) : (
        <EmptyState text="No products found" />
      )}
    </div>
  );
}

export function ProductDetailsPage() {
  const { id } = useParams();
  const { products, t, addToCart, favorites, toggleFavorite } = useStore();
  const product = products.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  if (!product)
    return (
      <div className="page">
        <EmptyState text="Product not found" />
      </div>
    );
  return (
    <div className="page">
      <Breadcrumb label={`${product.category} / ${product.name}`} />
      <div className="detail">
        <div className="gallery">
          <div className="thumbs">
            {[1, 2, 3, 4].map((item) => (
              <img key={item} src={product.image} alt="" />
            ))}
          </div>
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="stars">
            ★★★★★{" "}
            <small>
              ({product.reviews} Reviews) | <span>In Stock</span>
            </small>
          </div>
          <h2>${product.price}.00</h2>
          <p>{product.desc}</p>
          <hr />
          <p>
            Colours:　
            <span className="color-dot" /> <span className="color-dot blue" />
          </p>
          <div className="buy-row">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              −
            </button>
            <b>{quantity}</b>
            <button onClick={() => setQuantity(Math.min(99, quantity + 1))}>
              +
            </button>
            <button
              className="red-btn"
              onClick={() => addToCart(product, quantity)}
            >
              {t.buy}
            </button>
            <button
              className={`heart ${favorites.includes(product.id) ? "active" : ""}`}
              onClick={() => toggleFavorite(product.id)}
            >
              ♡
            </button>
          </div>
          <div className="delivery">
            <b>▣　Free Delivery</b>
            <small>Enter your postal code for Delivery Availability</small>
            <b>↻　Return Delivery</b>
            <small>Free 30 Days Delivery Returns.</small>
          </div>
        </div>
      </div>
      <Section eyebrow="Related Items" title="You may also like">
        <ProductGrid products={products.slice(0, 4)} />
      </Section>
      <ReviewForm productId={product.id} />
    </div>
  );
}
function ReviewForm({ productId }) {
  const { t, reviews, submitReview } = useStore();
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const productReviews = reviews.filter((item) => item.productId === productId);
  const saveReview = () => {
    if (!submitReview(productId, review)) {
      setError("Please enter at least 3 characters.");
      return;
    }
    setReview("");
    setError("");
  };
  return (
    <div className="review-box">
      <h2>{t.review}</h2>
      <div className="stars">★★★★★</div>
      <textarea
        value={review}
        onChange={(event) => setReview(event.target.value)}
        placeholder="Share your experience..."
      />
      {error && <p className="error">{error}</p>}
      <button className="red-btn" onClick={saveReview}>
        {t.save}
      </button>
      {productReviews.map((item) => (
        <p key={item.id}>
          <b>{item.author}:</b> {item.message}
        </p>
      ))}
    </div>
  );
}
export function FavoritesPage() {
  const { favorites, products, t } = useStore();
  const list = products.filter((product) => favorites.includes(product.id));
  return (
    <div className="page">
      <h1>{t.wishlist}</h1>
      {list.length ? (
        <ProductGrid products={list} />
      ) : (
        <EmptyState text="Your wishlist is empty" />
      )}
    </div>
  );
}
export function CartPage() {
  const {
    cart,
    t,
    coupon,
    updateCartQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    discountAmount,
    cartTotal,
  } = useStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  if (!cart.length)
    return (
      <div className="page">
        <EmptyState text={t.empty} />
      </div>
    );
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

  return (
    <div className="page">
      <Breadcrumb label={t.cart} />
      <h1>{t.cart}</h1>
      <div className="cart-layout">
        <div className="cart-list">
          <div className="cart-row headings">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <span className="cart-product">
                <img src={item.image} alt="" />
                {item.name}
              </span>
              <span>${item.price}</span>
              <span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.qty - 1)}
                >
                  −
                </button>
                {item.qty}
                <button
                  onClick={() => updateCartQuantity(item.id, item.qty + 1)}
                >
                  +
                </button>
              </span>
              <span>
                ${item.price * item.qty}
                <button
                  className="remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </span>
            </div>
          ))}
          <Link className="outline-btn" to="/shop">
            {t.continue}
          </Link>
          <form className="coupon-form" onSubmit={handleCoupon}>
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
        </div>
        <aside className="summary">
          <h2>Cart Total</h2>
          <p>
            {t.subtotal}
            <b>${subtotal.toFixed(2)}</b>
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
          <p>
            Shipping<b>Free</b>
          </p>
          <hr />
          <p>
            {t.total}
            <b>${total.toFixed(2)}</b>
          </p>
          <Link className="red-btn full" to="/checkout">
            {t.checkout}
          </Link>
        </aside>
      </div>
    </div>
  );
}
