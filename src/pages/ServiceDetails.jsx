import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDate, setBookingDate] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch(() => toast.error("Failed to load service"));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const booking = {
      userEmail: user.email,
      serviceId: service._id,
      bookingDate,
      price: service.price,
    };

    try {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        toast.success("Booking confirmed!");
        setShowModal(false);
      } else {
        toast.error("Booking failed");
      }
    } catch (error) {
      toast.error("Error booking service");
    }
  };

  if (!service) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{service.name}</h2>
      <p className="text-sm text-gray-500">{service.category}</p>
      <p className="text-lg font-semibold text-primary mt-2">
        ৳{service.price}
      </p>
      <p className="mt-4">{service.description}</p>
      <p className="mt-6 text-sm text-gray-600">
        Provided by: {service.providerName} ({service.providerEmail})
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary mt-6"
      >
        Book Now
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Book: {service.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Price: ৳{service.price}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Your Email: {user.email}
            </p>

            <form onSubmit={handleBooking} className="space-y-4">
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-success w-full">
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn btn-outline w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
