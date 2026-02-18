import CardItem from './CardItem';

export default function Cards({ items, loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-bg-alt rounded-xl border border-gray-200 overflow-hidden animate-pulse"
          >
            <div className="h-32 bg-gray-300" />
            <div className="p-5 space-y-2">
              <div className="h-5 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-600 font-medium">{error}</p>
        <p className="text-sm text-red-500 mt-1">Could not load courses. Please try again.</p>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="text-center py-12 bg-bg-alt rounded-xl border border-gray-200">
        <p className="text-gray-600">No courses available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <CardItem key={item._id} item={item} index={index} />
      ))}
    </div>
  );
}
