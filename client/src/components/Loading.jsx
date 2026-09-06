const Loading = ({ label = "Loading menu..." }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3 text-espresso-500">
    <div className="w-10 h-10 border-4 border-espresso-200 border-t-cinnamon-500 rounded-full animate-spin" />
    <p className="text-sm">{label}</p>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-2xl overflow-hidden border border-espresso-100">
        <div className="skeleton aspect-[4/3] rounded-none" />
        <div className="p-4 space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-8 w-full mt-2" />
        </div>
      </div>
    ))}
  </div>
);

export default Loading;
