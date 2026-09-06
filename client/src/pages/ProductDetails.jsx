import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HiStar, HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState("loading");
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewMsg, setReviewMsg] = useState("");

  const load = async () => {
    setStatus("loading");
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { load(); window.scrollTo(0, 0); }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewMsg("");
    try {
      await api.post(`/products/${id}/reviews`, reviewForm);
      setReviewMsg("Thanks! Your review has been added.");
      setReviewForm({ rating: 5, comment: "" });
      load();
    } catch (err) {
      setReviewMsg(err.response?.data?.message || "Unable to submit your review. Please try again.");
    }
  };

  if (status === "loading") return <Loading />;
  if (status === "error" || !product) return <ErrorState message="This item could not be found." onRetry={load} />;

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
      <Link to="/menu" className="text-sm text-cinnamon-600 hover:underline">← Back to menu</Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div className="rounded-3xl overflow-hidden shadow-soft">
          <img src={product.image} alt={product.name} className="w-full h-[420px] object-cover" />
        </div>

        <div>
          <h1 className="font-display text-4xl text-espresso-800 mb-2">{product.name}</h1>
          <div className="flex items-center gap-1 text-sm text-espresso-500 mb-4">
            <HiStar className="text-gold-500 w-4 h-4" />
            <span>{product.rating?.toFixed(1) || "New"}</span>
            <span>({product.numReviews} reviews)</span>
          </div>
          <p className="text-espresso-600 leading-relaxed mb-6">{product.description}</p>

          {product.ingredients?.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-espresso-800 mb-2">Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="text-xs bg-cream-100 text-espresso-600 px-3 py-1 rounded-full">{ing}</span>
                ))}
              </div>
            </div>
          )}

          <p className="text-3xl font-semibold text-cinnamon-600 mb-6">Rs  { product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-espresso-200 rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 text-espresso-600"><HiOutlineMinus /></button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 text-espresso-600"><HiOutlinePlus /></button>
            </div>
            <button
              onClick={() => addToCart(product, qty)}
              disabled={!product.available}
              className="btn-primary flex-1"
            >
              {product.available ? "Add to Cart" : "Currently Unavailable"}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16 max-w-2xl">
        <h2 className="font-display text-2xl text-espresso-800 mb-6">Customer Reviews</h2>
        <div className="space-y-4 mb-8">
          {product.reviews?.length === 0 && <p className="text-espresso-500 text-sm">No reviews yet — be the first to share your experience.</p>}
          {product.reviews?.slice().reverse().map((r) => (
            <div key={r._id} className="border border-espresso-100 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-espresso-800">{r.name}</p>
                <div className="flex text-gold-500 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => <HiStar key={i} className={i < r.rating ? "opacity-100" : "opacity-20"} />)}
                </div>
              </div>
              <p className="text-espresso-600 text-sm">{r.comment}</p>
            </div>
          ))}
        </div>

        {user ? (
          <form onSubmit={submitReview} className="border border-espresso-100 rounded-2xl p-5 space-y-3">
            <p className="font-semibold text-espresso-800">Leave a review</p>
            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
              className="input-field"
            >
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
            </select>
            <textarea
              required
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              placeholder="Share your experience..."
              rows={3}
              className="input-field"
            />
            <button className="btn-primary !py-2">Submit Review</button>
            {reviewMsg && <p className="text-sm text-cinnamon-600">{reviewMsg}</p>}
          </form>
        ) : (
          <p className="text-sm text-espresso-500">
            <Link to="/login" className="text-cinnamon-600 hover:underline">Sign in</Link> to leave a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
