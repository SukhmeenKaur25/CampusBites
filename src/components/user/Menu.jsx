import { useEffect, useState } from "react"
import MenuServices from "../../services/MenuServices"
import { Link } from "react-router-dom"

function Menu() {
  const [Data, setData] = useState([])

  useEffect(() => {
    FetchData()
  }, [])

  const FetchData = async () => {

    let data = await MenuServices.All();
    setData(data);

  }


  return (
    <>
      {/* CATEGORY */}
      <section id="category">
        <div className="container">
          <div className="mb-3">
          </div>
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="slbl">What We Offer</span>
            <h2 className="stitle">
              Browse by <span>Menu</span>
            </h2>
            <div className="sline" />
            <p className="sdesc mx-auto" style={{ maxWidth: 480 }}>
              From sizzling burgers to exotic world cuisines - find your favourite
              in our menu
            </p>
          </div>
          <div className="row g-3 justify-content-center">
            {/* {cards} */}
            {
                Data.map((el) => (
                  <div
                    key={el.id}
                    className="col-sm-6 col-lg-4 mwrap"
                    data-aos="fade-up"
                  >
                    <div
                      className="mcard"
                    >
                      <div className="mimg">
                        <img src={el.image} alt={el.name} />
                        {/* <div className="mbdg hot">
                          <i className="fas fa-star" /> Hot
                        </div> */}
                        <div className="mhrt">
                          <i className="far fa-heart" />
                        </div>
                      </div>
                      <div className="mbody">
                        <div className="mcat">{el.categoryName}
                        </div>
                        <div className="mtit">{el.name}</div>
                        <div className="mdesc">{el.description}
                        </div>
                        <div className="mfoot">
                          <div>
                            <div className="mprice">
                              ₹{el.price}
                            </div>
                            <div className="mstars"> ⭐4.8
                              {/* <i className="fas fa-star" />{" "}
                                <span style={{ color: "#bbb", fontSize: ".7rem" }}>
                                  (128)
                                </span> */}
                            </div>
                          </div>
                          <button className="madd" title="View Details">
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            }

          </div>
        </div>
      </section>
    </>
  )
}
export default Menu
