import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="max-w-md mx-auto px-5 py-32 text-center">
    <p className="text-6xl mb-4">☕</p>
    <h1 className="font-display text-3xl text-espresso-800 mb-3">Page not found</h1>
    <p className="text-espresso-500 mb-8">This page must have stepped out for a coffee break.</p>
    <Link to="/" className="btn-primary">Back to Home</Link>
  </div>
);

export default NotFound;
