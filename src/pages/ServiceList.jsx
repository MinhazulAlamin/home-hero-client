import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => console.error("Failed to fetch services"));
  }, []);
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
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
              <p className="text-lg font-semibold text-primary">
                ৳{service.price}
              </p>
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
    </div>
  );
};

export default ServiceList;
