import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import './DetailsProduct.css';
import ReactStars from 'react-rating-stars-component';

const DetailsProduct = () => {

  const {state} = useLocation();
  const { data } = state;
  console.log('a: ', data)

  if(!data || data.length < 1 || data == null) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <button className="btn btn-primary">Back to Home</button>
      </div>
    )
  }
  return (
    <div className="wrapper">
      <Navbar/>
      <p className="route-text">List Product > {data.attributes.name}</p>
      <div className="row">
        <div className="col-md-6">
          <div className="card header">
            <div className="d-flex justify-content-center pt-5 pb-5" >
              <img 
                  className="img-product"
                  src={data.attributes.images}
                  alt="new"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 pt-2">
          <label className="product-name ps-3">{data.attributes.name}</label>
          <div className="row">
            <div className="col-md-3 col-sm-8 col-xs-6 ps-4">
              <ReactStars
                  count={5}
                  value={Math.round(data.attributes.rating)}
                  size={30}
                  activeColor="#ffd700"
                  disabled
                  edit={false}
              />
            </div>
            <div className="col-md-9 col-sm-4 col-xs-6 d-flex align-items-center">
              <label>{data.attributes.numOfReviews} Reviews</label>
            </div>
          </div>
          <div className="row ps-3">
            <div className="col-md-5 col-sm-8 d-flex align-items-center">
              <div className="row">
                <div className="col-md-2 col-sm-2 col-xs-6 pt-2">
                  <img 
                      className='logo-box'
                      src={require('../../images/logo-box.png')}
                      alt="new"
                  />
                </div>
                <div className="col-md-10 col-sm-10 col-xs-6">
                  <label className="points">{data.attributes.points} Points</label>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-sm-4 d-flex align-items-center">
              <label className="stock-status">
              {
                  data.attributes.stock > 5 ? 'In Stock' 
                  : 
                  data.attributes.stock < 5 && data.attributes.stock !== 0 ? 'Stock < 5'
                  :
                  data.attributes.stock == 0 ? 'Sold Out'
                  :
                  null
                }
              </label>
            </div>
          </div>
          <div className="ps-3">
            <div dangerouslySetInnerHTML={{__html: `${data.attributes.info}`}} />
            <p>Jumlah</p>
            <button className="btn btn-count me-3">-</button>
            <label>{data.attributes.stock}</label>
            <button className="btn btn-count ms-3">+</button>
          </div>
          <div className="ps-3 mt-3">
            <button className="btn btn-danger btn-love me-3">
              <i className="bi bi-heart-fill"></i>  
            </button>
            <button className="btn btn-success btn-redeem me-3">Redeem</button>
            <button className="btn btn-outline-dark btn-add">Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <label>Info Product</label>
        <hr/>
        <label>Rincian</label>
        <div dangerouslySetInnerHTML={{__html: `${data.attributes.description}`}} className="text-desc"/>
      </div>
    </div>
  )
}

export default DetailsProduct