import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiStar, HiOutlineSparkles, HiOutlineClock, HiOutlineHeart } from "react-icons/hi";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { SkeletonGrid } from "../components/Loading";
import ErrorState from "../components/ErrorState";

const features = [
  { icon: <HiOutlineSparkles className="w-6 h-6" />, title: "Fresh Ingredients", text: "Sourced daily from local roasters and farms." },
  { icon: <HiOutlineClock className="w-6 h-6" />, title: "Fast Service", text: "Your order, ready in minutes, not excuses." },
  { icon: <HiOutlineHeart className="w-6 h-6" />, title: "Made With Care", text: "Every cup and plate, done properly." },
];

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [popular, setPopular] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const [catsRes, prodRes, reviewsRes] = await Promise.all([
        api.get("/categories"),
        api.get("/products", { params: { featured: "true" } }),
        api.get("/reviews"),
      ]);
      setCategories(catsRes.data);
      setPopular(prodRes.data.slice(0, 4));
      setReviews(reviewsRes.data.slice(0, 3));
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-espresso-800">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
          <div className="relative z-10">
            <p className="text-gold-400 tracking-wide font-medium mb-4">Downtown's neighborhood coffee house</p>
            <h1 className="font-display text-4xl md:text-6xl text-cream-50 leading-[1.05] mb-6">
              Fresh coffee.<br />Honest food.<br />Good moments.
            </h1>
            <p className="text-cream-200/80 text-lg mb-8 max-w-md">
              From a slow morning cappuccino to a Friday night pizza run — Brew & Bite is where the neighborhood gathers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="btn-primary bg-gold-500 text-espresso-900 hover:bg-gold-400">
                Explore Menu
              </Link>
              <Link to="/reservation" className="btn-secondary !border-cream-100 !text-cream-50 hover:!bg-cream-50 hover:!text-espresso-800">
                Reserve a Table
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1000"
                alt="Barista preparing coffee"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-cream-50 rounded-2xl shadow-xl p-4 flex items-center gap-3 w-56">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200" className="w-14 h-14 rounded-xl object-cover" alt="Latte art" />
              <div>
                <p className="text-sm font-semibold text-espresso-800">4.8 average rating</p>
                <p className="text-xs text-espresso-500">from 2,300+ orders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {/* <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <h2 className="font-display text-3xl text-espresso-800 mb-8">What are you craving?</h2>
        {status === "loading" && <div className="flex gap-4 overflow-x-auto pb-2">{Array.from({length:6}).map((_,i)=><div key={i} className="skeleton min-w-[110px] h-24" />)}</div>}
        {status === "error" && <ErrorState message="Unable to load categories." onRetry={load} />}
        {status === "ready" && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((c) => <CategoryCard key={c._id} category={c} />)}
          </div>
        )}
      </section> */}
      <section className="w-full px-5 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16">
  <div className="max-w-7xl mx-auto">
    <h2 className="font-display text-3xl md:text-4xl text-espresso-800 mb-8">
      What are you craving?
    </h2>

    {status === "loading" && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="skeleton w-full h-28 md:h-32 rounded-2xl"
          />
        ))}
      </div>
    )}

    {status === "error" && (
      <ErrorState
        message="Unable to load categories."
        onRetry={load}
      />
    )}

    {status === "ready" && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
        {categories.map((c) => (
          <CategoryCard key={c._id} category={c} />
        ))}
      </div>
    )}
  </div>
</section>

      {/* Popular items */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl text-espresso-800">Popular right now</h2>
          <Link to="/menu" className="text-cinnamon-600 font-medium hover:underline">View full menu →</Link>
        </div>
        {status === "loading" && <SkeletonGrid count={4} />}
        {status === "error" && <ErrorState message="Unable to load popular items." onRetry={load} />}
        {status === "ready" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {popular.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* Why choose us */}
      <section className="bg-cream-100 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-espresso-700 text-cream-50 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-display text-xl text-espresso-800 mb-2">{f.title}</h3>
              <p className="text-espresso-500 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
          <h2 className="font-display text-3xl text-espresso-800 mb-8">What our customers say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r._id} className="bg-white border border-espresso-100 rounded-2xl p-6 shadow-soft">
                <div className="flex gap-1 text-gold-500 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar key={i} className={i < r.rating ? "opacity-100" : "opacity-20"} />
                  ))}
                </div>
                <p className="text-espresso-600 mb-4">"{r.comment}"</p>
                <p className="font-semibold text-espresso-800">{r.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-espresso-800 text-cream-50 py-16 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-4">Ready for your next coffee?</h2>
        <p className="text-cream-200/80 mb-8">Order online for pickup or delivery — ready in minutes.</p>
        <Link to="/menu" className="btn-primary bg-gold-500 text-espresso-900 hover:bg-gold-400">Order Now</Link>
      </section>
    </div>
  );
};

export default Home;
