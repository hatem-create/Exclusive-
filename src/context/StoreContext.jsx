import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/products";
import { translations } from "../data/translations";

const StoreContext = createContext(null);
const MAX_CART_QUANTITY = 99;
const COUPON_CODE = "EXCLUSIVE10";
const COUPON_DISCOUNT_RATE = 0.1;

function readStorage(key, fallback, isValid) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return isValid(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

const isCart = (value) =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      Number.isFinite(item?.id) &&
      Number.isFinite(item?.price) &&
      Number.isFinite(item?.qty),
  );
const isFavorites = (value) =>
  Array.isArray(value) && value.every(Number.isFinite);
const isUser = (value) =>
  value === null ||
  (typeof value?.name === "string" && typeof value?.email === "string");
const isReviews = (value) =>
  Array.isArray(value) &&
  value.every(
    (review) =>
      Number.isFinite(review?.productId) &&
      typeof review?.message === "string" &&
      typeof review?.author === "string",
  );
const isCoupon = (value) => value === null || value === COUPON_CODE;

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("cart", [], isCart));
  const [favorites, setFavorites] = useState(() =>
    readStorage("favs", [], isFavorites),
  );
  const [user, setUser] = useState(() => readStorage("user", null, isUser));
  const [reviews, setReviews] = useState(() =>
    readStorage("reviews", [], isReviews),
  );
  const [coupon, setCoupon] = useState(() =>
    readStorage("coupon", null, isCoupon),
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("lang") || "en",
  );

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  useEffect(
    () => localStorage.setItem("favs", JSON.stringify(favorites)),
    [favorites],
  );
  useEffect(
    () => localStorage.setItem("reviews", JSON.stringify(reviews)),
    [reviews],
  );
  useEffect(
    () =>
      coupon
        ? localStorage.setItem("coupon", JSON.stringify(coupon))
        : localStorage.removeItem("coupon"),
    [coupon],
  );
  useEffect(
    () =>
      user
        ? localStorage.setItem("user", JSON.stringify(user))
        : localStorage.removeItem("user"),
    [user],
  );
  useEffect(() => {
    localStorage.setItem("lang", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const actions = useMemo(
    () => ({
      addToCart(product, quantity = 1) {
        const safeQuantity = Math.min(
          MAX_CART_QUANTITY,
          Math.max(1, Number(quantity) || 1),
        );
        setCart((items) =>
          items.some((item) => item.id === product.id)
            ? items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      qty: Math.min(MAX_CART_QUANTITY, item.qty + safeQuantity),
                    }
                  : item,
              )
            : [...items, { ...product, qty: safeQuantity }],
        );
      },
      removeFromCart(id) {
        setCart((items) => items.filter((item) => item.id !== id));
      },
      updateCartQuantity(id, quantity) {
        setCart((items) =>
          items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  qty: Math.min(
                    MAX_CART_QUANTITY,
                    Math.max(1, Number(quantity) || 1),
                  ),
                }
              : item,
          ),
        );
      },
      toggleFavorite(id) {
        setFavorites((ids) =>
          ids.includes(id)
            ? ids.filter((itemId) => itemId !== id)
            : [...ids, id],
        );
      },
      submitReview(productId, message) {
        const cleanMessage = message.trim();
        if (cleanMessage.length < 3) return false;
        setReviews((items) => [
          ...items,
          {
            id: Date.now(),
            productId,
            message: cleanMessage,
            author: user?.name || "Guest",
          },
        ]);
        return true;
      },
      applyCoupon(code) {
        if (code.trim().toUpperCase() !== COUPON_CODE) return false;
        setCoupon(COUPON_CODE);
        return true;
      },
      removeCoupon() {
        setCoupon(null);
      },
      cartSubtotal: () =>
        cart.reduce((total, item) => total + item.price * item.qty, 0),
      discountAmount: () =>
        coupon
          ? cart.reduce((total, item) => total + item.price * item.qty, 0) *
            COUPON_DISCOUNT_RATE
          : 0,
      cartTotal: () => {
        const subtotal = cart.reduce(
          (total, item) => total + item.price * item.qty,
          0,
        );
        return subtotal - (coupon ? subtotal * COUPON_DISCOUNT_RATE : 0);
      },
    }),
    [cart, coupon, user],
  );

  const value = {
    ...actions,
    cart,
    setCart,
    favorites,
    user,
    setUser,
    reviews,
    coupon,
    language,
    setLanguage,
    products,
    t: translations[language],
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
