import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About HomeHero</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80">
          HomeHero is your trusted platform for finding and booking reliable home services —
          from cleaning and repairs to specialized maintenance. We connect homeowners with
          verified professionals, ensuring quality, transparency, and peace of mind.
        </p>
      </section>

      {/* Mission Section */}
      <section className="text-center gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="opacity-80">
            We believe every household deserves easy access to dependable services. Our mission
            is to simplify the process of finding skilled professionals, while maintaining
            affordability and trust. With HomeHero, you can book services confidently and save
            valuable time.
          </p>
        </div>
        {/* <img
          src="https://source.unsplash.com/600x400/?home,service"
          alt="Home services"
          className="rounded-xl shadow-md"
        /> */}
      </section>

      {/* Values Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-200 p-6 rounded-xl text-center">
            <h3 className="font-semibold mb-2">Trust</h3>
            <p className="opacity-80">Verified professionals with transparent pricing and honest reviews.</p>
          </div>
          <div className="card bg-base-200 p-6 rounded-xl text-center">
            <h3 className="font-semibold mb-2">Convenience</h3>
            <p className="opacity-80">Book services instantly with just a few clicks, anytime, anywhere.</p>
          </div>
          <div className="card bg-base-200 p-6 rounded-xl text-center">
            <h3 className="font-semibold mb-2">Quality</h3>
            <p className="opacity-80">We ensure high standards by partnering with skilled, experienced providers.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Ready to experience hassle-free home services?</h2>
        <p className="opacity-80">Join thousands of satisfied customers who trust HomeHero every day.</p>
        <a href="/services" className="btn btn-primary">Explore Services</a>
      </section>
    </div>
  )
}