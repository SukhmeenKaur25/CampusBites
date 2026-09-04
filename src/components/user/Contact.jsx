import React from 'react'

function Contact(){
    return(
        <>
        <>
  <section id="contact-section">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="slbl">Get In Touch</span>
        <h2 className="stitle">
          Contact <span>Us</span>
        </h2>
        <div className="sline" />
        <p className="sdesc mx-auto" style={{ maxWidth: 480 }}>
          Have a question, feedback, or want to plan a special event? We'd love
          to hear from you.
        </p>
      </div>
      <div className="row g-4">
        <div className="col-lg-4" data-aos="fade-right">
          <div className="ctdark">
            <h4>Let's Talk</h4>
            <p className="ctsub">
              We typically respond within 2 hours during business hours.
            </p>
            <div className="ctitem">
              <div className="cticon">
                <i className="fas fa-map-marker-alt" />
              </div>
              <div className="ctinfo">
                <strong>Address</strong>
                <span>
                  DAV Institute of Engineering & Technology, 
                  <br />
                  Jalandhar, Punjab
                </span>
              </div>
            </div>
            <div className="ctitem">
              <div className="cticon">
                <i className="fas fa-phone-alt" />
              </div>
              <div className="ctinfo">
                <strong>Phone</strong>
                <span>+91 9876543210</span>
              </div>
            </div>
            <div className="ctitem">
              <div className="cticon">
                <i className="fas fa-envelope" />
              </div>
              <div className="ctinfo">
                <strong>Email</strong>
                <span>campusbites@gmail.com</span>
              </div>
            </div>
            <div className="ctitem">
              <div className="cticon">
                <i className="fas fa-clock" />
              </div>
              <div className="ctinfo">
                <strong>Working Hours</strong>
                <span>Mon - Fri: 9 AM - 3 PM</span>
              </div>
            </div>
            <div className="ctsocrow">
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#">
                <i className="fab fa-instagram" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-8" data-aos="fade-left">
          <div className="fcard">
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="flbl">Your Name *</label>
                <input type="text" className="fctrl" placeholder="John Doe" />
              </div>
              <div className="col-sm-6">
                <label className="flbl">Email Address *</label>
                <input
                  type="email"
                  className="fctrl"
                  placeholder="you@email.com"
                />
              </div>
              <div className="col-sm-6">
                <label className="flbl">Phone Number</label>
                <input
                  type="tel"
                  className="fctrl"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="col-sm-6">
                <label className="flbl">Subject *</label>
                <select className="fctrl">
                  <option>General Inquiry</option>
                  <option>Order Issue</option>
                  <option>Feedback</option>
                  <option>Menu Suggestion</option>
                  <option>Bulk/Group Order</option>
                </select>
              </div>
              <div className="col-12">
                <label className="flbl">Message *</label>
                <textarea
                  className="fctrl"
                  rows={5}
                  placeholder="Write your message here..."
                  defaultValue={""}
                />
              </div>
              <div className="col-12">
                <button className="btn-red" id="ctcBtn">
                  <i className="fas fa-paper-plane" />
                  Send Message
                </button>
              </div>
            </div>
            <div className="sucmsg" id="ctcOk">
              <i className="fas fa-check-circle" />
              <p>Message sent! We'll reply within 2 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

        </>
    )
}

export default Contact