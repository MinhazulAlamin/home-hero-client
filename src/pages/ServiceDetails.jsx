import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [service, setService] = useState(null);
  const [comment, setComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Load service details
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);

        if (user?.uid) {
          const reviewed = data.reviews?.some(
            (r) => r.userId === user.uid && r.comment
          );
          setHasReviewed(reviewed);
        }

        const ownerCheck = user?.email === data?.providerEmail;
        setIsOwner(ownerCheck);
      })
      .catch(() => toast.error("Failed to load service"));

    // Check booking status for current user
    if (!user?.email || !id) return;

    fetch(`http://localhost:3000/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((bookings) => {
        if (Array.isArray(bookings)) {
          const booked = bookings.some(
            (b) => b.serviceId?.toString() === id && b.email === user.email
          );
          setHasBooked(booked);
        } else {
          setHasBooked(false);
        }
      })
      .catch((err) => {
        console.error("Booking check failed:", err);
        setHasBooked(false);
      });
  }, [id, user?.uid, user?.email]);

  // Auto-fill booking date when modal opens
  useEffect(() => {
    const modal = document.getElementById("booking-modal");
    if (!modal) return;

    const handleModalToggle = () => {
      if (modal.checked) {
        const today = new Date().toISOString().split("T")[0];
        setBookingDate(today);
      }
    };

    modal.addEventListener("change", handleModalToggle);
    return () => modal.removeEventListener("change", handleModalToggle);
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to book.");
      return;
    }

    if (isOwner) {
      toast.error("You can't book your own service.");
      return;
    }

    if (!bookingDate) {
      toast.error("Please select a booking date.");
      return;
    }

    const booking = {
      serviceId: service._id,
      serviceName: service.name,
      price: service.price,
      bookingDate,
      email: user.email,
    };

    console.log("Booking payload:", booking); // ✅ Debug log

    try {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        setHasBooked(true);
        setBookingConfirmed(true);

        Swal.fire({
          icon: "success",
          title: "Booked!",
          text: "Your booking has been confirmed.",
          confirmButtonColor: "#2563eb",
        });

        // Optional: close modal
        document.getElementById("booking-modal").checked = false;
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to book service");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Error booking service");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user?.uid) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    const review = {
      userId: user.uid,
      userName: user.displayName,
      comment,
    };

    try {
      const res = await fetch(`http://localhost:3000/services/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (res.ok) {
        toast.success("Review submitted!");
        setComment("");
        setHasReviewed(true);
        fetch(`http://localhost:3000/services/${id}`)
          .then((res) => res.json())
          .then((data) => setService(data));
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      toast.error("Error submitting review");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {service ? (
        <>
          <h2 className="text-3xl font-bold mb-4">{service.name}</h2>
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <p className="text-lg text-gray-700 mb-2">৳{service.price}</p>
          <p className="text-gray-600 mb-6">{service.description}</p>

          {user?.email &&
            (isOwner ? (
              <p className="text-red-500 font-medium mb-6">
                You can't book your own service.
              </p>
            ) : hasBooked ? (
              <p className="text-green-600 font-medium mb-6">
                You've already booked this service.
              </p>
            ) : (
              <label htmlFor="booking-modal" className="btn btn-primary mb-6">
                Book This Service
              </label>
            ))}

          <h3 className="text-2xl font-semibold mb-4">🗣️ Reviews</h3>
          {service.reviews?.length > 0 ? (
            <div className="space-y-4">
              {service.reviews.map((review, index) => (
                <div key={index} className="border p-4 rounded bg-gray-50">
                  <p className="font-semibold">{review.userName}</p>
                  {review.rating && (
                    <p className="text-yellow-500">⭐ {review.rating}</p>
                  )}
                  {review.comment && (
                    <p className="text-sm text-gray-700 mt-1">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          {user?.uid && hasBooked && !hasReviewed && (
            <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4">
              <h4 className="text-lg font-semibold">Leave a Review</h4>
              <textarea
                placeholder="Write your review..."
                required
                className="textarea textarea-bordered w-full"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          )}

          {user?.uid && !hasBooked && (
            <p className="text-red-500 mt-6">
              You must book this service before submitting a review.
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">Loading service details...</p>
      )}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirm Booking</h3>

          <img
            src={service?.image}
            alt={service?.name}
            className="w-full h-48 object-cover rounded mb-4"
          />

          <form onSubmit={handleBooking} className="space-y-4">
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={service?.name}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="number"
              value={service?.price}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="date"
              required
              className="input input-bordered w-full"
              onChange={(e) => setBookingDate(e.target.value)}
            />

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={bookingConfirmed}
              >
                {bookingConfirmed ? "Booked" : "Confirm Booking"}
              </button>
              <label htmlFor="booking-modal" className="btn">
                Close
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
