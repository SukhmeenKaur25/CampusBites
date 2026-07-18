import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import AuthServices from "../../services/AuthServices"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

function AdminHeader(){

  let isLogin = AuthServices.getIslogin()
  const nav = useNavigate()

  const Logout = () => {

  Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout !"
    }).then((result) => {
      if (result.isConfirmed) {
        AuthServices.clear()
        toast.info("Logout")
        nav("/login")
        Swal.fire({
          title: "Logout!",
          // text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }

    return(
        <>
        <div id="topbar">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="top-contact d-flex flex-wrap">
                <span>
                  <i className="fas fa-phone-alt" />
                  +1 (800) 123-4567
                </span>
                <span>
                  <i className="fas fa-envelope" />
                  hello@sarabfood.com
                </span>
                <span>
                  <i className="fas fa-map-marker-alt" />
                  42 Flavor Street, NY
                </span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="ttag">
                  <i className="fas fa-fire me-1" />
                  Free Delivery Today!
                </span>
                <div className="tsoc">
                  <Link to="#">
                    <i className="fab fa-facebook-f" />
                  </Link>
                  <Link to="#">
                    <i className="fab fa-instagram" />
                  </Link>
                  <Link to="#">
                    <i className="fab fa-tiktok" />
                  </Link>
                  <Link to="#">
                    <i className="fab fa-youtube" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ============================================================
   NAVBAR
   ============================================================ */}
        <nav className="navbar navbar-expand-lg" id="nav">
          <div className="container">
            <Link className="navbar-brand" to="#">
              <div className="blogo">
                <div className="bico">
                  <i className="fas fa-utensils" />
                </div>
                <div>
                  <div className="bname">
                    Sar<span>ab</span>
                  </div>
                  <div className="bsub">Fast Food &amp; Restaurant</div>
                </div>
              </div>
            </Link>
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
            >
              <i
                className="fas fa-bars"
                style={{ color: "var(--primary)", fontSize: "1.35rem" }}
              />
            </button>
            <div className="collapse navbar-collapse" id="navmenu">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">Dashboard</NavLink>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li> */}
               <li className="nav-item">
                  <Link className="nav-link " to="/admin/managecategory">Category</Link>
                </li>

                 <li className="nav-item">
                  <Link className="nav-link " to="/admin/manageMenu">Menu</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/admin/addCategory">
                    Add
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/admin/manageCategory">
                    Manage
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/testimonials">
                    Reviews
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li> */}
                <li className="nav-item d-flex align-items-center">{
                  isLogin ?
                <button className="nav-cta btn btn-outline-danger border-danger bg-white text-danger" onClick={Logout}>Logout</button>
              :
              <Link className="nav-link" to="/login">
                    Login
                  </Link>
              }
                  
                </li>
              </ul>
              {/* <div className="d-flex align-items-center gap-1">
                <button id="navSearchBtn" title="Search">
                  <i className="fas fa-search" />
                </button>
                <Link to="#menu" className="nav-link nav-cta">
                  <i className="fas fa-shopping-bag me-1" />
                  Order Now
                </Link>
              </div> */}
            </div>
          </div>
        </nav>
        {/* <div id="searchOv">
          <button className="sovclose" id="searchClose">
            <i className="fas fa-times" />
          </button>
          <div className="sovbox">
            <h4>What are you craving today?</h4>
            <div className="sovinput">
              <input
                type="text"
                id="searchInput"
                placeholder="Search burgers, pizza, chicken..."
                autoComplete="off"
              />
              <button>
                <i className="fas fa-search" />
              </button>
            </div>
            <div className="sovcats">
              <div className="sovcat active" data-cat="all">
                <img src="img/menu/1.jpg" alt="" />
                All Items
              </div>
              <div className="sovcat" data-cat="burgers">
                <img src="img/menu/1.jpg" alt="" />
                Burgers
              </div>
              <div className="sovcat" data-cat="pizza">
                <img src="img/menu/2.jpg" alt="" />
                Pizza
              </div>
              <div className="sovcat" data-cat="chicken">
                <img src="img/menu/3.jpg" alt="" />
                Chicken
              </div>
              <div className="sovcat" data-cat="wraps">
                <img src="img/menu/4.jpg" alt="" />
                Wraps
              </div>
              <div className="sovcat" data-cat="pasta">
                <img src="img/menu/5.jpg" alt="" />
                Pasta
              </div>
              <div className="sovcat" data-cat="desserts">
                <img src="img/menu/6.jpg" alt="" />
                Desserts
              </div>
            </div>
            <div className="sovtrend">
              <p>
                <i
                  className="fas fa-fire me-1"
                  style={{ color: "var(--secondary)" }}
                />
                Trending Searches
              </p>
              <span className="ttag">Smash Burger</span>
              <span className="ttag">Nashville Chicken</span>
              <span className="ttag">Truffle Pizza</span>
              <span className="ttag">Lava Cake</span>
              <span className="ttag">Loaded Fries</span>
              <span className="ttag">Mango Shake</span>
            </div>
          </div>
        </div> */}
      </>
    )
}

export default AdminHeader