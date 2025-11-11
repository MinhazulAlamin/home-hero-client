import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import React from "react";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch(() => toast.error("Failed to load bookings"));
  }, [user?.email]);

  const handleCancel = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Booking cancelled");
        setBookings(bookings.filter((b) => b._id !== id));
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      toast.error("Error cancelling booking");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Price</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.serviceName}</td>
                  <td>${booking.price}</td>
                  <td>{booking.bookingDate}</td>
                  <td>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
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

export default MyBookings;
