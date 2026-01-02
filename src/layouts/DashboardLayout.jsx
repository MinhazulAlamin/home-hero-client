import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-md">
        <div className="p-4 text-xl font-bold">Dashboard</div>
        <ul className="menu p-2">
          <li><Link to="/" className="btn btn-outline w-full">Back to Home</Link></li>
          <li><Link to="/dashboard">Overview</Link></li>
          <li><Link to="/dashboard/my-services">My Services</Link></li>
          <li><Link to="/dashboard/my-bookings">My Bookings</Link></li>
          <li><Link to="/dashboard/add-service">Add Service</Link></li>
          <li><Link to="/dashboard/profile">Profile</Link></li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <nav className="navbar bg-base-100 shadow-md px-4">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              HomeHero
            </Link>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "https://source.unsplash.com/40x40/?user"}
                    alt="profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li><Link to="/dashboard/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard Home</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Nested page content */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
