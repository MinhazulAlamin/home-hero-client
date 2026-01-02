import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ services: 0, bookings: 0, rating: 0 });
  const [bookingsData, setBookingsData] = useState([]);
  const [servicesByCategory, setServicesByCategory] = useState([]);
  const [recentServices, setRecentServices] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    // Fetch stats + chart data
    fetch(`https://home-hero-api-server.vercel.app/dashboard/stats?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setStats({
          services: data.services,
          bookings: data.bookings,
          rating: data.rating
        });
        setBookingsData(data.bookingsPerMonth || []);
        setServicesByCategory(data.servicesByCategory || []);
      })
      .catch(err => console.error("Stats fetch error:", err));

    // Fetch recent services
    fetch(`https://home-hero-api-server.vercel.app/services/provider/${user.email}`)
      .then(res => res.json())
      .then(data => setRecentServices(data.slice(0, 5)))
      .catch(err => console.error("Services fetch error:", err));
  }, [user]);

  const COLORS = ["#f87171", "#34d399", "#60a5fa", "#fbbf24", "#a78bfa"];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="font-semibold">Total Services</h3>
          <p className="text-3xl">{stats.services}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="font-semibold">Total Bookings</h3>
          <p className="text-3xl">{stats.bookings}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="font-semibold">Average Rating</h3>
          <p className="text-3xl">{stats.rating}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="font-semibold mb-4">Bookings per Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="font-semibold mb-4">Services by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={servicesByCategory}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {servicesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="card bg-base-100 shadow-md p-6">
        <h3 className="font-semibold mb-4">Recent Services</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {recentServices.length > 0 ? (
                recentServices.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.category}</td>
                    <td>${s.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center opacity-70">
                    No recent services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
