import "./services.css";

const Service = () => {
  return (
    <div className="service-page">
      <h2 className="service-title">Our Services</h2>

      <div className="service-list">
        <div className="service-card">
          <h3 className="service-name">Web Development</h3>
          <p className="service-desc">
            Responsive and modern web applications.
          </p>
        </div>

        <div className="service-card">
          <h3 className="service-name">Backend API</h3>
          <p className="service-desc">
            Secure and scalable REST APIs.
          </p>
        </div>

        <div className="service-card">
          <h3 className="service-name">UI Design</h3>
          <p className="service-desc">
            Clean and user-friendly interface design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;