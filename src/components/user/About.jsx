function About(){
    return(
        <>
         {/* ABOUT */}
  <section id="about">
    <div className="container">
      <div className="row align-items-center g-5">
        <div className="col-lg-5" data-aos="fade-right">
          <div className="astack">
            <div className="aexp">
              <span className="anum">850+</span>
              <small>
                Happy
                <br />
                Students
              </small>
            </div>
            <div className="amain">
              <img src="img/about1.jpg" alt="Restaurant" />
            </div>
            <div className="asm">
              <img src="img/about2.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-7" data-aos="fade-left">
          <span className="slbl">Our Story</span>
          <h2 className="stitle text-start">
            Welcome to Your 
            <br />
            your <span>Campus Canteen</span>
          </h2>
          <div className="sline lft" />
          <p className="sdesc mb-4">




We started Campus Bites with one simple goal — give students fresh, affordable food between classes without the long wait. What began as a small canteen counter has grown into the go-to food spot for hundreds of students every day. Same great taste, faster than ever, right on campus.
          </p>
          <div className="mb-4">
            <div className="fti">
              <div className="ftico r">
                <i className="fas fa-leaf" />
              </div>
              <div>
                <h6>100% Fresh Ingredients</h6>
                <p>
                  "Cooked Fresh Daily" — Every meal is prepped fresh in our kitchen each morning, never sitting around from the day before.
                </p>
              </div>
            </div>
            <div className="fti">
              <div className="ftico y">
                <i className="fas fa-award" />
              </div>
              <div>
                <h6>Student-Favorite Menu</h6>
                <p>
                  From quick snacks to full meals, our menu is built around what students actually love to eat.
                </p>
              </div>
            </div>
            <div className="fti">
              <div className="ftico g">
                <i className="fas fa-shipping-fast" />
              </div>
              <div>
                <h6>Lightning-Fast Delivery</h6>
                <p>
                  Order online and get hot, fresh food delivered across campus in just 20 minutes.
                </p>
              </div>
            </div>
          </div>
          <a href="#menu" className="btn-red">
            <i className="fas fa-book-open" />
            View Full Menu
          </a>
        </div>
      </div>
    </div>
  </section>
        </>
    )
}

export default About