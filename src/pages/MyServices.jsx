import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  // Fetch provider's services
  useEffect(() => {
    fetch(`http://localhost:3000/services/provider/${user.email}`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => toast.error("Failed to load services"));
  }, [user.email]);

  // Delete service
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this service?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/services/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Service deleted");
        setServices((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      toast.error("Error deleting service");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">My Services</h2>
      {services.length === 0 ? (
        <p className="text-gray-500">No services found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>{service.name}</td>
                  <td>{service.category}</td>
                  <td>${service.price}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/edit-service/${service._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyServices;