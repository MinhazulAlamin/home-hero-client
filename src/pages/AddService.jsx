import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    providerName: user?.displayName || "",
    providerEmail: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Service added successfully");
        setFormData({
          name: "",
          category: "",
          price: "",
          description: "",
          image: "",
          providerName: user?.displayName || "",
          providerEmail: user?.email || "",
        });
      } else {
        toast.error("Failed to add service");
      }
    } catch (error) {
      toast.error("Error adding service");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
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
        <input
          type="text"
          name="providerName"
          className="input input-bordered w-full"
          value={formData.providerName}
          readOnly
        />
        <input
          type="email"
          name="providerEmail"
          className="input input-bordered w-full"
          value={formData.providerEmail}
          readOnly
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;