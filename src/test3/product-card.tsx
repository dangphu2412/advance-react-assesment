export default function ProductCard({ data }: { data: Product[] }) {
  return (
    <div className="col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.length === 0 ? (
        <p className="col-span-full text-gray-500">No products found 👀</p>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <div className="h-32 bg-gray-100 flex items-center justify-center rounded mb-3">
              <span className="text-gray-400">Image</span>
            </div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="text-blue-600 font-bold mt-2">${item.price}</p>
            <p className="text-xs text-gray-400">For ages {item.age}+</p>
          </div>
        ))
      )}
    </div>
  );
}
