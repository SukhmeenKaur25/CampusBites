import { useEffect, useState } from "react"
import MenuServices from "../../services/MenuServices"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import AuthServices from "../../services/AuthServices"
import CartServices from "../../services/CartServices"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function ViewMenu() {
  const [Data, setData] = useState([])

  const { id } = useParams();

  let nav = useNavigate();

 let islogin = AuthServices.getIslogin()

   useEffect(()=>{
        if(!islogin){
            toast.warning("Please Login first")
            nav("/login")
        }
    })

  useEffect(() => {
    FetchData()
  }, [])

  const FetchData = async () => {

    let data = await MenuServices.All();

    if (!!id) {
      let FilterData = data.filter((el) => {
        return el.categoryId == id;
      });

      setData(FilterData)
    } else {


      setData(data)
    }
  }

  const uid = AuthServices.getUid()



  const AddToCart = async (id) => {

    let existData = await CartServices.isExist(id, uid)

    if (!!existData[0]?.id) {
      let data = {
        quantity: existData[0].quantity + 1
      }
      let res = await CartServices.Update(data, existData[0].id)

      if (res == 1) {
        toast.success("Quantity Updated")
      } else {
        toast.warning("Priduct not added")
      }
    } else {
      let data = {
        proId: id,
        userId: uid,
        quantity: 1
      }

      let res = await CartServices.Add(data)

      if (res == 1) {
        toast.success("added to the cart")
      } else {
        toast.error("There is an error")
      }
    }



  }


  return (
    <>
      {/* CATEGORY */}
      <section id="category">
        <div className="container">
          <div className="mb-3">
            <Link to="/viewCategory" className="btn btn-outline-danger">
              ← Back to Categories
            </Link>
          </div>
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="slbl">What's Cooking</span>
        <h2 className="stitle">
          Our Delicious <span>Menu</span>

              {!!id > 0 ? Data[0]?.categoryName : "Menu"}
            </h2>
            <div className="sline" />
            <p className="sdesc mx-auto" style={{ maxWidth: 480 }}>
              Choose your favorite food and drinks.
            </p>
          </div>
          <div className="row g-3 justify-content-center">
            {/* {cards} */}
            {
              Data.length > 0 ? (
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
                        {/* <div className="mcat">{el.categoryName}
                        </div> */}
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
                          <button onClick={() => {
                            AddToCart(el.id)
                          }} className="madd" title="View Details">
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <h3>No Menu Items Found</h3>
                </div>
              )
            }

          </div>
        </div>
      </section>
    </>
  )
}
export default ViewMenu
