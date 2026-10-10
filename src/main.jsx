import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { Layout } from "./components/Layout";
import { AccountPage, AuthPage } from "./pages/AuthPages";
import {
  CartPage,
  FavoritesPage,
  HomePage,
  ProductDetailsPage,
  ShopPage,
} from "./pages/StorePages";
import { CheckoutPage } from "./pages/CheckoutPages";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./styles.css";

function SimplePage({ title, children }) {
  return (
    <div className="page simple">
      <div className="crumb">Home / {title}</div>
      <h1>{title}</h1>
      {children || (
        <p>
          Welcome to Exclusive. Discover carefully selected products, honest
          value, and a shopping experience built around you.
        </p>
      )}
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="page">
      <div className="empty">
        <div>404</div>
        <h2>Page not found</h2>
        <Link className="red-btn" to="/">
          Return home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage register />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </StoreProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
