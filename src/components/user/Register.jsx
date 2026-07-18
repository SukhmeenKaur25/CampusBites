import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import UserServices from '../../services/UserServices'
import CloudinaryServices from '../../services/CloudinaryServices'

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState("");

  const [load, setload] = useState(false);

  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setload(true);

    try {
      let ImageUrl= await CloudinaryServices.UploadImage(profile)

     const userData = {
      name,
      email,
      password,
      contact,
      profile:ImageUrl,
      address,
    };

   let res=await UserServices.Register(userData)
   if(res==1){
    toast.success("Register successfully")
    nav("/")
   }
   else{
    toast.error("Retry")
   }
    }
    catch(err){
      toast.error(err)
    }

    finally{
      setload(false)
    }

    

  };
  return (
    <>
      {
        load ? (
          <div style={{
            height: "100vh",
            display: "flex",

            justifyContent: "center",
            alignItems: "center"
          }}>
            <FadeLoader height={25} width={5} color="#ec0606" />
          </div>
        )

          :
          (
          <>
            <section className="contact-section">
              <div className="container">
                <div className="row g-4 justify-content-center">
                <div className="col-lg-8" data-aos="fade-left">
                    <div className="d-flex justify-content-between align-items-center mb-3">

                      <h1 className="flex-grow-1 text-center m-0">
                        Register Here
                      </h1>

                    </div>
                    <div className="fcard">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                        {/* Name  */}
                          <div className="col-sm-12">
                            <label className="flbl">Name</label>
                            <input className="fctrl"
                              name="name"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value)
                              }}
                              id="name"
                              required
                              type="text"
                              placeholder="Enter your name" />
                          </div>

                          {/* Email */}
                          <div className="col-sm-12">
                            <label className="flbl">Email</label>
                            <input
                              className="fctrl"
                              name="email"
                              id="email"
                              required
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value)
                              }}
                              type="email"
                              placeholder="Enter email address"

                            />
                          </div>

                          {/* Password */}
                          <div className="col-sm-12">
                            <label className="flbl">Password</label>
                            <input className="fctrl"
                              name="password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value)
                              }}
                              id="password"
                              required
                              type="password"
                              placeholder="Enter Password" />
                          </div>

                          {/* Contact */}
                          <div className="col-sm-12">
                            <label className="flbl">Contact Number</label>
                            <input className="fctrl"
                              name="tel"
                              value={contact}
                              onChange={(e) => {
                                setContact(e.target.value)
                              }}
                              id="tel"
                              required
                              type="tel"
                              placeholder="Enter Contact Number" />
                          </div>
                          {/* Profile */}
                          <div className="col-sm-12">
                            <label className="flbl">Profile</label>
                            <input className="fctrl"
                              name="file"
                              onChange={(e) => {
                                setProfile(e.target.files[0])
                              }}
                              id="file"
                              required
                              type="file"
                              accept="image/*"
                              placeholder="Add Profile Photo" />
                          </div>
                          {/* Address */}
                          <div className="col-sm-12">
                            <label className="flbl">Address</label>
                            <textarea className="fctrl"
                            rows="4"
                              name="address"
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value)
                              }}
                              id="address"
                              required
                              placeholder="Enter your Address" />
                          </div>

                          <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn-red" id="ctcBtn">
                              <i className="fas fa-paper-plane" />
                              Register
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
      )}
    </>
  )
}


export default Register
