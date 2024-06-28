import React from 'react'

export default function Carousel() {
  return (
    <div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

        <div className="carousel-inner " id='carousel'>
          <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <form className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
              <button className="btn text-white bg-success" type="submit">Search</button>
            </form>
          </div>
          <div className="carousel-item active" >
            <img src="https://www.shutterstock.com/image-photo/red-apple-isolated-on-white-600nw-1727544364.jpg" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://t4.ftcdn.net/jpg/05/41/05/85/360_F_541058586_BI3eaJvZO132lNExAwbARYSg7FfHknWz.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT96Qbt2cEk0C3pvieUBQGmsWmBrmGsWyJ4XA&s" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


    </div>
  )
}
