export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-gray-500 text-sm uppercase">Total Products</h3>
          <p className="text-4xl font-bold">--</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-gray-500 text-sm uppercase">In Stock</h3>
          <p className="text-4xl font-bold">--</p>
        </div>
      </div>
    </div>
  )
}