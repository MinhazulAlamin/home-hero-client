import React from 'react';

const Testimonials = () => (
  <div className="py-10 px-4">
    <h2 className="text-3xl font-bold text-center mb-6">Customer Testimonials</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 shadow rounded">
        <p>"The AC repair service was quick and professional. Highly recommended!"</p>
        <p className="mt-2 text-sm text-gray-500">— Farhan, Dhaka</p>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <p>"Loved the smart garden setup. My backyard looks amazing now!"</p>
        <p className="mt-2 text-sm text-gray-500">— Nusrat, Rajshahi</p>
      </div>
    </div>
  </div>
);


export default Testimonials;