import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { SkeletonGrid } from "../components/Loading";
import ErrorState from "../components/ErrorState";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const activeCategory = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "newest";

  const loadCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch { /* non-critical */ }
  };

  const loadProducts = async () => {
    setStatus("loading");
    try {
      const params = { sort };
      if (search) params.search = search;
      if (activeCategory !== "All") params.category = activeCategory;
      const { data } = await api.get("/products", { params });
      setProducts(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { loadCategories(); }, []);
  useEffect(() => { loadProducts(); }, [activeCategory, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = Object.fromEntries(searchParams);
    setSearchParams({ ...params, search });
    loadProducts();
  };

  const setCategory = (id) => {
    const params = Object.fromEntries(searchParams);
    if (id === "All") delete params.category; else params.category = id;
    setSearchParams(params);
  };

  const setSort = (value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), sort: value });
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
      <div className="mb-10">
        <p className="text-cinnamon-500 font-medium mb-2">Our Menu</p>
        <h1 className="font-display text-4xl text-espresso-800">Everything we make, made fresh.</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-sm">
          <HiOutlineSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-espresso-400 w-5 h-5" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu..."
            className="input-field pl-11"
          />
        </form>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input-field md:w-56"
        >
          {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 mb-10">
        <button
          onClick={() => setCategory("All")}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${
            activeCategory === "All" ? "bg-espresso-700 text-cream-50 border-espresso-700" : "border-espresso-200 text-espresso-600 hover:border-cinnamon-400"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c._id}
            onClick={() => setCategory(c._id)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${
              activeCategory === c._id ? "bg-espresso-700 text-cream-50 border-espresso-700" : "border-espresso-200 text-espresso-600 hover:border-cinnamon-400"
            }`}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {status === "loading" && <SkeletonGrid count={8} />}
      {status === "error" && <ErrorState message="Unable to load the menu right now." onRetry={loadProducts} />}
      {status === "ready" && products.length === 0 && (
        <p className="text-center text-espresso-500 py-16">No items match your search. Try a different keyword or category.</p>
      )}
      {status === "ready" && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Menu;
