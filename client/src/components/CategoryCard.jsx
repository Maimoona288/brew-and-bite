import { Link } from "react-router-dom";

const CategoryCard = ({ category, active }) => (
  <Link
    to={`/menu?category=${category._id}`}
    className={`flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border transition-colors min-w-[110px] ${
      active
        ? "bg-espresso-700 border-espresso-700 text-cream-50"
        : "bg-white border-espresso-100 text-espresso-700 hover:border-cinnamon-400"
    }`}
  >
    <span className="text-2xl">{category.icon}</span>
    <span className="text-sm font-medium">{category.name}</span>
  </Link>
);

export default CategoryCard;
