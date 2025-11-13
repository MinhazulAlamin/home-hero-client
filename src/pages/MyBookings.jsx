import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [rating, setRating] = useState("");
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const bookingsRes = await fetch(
          `https://home-hero-api-server.vercel.app/bookings?userEmail=${user.email}`
        );
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);

        const servicesRes = await fetch("https://home-hero-api-server.vercel.app/services");
        const servicesData = await servicesRes.json();
        setServices(servicesData);
      } catch {
        toast.error("Failed to load bookings or services");
      } finally {
        setLoading(false); // stop spinner
      }
    };

    fetchData();
  }, [user?.email]);

  const getUserRating = (serviceId) => {
    const service = services.find((s) => s._id === serviceId);
    const review = service?.reviews?.find((r) => r.userId === user?.uid);
    return review?.rating || null;
  };

  const handleRatingSubmit = async (e, serviceId) => {
    e.preventDefault();
    if (!user?.uid) return toast.error("You must be logged in to rate.");

    setSubmitting(true);

    const review = {
      userId: user.uid,
      userName: user.displayName,
      rating: parseFloat(rating),
    };

    try {
      const res = await fetch(
        `https://home-hero-api-server.vercel.app/services/${serviceId}/review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review),
        }
      );

      if (res.ok) {
        const updated = await fetch("https://home-hero-api-server.vercel.app/services").then(
          (res) => res.json()
        );
        setServices(updated);
        setRating("");

        Swal.fire({
          icon: "success",
          title: "Rated!",
          text: "Your rating has been submitted.",
          confirmButtonColor: "#2563eb",
        });

        setTimeout(() => setActiveServiceId(null), 0);
      } else {
        toast.error("Failed to submit rating");
      }
    } catch (error) {
      toast.error("Error submitting rating");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (bookingId) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://home-hero-api-server.vercel.app/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Booking cancelled");
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      toast.error("Error cancelling booking");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {" "}
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>{" "}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          {" "}
          <table className="table w-full border">
            {" "}
            <thead className="bg-gray-100">
              {" "}
              <tr>
                {" "}
                <th>#</th> <th>Service</th> <th>Price</th> <th>Date</th>{" "}
                <th>Your Rating</th> <th>Actions</th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {bookings.map((booking, index) => {
                const userRating = getUserRating(booking.serviceId);
                return (
                  <>
                    {" "}
                    <tr key={booking._id}>
                      {" "}
                      <td>{index + 1}</td> <td>{booking.serviceName}</td>{" "}
                      <td>৳{booking.price}</td> <td>{booking.bookingDate}</td>{" "}
                      <td>
                        {" "}
                        {userRating ? (
                          <span className="text-yellow-500 font-medium">
                            ⭐ {userRating}
                          </span>
                        ) : (
                          <span className="text-gray-400">Not rated</span>
                        )}{" "}
                      </td>{" "}
                      <td className="space-x-2">
                        {" "}
                        {userRating ? (
                          <span className="text-green-600 font-medium">
                            ✅ Rated
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              setActiveServiceId(booking.serviceId)
                            }
                            className="btn btn-sm btn-primary"
                          >
                            {" "}
                            Rate{" "}
                          </button>
                        )}{" "}
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="btn btn-sm btn-error"
                        >
                          {" "}
                          Cancel{" "}
                        </button>{" "}
                      </td>{" "}
                    </tr>
                    {activeServiceId === booking.serviceId && (
                      <tr>
                        <td colSpan="6" className="bg-gray-50 p-4">
                          <form
                            onSubmit={(e) =>
                              handleRatingSubmit(e, booking.serviceId)
                            }
                            className="flex flex-col md:flex-row gap-4 items-center"
                          >
                            <input
                              type="number"
                              min="1"
                              max="5"
                              step="0.5"
                              placeholder="⭐ Your rating (1-5)"
                              required
                              className="input input-bordered w-full md:w-40"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            />
                            <button type="submit" className="btn btn-success">
                              Submit Rating
                            </button>
                          </form>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default MyBookings;
