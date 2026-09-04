import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import CategoryServices from '../../../services/CategoryServices'
import CloudinaryServices from '../../../services/CloudinaryServices'

const AddCategory = () => {
  const [name, setname] = useState("")
  const [image, setimage] = useState(null);
  const [description, setdescription] = useState("")

  const [load, setload] = useState(false)
  const nav = useNavigate()

  const HandleForm = async (e) => {
    e.preventDefault()

    setload(true)

    
    try{
    let url = await CloudinaryServices.UploadImage(image)

    let data = {
      name: name,
      description: description,
      image:url
    }

    let result = await CategoryServices.Add(data)

    if (result == 1) {
      toast.success("Category Added Successfully")
      nav("/admin/manageCategory")
    }
    else {
      toast.error("Failed to Add Category")
    }
  }
  catch (err) {
        toast.error(err.message || "Something went wrong")
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
            <div className="d-flex justify-content-between align-items-center mb-3">

              <h1 className="flex-grow-1 text-center m-0">
                Add Category
              </h1>

              <Link
                className="btn btn-danger"
                to="/admin/manageCategory"
              >
                Manage
              </Link>

            </div>
            <div className="col-lg-10" data-aos="fade-left">
              <div className="fcard">

                <form onSubmit={HandleForm}>
                  <div className="row g-3">

                    <div className="col-sm-12">
                      <label className="flbl">Name</label>
                      <input className="fctrl"
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value)
                        }}
                        id="catName"
                        required
                        type="text"
                        placeholder="Enter your name" />
                    </div>

                    <div className="col-sm-12">
                      <label className="flbl">Image</label>
                      <input className="fctrl"
                        name="image"
                        onChange={(e) => {
                          setimage(e.target.files[0])
                        }}
                        id="catImage"
                        required
                        type="file"
                        placeholder="Choose an image" />
                    </div>

                    <div className="col-sm-12">
                      <label className="flbl">Description</label>
                      <input
                        className="fctrl"
                        name="description"
                        id="description"
                        required
                        value={description}
                        onChange={(e) => {
                          setdescription(e.target.value)
                        }}
                        type="text"
                        placeholder="Enter Description"

                      />
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <button className="btn-red" id="ctcBtn">
                        <i className="fas fa-paper-plane" />
                        Add Category
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


export default AddCategory
