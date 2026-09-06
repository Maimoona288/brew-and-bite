import { Link } from "react-router-dom";
import { HiStar } from "react-icons/hi";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-espresso-100/60 flex flex-col">
      <Link to={`/menu/${product._id}`} className="relative block overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!product.available && (
          <span className="absolute top-3 left-3 bg-espresso-800/90 text-cream-50 text-xs px-3 py-1 rounded-full">
            Out of stock
          </span>
        )}
        {product.featured && product.available && (
          <span className="absolute top-3 left-3 bg-gold-500 text-espresso-900 text-xs font-semibold px-3 py-1 rounded-full">
            Popular
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/menu/${product._id}`}>
            <h3 className="font-display text-lg text-espresso-800 leading-snug">{product.name}</h3>
          </Link>
          <span className="font-semibold text-cinnamon-600 whitespace-nowrap">Rs. {product.price.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-espresso-400 mt-1">
          <HiStar className="text-gold-500 w-4 h-4" />
          <span>{product.rating?.toFixed(1) || "New"}</span>
          {product.numReviews > 0 && <span>({product.numReviews})</span>}
        </div>

        <p className="text-sm text-espresso-500 mt-2 line-clamp-2 flex-1">{product.description}</p>

        <button
          onClick={() => addToCart(product, 1)}
          disabled={!product.available}
          className="mt-4 btn-primary !py-2 text-sm w-full"
        >
          {product.available ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
