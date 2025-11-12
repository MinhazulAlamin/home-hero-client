import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from "../firebase/firebase.config";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(user, { displayName: name, photoURL: photoURL });
      await user.reload();
      setUser(auth.currentUser);
      toast.success("Profile updated");

      // Optional: update in MongoDB too
      await fetch(`http://localhost:3000/users`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, name, photoURL }),
      });
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <img
        src={user?.photoURL || "https://i.ibb.co.com/hFvHN3Lk/user.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Name:</strong> {user?.displayName}
      </p>
      <p>
        <strong>Last Login:</strong> {user?.metadata?.lastSignInTime}
      </p>

      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Update name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Update photo URL"
          className="input input-bordered w-full"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
