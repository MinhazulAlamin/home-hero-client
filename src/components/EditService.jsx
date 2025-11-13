import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const EditService = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetch("https://home-hero-api-server.vercel.app/services")
      .then((res) => res.json())
      .then((data) => {
        const service = data.find((s) => s._id === id);
        if (service) {
          setFormData({
            name: service.name,
            category: service.category,
            price: service.price,
            description: service.description,
            image: service.image,
          });
        } else {
          toast.error("Service not found!");
          navigate("/my-services");
        }
      })
      .catch(() => toast.error("Failed to load service"));
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://home-hero-api-server.vercel.app/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          providerEmail: user.email,
        }),
      });

      if (res.ok) {
        toast.success("Service updated successfully");
        navigate("/my-services");
      } else {
        toast.error("Failed to update service");
      }
    } catch (error) {
      toast.error("Error updating service");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="input input-bordered w-full"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered w-full"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
