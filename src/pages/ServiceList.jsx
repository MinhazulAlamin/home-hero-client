import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Spinner from "../components/Spinner";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Controls
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("price-asc");

  useEffect(() => {
    fetch("https://home-hero-api-server.vercel.app/services/all")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...services];

    // Search
    if (search) {
      result = result.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category) {
      result = result.filter(s => s.category === category);
    }

    // Price
    if (minPrice) {
      result = result.filter(s => s.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(s => s.price <= Number(maxPrice));
    }

    // Sort
    if (sort === "price-asc") result.sort((a,b)=>a.price-b.price);
    if (sort === "price-desc") result.sort((a,b)=>b.price-a.price);
    if (sort === "rating-desc") result.sort((a,b)=>b.rating-a.rating);

    setFiltered(result);
  }, [search, category, minPrice, maxPrice, sort, services]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Explore Services</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-64"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="">All Categories</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="input input-bordered w-32"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input input-bordered w-32"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating-desc">Rating ↓</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="opacity-80">No services found. Try adjusting filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((service) => (
            <div key={service._id} className="card bg-base-100 shadow-md">
              <figure>
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.category}</p>
                <p className="text-lg font-semibold text-primary">${service.price}</p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/service/${service._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
