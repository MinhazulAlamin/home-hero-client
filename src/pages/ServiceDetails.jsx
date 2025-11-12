import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [comment, setComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
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

    if (user?.email) {
      fetch(`http://localhost:3000/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((bookings) => {
          const booked = bookings.some((b) => b.serviceId === id);
          setHasBooked(booked);
        })
        .catch(() => toast.error("Failed to check booking status"));
    }
  }, [id, user?.uid, user?.email]);

  const handleBooking = async () => {
    if (!user?.email) {
      toast.error("You must be logged in to book.");
      return;
    }

    if (isOwner) {
      toast.error("You can't book your own service.");
      return;
    }

    const booking = {
      serviceId: service._id,
      serviceName: service.name,
      price: service.price,
      bookingDate: new Date().toISOString().split("T")[0],
      email: user.email,
    };

    try {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        toast.success("Service booked successfully!");
        setHasBooked(true);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to book service");
      }
    } catch (error) {
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

          {user?.email && (
            isOwner ? (
              <p className="text-red-500 font-medium mb-6">
                 You can't book your own service.
              </p>
            ) : hasBooked ? (
              <p className="text-green-600 font-medium mb-6">
                 You've already booked this service.
              </p>
            ) : (
              <button
                onClick={handleBooking}
                className="btn btn-primary mb-6"
              >
                Book This Service
              </button>
            )
          )}

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
                    <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
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
    </div>
  );
};

export default ServiceDetails;