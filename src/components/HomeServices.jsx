import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomeServices = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState(" Popular Services");

  useEffect(() => {
    fetch("https://home-hero-api-server.vercel.app/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          console.error("Services response is not an array:", data);
          setServices([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load services:", err);
        setServices([]);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.length > 0 ? (
          services.map((service) => (
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
                  ${service.price}
                </p>
                <Link
                  to={`/service/${service._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No services available.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default HomeServices;
