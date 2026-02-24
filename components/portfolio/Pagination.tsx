export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-4 mt-20">

      <button className="px-4 py-2 text-sm text-slate-600 hover:text-blue-600">
        Previous
      </button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className={`w-10 h-10 rounded-xl ${
            page === 2
              ? "bg-blue-600 text-white"
              : "bg-white border border-slate-200 text-slate-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button className="px-4 py-2 text-sm text-slate-600 hover:text-blue-600">
        Next
      </button>

    </div>
  );
}