import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import UserServices from '../../services/UserServices'

function Login() {
  const [email, setEmail] = useState("admin@gmail.com")
  const [password, setPassword] = useState("123456")

  const [load, setload] = useState(false)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setload(true)

    try {
      let userType = await UserServices.Login(email, password)
      if (userType == 1) {
        toast.success("Admin Login Successfully")
        nav("/admin")
      }
      else if (userType == 2) {
        toast.success("User Login Successfully")
        nav("/")
      }
      else {
        toast.error("Login Failed")
      }

      console.log(userType);
    }
    catch (err) {
      toast.error(err)
    }

    finally {
      setload(false)
    }




  }
  return (
    <>
      {
        load ?
          <div style={{
            height: "100vh",
            display: "flex",

            justifyContent: "center",
            alignItems: "center"
          }}>
            <FadeLoader height={25} width={5} color="#ec0606" />
          </div>

          :
          <>
            <section className="contact-section">
              <div className="container">
                <div className="row g-4 justify-content-center">

                  <div className="col-lg-8" data-aos="fade-left">
                    <div className="d-flex justify-content-between align-items-center mb-3">

                      <h1 className="flex-grow-1 text-center m-0">
                        Login Here
                      </h1>

                    </div>
                    <div className="fcard">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                          <div className="col-sm-12">
                            <label className="flbl">Email</label>
                            <input className="fctrl"
                              name="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value)
                              }}
                              id="email"
                              required
                              type="email"
                              placeholder="Email" />
                          </div>
                          <div className="col-sm-12">
                            <label className="flbl">Password</label>
                            <input
                              className="fctrl"
                              name="password"
                              id="password"
                              required
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value)
                              }}
                              type="password"
                              placeholder="Password"

                            />
                          </div>
                          <div className="col-12 d-flex justify-content-center">
                            <button className="btn-red" id="ctcBtn">
                              <i className="fas fa-paper-plane" />
                              Login
                            </button>
                          </div>

                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
            </section>
          </>
      }
    </>
  )
}


export default Login
