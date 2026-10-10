import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import appDownloadImage from "../../Frame 719.png";

export function Header() {
  const { t, cart, favorites, user, language, setLanguage } = useStore();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submitSearch = (event) => {
    event.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query)}`);
  };
  return (
    <>
      <div className="utility">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <b>ShopNow</b>
        <span>{language === "en" ? "English" : "العربية"}⌄</span>
      </div>
      <header>
        <Link className="logo" to="/">
          Exclusive
        </Link>
        <nav>
          <NavLink to="/">{t.home}</NavLink>
          <NavLink to="/shop">{t.shop}</NavLink>
          <NavLink to="/contact">{t.contact}</NavLink>
          <NavLink to="/about">{t.about}</NavLink>
        </nav>
        <div className="actions">
          <form onSubmit={submitSearch}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
            />
            <button aria-label="Search">⌕</button>
          </form>
          <button
            className="language"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          >
            {language === "en" ? "ع" : "EN"}
          </button>
          <Link to="/favorites">
            ♡<small>{favorites.length}</small>
          </Link>
          <Link to="/cart">
            🛒<small>{cart.reduce((total, item) => total + item.qty, 0)}</small>
          </Link>
          {user ? (
            <Link to="/account" className="avatar">
              {user.name?.[0] || "U"}
            </Link>
          ) : (
            <Link to="/login">♙</Link>
          )}
        </div>
      </header>
    </>
  );
}

export function Footer() {
  const { t } = useStore();
  return (
    <footer>
      <div>
        <h3>Exclusive</h3>
        <p>Subscribe</p>
        <small>Get 10% off your first order</small>
        <div className="subscribe">
          <input placeholder="Enter your email" />
          <button>→</button>
        </div>
      </div>
      <div>
        <h4>{t.contact}</h4>
        <p>
          111 Bijoy sarani, Dhaka,
          <br />
          DH 1515, Bangladesh.
        </p>
        <p>exclusive@email.com</p>
        <p>+88015-88888-9999</p>
      </div>
      <div>
        <h4>{t.account}</h4>
        <p>{t.account}</p>
        <p>
          {t.login} / {t.signup}
        </p>
        <p>{t.cart}</p>
        <p>{t.wishlist}</p>
      </div>
      <div>
        <h4>Quick Link</h4>
        <p>Privacy Policy</p>
        <p>Terms Of Use</p>
        <p>FAQ</p>
        <p>{t.contact}</p>
      </div>
      <div>
        <h4>Download App</h4>
        <small>Save $3 with App New User Only</small>
        <img
          className="footer-download-image"
          src={appDownloadImage}
          alt="Download the Exclusive app on Google Play or the App Store"
        />
        <div className="qr">▦</div>
      </div>
      <div className="copyright">
        © Copyright Exclusive 2022. All right reserved
      </div>
    </footer>
  );
}

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
export function Section({ eyebrow, title, action, children }) {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
