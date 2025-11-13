import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`https://home-hero-api-server.vercel.app/services/provider/${user.email}`)
    .then((res) => res.json())
    .then((data) => {
      setServices(data);
      setLoading(false)
    })
    .catch(() => {
      toast.error("Failed to load services");
      setLoading(false);
    });
}, [user.email]);

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This service will be permanently deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(
      `https://home-hero-api-server.vercel.app/services/${id}?providerEmail=${user.email}`,
      { method: 'DELETE' }
    );

    if (res.ok) {
      toast.success('Service deleted');
      setServices((prev) => prev.filter((s) => s._id !== id));
    } else {
      toast.error('Failed to delete service');
    }
  } catch (error) {
    toast.error('Error deleting service');
  }
};

if (loading) return <Spinner />;

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
