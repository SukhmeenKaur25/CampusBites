import { useEffect, useState } from "react"
import CategoryServices from "../../services/CategoryServices"
import { Link } from "react-router-dom"

function ViewCategory() {
    const [Data, setData] = useState([])

    useEffect(() => {
        FetchData()
    }, [])

    const FetchData = async () => {

      let payload={
        value:true
      }
        let data = await CategoryServices.All(payload,"status")

        setData(data)
    }


    return (
        <>
            {/* CATEGORY */}
            <section id="category">
                <div className="container">
                    <div className="text-center mb-5" data-aos="fade-up">
                        <span className="slbl">What We Offer</span>
                        <h2 className="stitle">
                            Browse by <span>Category</span>
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
                                    className="col-6 col-sm-4 col-md-3 col-lg-2"
                                    key={el.id}
                                >
                                  <Link to={`/viewMenu/${el.id}`}
                                   style={{ textDecoration: "none" , color: "inherit"}}>
                                  <div className="catcard active" >
                                        <img className="catimg" width={200} height={200} src={el.Image} alt="{el.CategoryName}" />
                                        <div className="catnm">{el.CategoryName}</div>
                                        <div className="catct">{el.Description}</div>
                                    </div>
                                  </Link>
                                    
                                </div>
                            ))
                        }
        
                    </div>
                </div>
            </section>
        </>
    )
}
export default ViewCategory