import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import CategoryServices from '../../../services/CategoryServices'
import CloudinaryServices from '../../../services/CloudinaryServices'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const UpdateCategory = () => {
  const [name, setname] = useState("")
  const [image, setimage] = useState(null);
  const [description, setdescription] = useState("")
  const [ImageURL , setImageURL] = useState("")

  const nav = useNavigate()

  const {id}=useParams()

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData=async ()=>{
    let data = await CategoryServices.single(id)
    setname(data.CategoryName)
    setdescription(data.Description)
    setImageURL(data.Image)
  }

  const HandleForm = async (e) => {
    e.preventDefault()

    let url=ImageURL
    if(!!image){
        url=await CloudinaryServices.UploadImage(image)
    }

    let data = {
      name: name,
      description: description,
      image:url
    }

    let result = await CategoryServices.Update(data,id)

    if (result == 1) {
      toast.success("Category Updated Successfully")
      nav("/admin/manageCategory")
    }
    else {
      toast.error("Failed to Update Category")
    }
  }
  return (
    <>
      <section className="contact-section">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="d-flex justify-content-between align-items-center mb-3">

              <h1 className="flex-grow-1 text-center m-0">
                Update Category
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
                        id="name"
                        required
                        type="text"
                        placeholder="Enter your name" />
                    </div>

                    <div className="col-sm-12">
                      <label className="flbl">Image</label>
                      <input className="fctrl"
                        name="name"
                        onChange={(e) => {
                          setimage(e.target.files[0])
                        }}
                        id="name"
                        type="file"
                        placeholder="Enter your name" />
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
                        Update Category
                      </button>
                    </div>

                  </div>
                </form>
                <div className="col-2">
              <img className='img-fluid' src={ImageURL} alt="" />
            </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}


export default UpdateCategory
