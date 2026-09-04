export default function OpeningHours() {
  return (
    <section id="hours">
      <div className="hrsbg" />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl" style={{ color: "#a5d6bc" }}>
            Opening Hours
          </span>
          <h2 className="stitle" style={{ color: "#fff" }}>
            We're Open <span style={{ color: "var(--secondary)" }}>For You</span>
          </h2>
          <div className="sline" />
        </div>
        <div className="row g-4 align-items-start">
          <div className="col-lg-5" data-aos="fade-right">
            <div className="hrscard">
              <div className="hrsrow">
                <span className="hrsday">
                  <i
                    className="fas fa-calendar-day me-2"
                    style={{ color: "var(--secondary)" }}
                  />
                  Monday - Saturday
                </span>
                <div className="d-flex align-items-center gap-2">
                  <div className="hdot on" />
                  <span className="hrstime">09:00 AM - 03:00 PM</span>
                </div>
              </div>
              <div className="hrsrow">
                <span className="hrsday">
                  <i
                    className="fas fa-calendar-day me-2"
                    style={{ color: "var(--secondary)" }}
                  />
                  Sunday
                </span>
                <div className="d-flex align-items-center gap-2">
                  <div className="hdot off" />
                  <span className="hrstime" style={{ color: "#ff6b6b" }}>
                    Closed
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3" data-aos="zoom-in">
            <div className="hrscta">
              <i
                className="fas fa-truck-fast fa-2x mb-3"
                style={{ color: "rgba(255,255,255,.8)" }}
              />
              <h4>Order Online</h4>
              <p>Get hot food delivered in 20 minutes</p>
              <a href="#menu" className="btnw">
                Order Now ?
              </a>
            </div>
          </div>
          <div className="col-lg-4" data-aos="fade-left">
            <div className="hrscard">
              <h5
                style={{
                  color: "#fff",
                  marginBottom: 18,
                  fontFamily: '"Poppins",sans-serif',
                  fontSize: ".95rem",
                  fontWeight: 700
                }}
              >
                <i
                  className="fas fa-map-marker-alt me-2"
                  style={{ color: "var(--secondary)" }}
                />
                Find Us
              </h5>
              <div className="hrsrow">
                <span className="hrsday">
                  <i
                    className="fas fa-location-dot me-2"
                    style={{ color: "var(--secondary)" }}
                  />
                  Address
                </span>
                <span className="hrstime" style={{ fontSize: ".8rem" }}>
                  DAV Institute of Engineering & Technology, Jalandhar
                </span>
              </div>
              <div className="hrsrow">
                <span className="hrsday">
                  <i
                    className="fas fa-phone me-2"
                    style={{ color: "var(--secondary)" }}
                  />
                  Phone
                </span>
                <span className="hrstime" style={{ fontSize: ".8rem" }}>
                  +91 9876543210
                </span>
              </div>
              <div className="hrsrow">
                <span className="hrsday">
                  <i
                    className="fas fa-envelope me-2"
                    style={{ color: "var(--secondary)" }}
                  />
                  Email
                </span>
                <span className="hrstime" style={{ fontSize: ".8rem" }}>
                  campusbites@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
