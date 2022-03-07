import React from 'react'
import ReactStars from "react-rating-stars-component";
import './Card.css'

const Card = (props) => {
  return (
    <div className="col-md-4 mb-3">
        <div className={props.headerTag} onClick={props.onClickCard}>
            <div className="col">
                <div className="row">
                    <div className="col">
                        <label className={props.headerTextStyle}>
                            {props.headerText}
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-2 mb-2" >
                    <img 
                        style={{height:'175px'}}
                        src={props.images}
                        alt="new"
                    />
                </div>
                <div className="text-justify">
                    <label className="content-name">{props.name}</label>
                </div>
                <div className="row">
                    <div className="col-md-8 col-sm-12 col-xs-12 ">
                        <div className="row">
                            <div className="col-md-1 text-justify">
                                <img 
                                    style={{height:'13px', marginBottom: '3px'}}
                                    src={require('../../images/green-logo2x.png')}
                                    alt="new"
                                />
                            </div>
                            <div className="col-md-10 d-flex align-items-center">
                                <label className="product-points">{props.points} Points</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-center">
                                <ReactStars
                                    count={5}
                                    value={props.starValue}
                                    size={20}
                                    activeColor="#ffd700"
                                    disabled
                                    edit={false}
                                />
                            </div>
                            <div className="col-md-6 d-flex justify-content-start mt-1">
                                <label className="reviews-text">{props.numReviews} reviews</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 d-flex justify-content-center pt-2 pb-2">
                        <div className="col-md-12 d-flex justify-content-center">
                            <button className="btn btn-sm btn-danger btn-like">
                                <i className="bi bi-heart-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default Card;