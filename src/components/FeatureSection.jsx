import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function FeatureSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false }); // Initialize AOS with custom settings
  }, []);

  return (
    <>
      <section className="py-5">
        <div className="container text-center">
          <p className="text-success fw-semibold" data-aos="fade-up">
            Feature
          </p>
          <h1 className="fw-bold" data-aos="fade-up" data-aos-delay="200">
            What we offer
          </h1>
          <p className="mb-4" data-aos="fade-up" data-aos-delay="400">
            Making hostel management easier, one feature at a time.
          </p>

          <div className="row justify-content-center align-items-center mt-5">
            <div
              className="col-lg-6 col-md-8 mb-4 mb-lg-0"
              data-aos="fade-right"
            >
              <div className="card bg-dark border-0 shadow-sm p-4">
                <h5 className="fw-bold">Efficient Room Allocation</h5>
                <p className="mt-3">
                  Streamlined tools to allocate rooms to students quickly and
                  manage vacancies effectively.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-4 text-center"
              data-aos="fade-left"
            >
              <img
                src="https://png.pngtree.com/png-vector/20220129/ourmid/pngtree-chalk-white-hotel-icon-on-black-background-logo-rent-tourism-vector-png-image_44263854.jpg"
                alt="Lightbulb Illustration"
                className="img-fluid"
                style={{ maxWidth: "250px" }}
              />
            </div>
          </div>

          <div className="row justify-content-center align-items-center mt-5">
            <div
              className="col-lg-4 col-md-4 text-center"
              data-aos="fade-right"
            >
              <img
                src="https://www.lg.com/us/images/features/portable-air-conditioner/09_c047_icons360x360_sleep.jpg"
                alt="Lightbulb Illustration"
                className="img-fluid"
                style={{ maxWidth: "250px" }}
              />
            </div>

            <div
              className="col-lg-6 col-md-8 mb-4 mb-lg-0"
              data-aos="fade-left"
            >
              <div className="card bg-dark border-0 shadow-sm p-4">
                <h5 className="fw-bold">24/7 Accessibility</h5>
                <p className="mt-3">
                  A cloud-based platform accessible anytime, anywhere for
                  managers, staff, and students.
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center align-items-center mt-5">
            <div
              className="col-lg-6 col-md-8 mb-4 mb-lg-0"
              data-aos="fade-right"
            >
              <div className="card bg-dark border-0 shadow-sm p-4">
                <h5 className="fw-bold">Booking & Reservation System</h5>
                <p className="mt-3">
                Allow students to book hostel rooms in advance.

                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-4 text-center"
              data-aos="fade-left"
            >
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRLnRvyM3f2uf2DPy66CKjt3dlbriuRz_C5IOOfk1EpZ7Ic5s04"
                alt="Lightbulb Illustration"
                className="img-fluid"
                style={{ maxWidth: "250px" }}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default FeatureSection;
