import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { t, addToCart, favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(product.id);
  return (
    <article className="card">
      <div className="product-image" style={{ "--bg": product.color }}>
        <img src={product.image} alt={product.name} />
        {product.discount && <b className="badge">{product.discount}</b>}
        <div className="card-tools">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={isFavorite ? "active" : ""}
            aria-label="Toggle favorite"
          >
            ♡
          </button>
          <Link
            to={`/product/${product.id}`}
            aria-label={`View ${product.name}`}
          >
            ◉
          </Link>
        </div>
        <button className="add" onClick={() => addToCart(product)}>
          {t.add}
        </button>
      </div>
      <Link to={`/product/${product.id}`} className="product-name">
        {product.name}
      </Link>
      <div>
        <strong>${product.price}</strong> <del>${product.old}</del>
      </div>
      <div className="stars">
        ★★★★★ <small>({product.reviews})</small>
      </div>
    </article>
  );
}
