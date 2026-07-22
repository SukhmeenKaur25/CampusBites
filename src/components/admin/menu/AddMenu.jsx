import { Link } from 'react-router-dom'
import React, { useState , useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import CategoryServices from '../../../services/CategoryServices'
import CloudinaryServices from '../../../services/CloudinaryServices'
import MenuServices from '../../../services/MenuServices'

const AddMenu = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [CateId, setCateId] = useState("");
    const [image, setImage] = useState(null);

    const [load, setload] = useState(false)
  const nav = useNavigate()

    const [Data, setData] = useState([])

    useEffect(() => {
        FatchData()
    }, [])

    const FatchData = async () => {
        let data = await CategoryServices.All()

        setData(data)
    }

    const HandleForm = async (e) => {
        e.preventDefault()

        setload(true)

        try {
            let imageUrl = "";

            if (image) {
                imageUrl = await CloudinaryServices.UploadImage(image);
            }

            let category = Data.find((el) => el.id == CateId);
            const data = {
                name,
                description,
                price,
                categoryId : CateId,
                categoryName : category.CategoryName,
                image: imageUrl,
            };

            const result = await MenuServices.Add(data);

            if (result === 1) {
                toast.success("Menu Item Added Successfully");

                setName("");
                setDescription("");
                setPrice("");
                setImage(null);
            } else {
                toast.error("Failed to Add Menu Item");
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
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
                                Add Menu
                            </h1>

                            <Link
                                className="btn btn-danger"
                                to="/admin/manageMenu"
                            >
                                Manage
                            </Link>

                        </div>
                        <div className="col-lg-10" data-aos="fade-left">
                            <div className="fcard">

                                <form onSubmit={HandleForm}>
                                    <div className="row g-3">
                                        {/* Product Name */}
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
                                                placeholder="Enter Item Name" />
                                        </div>

                                        {/* Category Dropdown */}
                                        <div className="col-sm-12">
                                            <label className="flbl">Category</label>

                                            <select
                                                value={CateId}
                                                onChange={(e) => setCateId(e.target.value)}
                                                className="form-control" name="" id="">

                                                <option value="">Category</option>
                                                {
                                                    Data.map((el) => (
                                                        <option key={el.id} value={el.id} >{el.CategoryName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        {/* Price */}
                                        <div className="col-sm-12">
                                            <label className="flbl">Price</label>
                                            <input
                                                className="fctrl"
                                                name="price"
                                                id="price"
                                                required
                                                value={price}
                                                onChange={(e) => {
                                                    setPrice(e.target.value)
                                                }}
                                                type="number"
                                                placeholder="Enter Price"
                                            />
                                        </div>

                                        {/* /Image */}

                                        <div className="col-sm-12">
                                            <label className="flbl">Image</label>
                                            <input className="fctrl"
                                                name="image"
                                                onChange={(e) => {
                                                    setImage(e.target.files[0])
                                                }}
                                                id="name"
                                                // required
                                                type="file" />
                                        </div>

                                        {/* Description */}
                                        <div className="col-sm-12">
                                            <label className="flbl">Description</label>
                                            <input
                                                className="fctrl"
                                                name="description"
                                                id="description"
                                                required
                                                value={description}
                                                onChange={(e) => {
                                                    setDescription(e.target.value)
                                                }}
                                                type="text"
                                                placeholder="Enter Description"
                                        />
                                        </div>

                                        {/* Submit button */}
                                        <div className="col-12 d-flex justify-content-center">
                                            <button className="btn-red" id="ctcBtn">
                                                <i className="fas fa-paper-plane" />
                                                Add Item
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


export default AddMenu
