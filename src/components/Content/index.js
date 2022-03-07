import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner, Button, Dropdown } from 'react-bootstrap';
import Card from '../Card';
import './Content.css';

const Component = () => {

  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [count, setCount] = useState(6)
  const [filter, setFilter] = useState('No Filter')
  const [loading, setLoading] = useState(false)
  const [displayedData, setDisplayedData] = useState([])
  const [stockChecked, setStockChecked] = useState(false)
  const [filteredRating, setFilteredRating] = useState([])
  const [ratingChecked, setRatingChecked] = useState(false)
  const [filteredUlasan, setFilteredUlasan] = useState([])
  const [filteredNew, setFilteredNew] = useState([])
  const [availableStock, setAvailableStock] = useState([])

  const runIsLoading = () => {
    setLoading(true)
    setTimeout(()=> {
      setLoading(false)
    }, 1500)
  }

  const onPressStockChecked = () => {
    if(data.length > 0) {
      if(stockChecked == true) {
        runIsLoading()
        setStockChecked(!stockChecked)
        setDisplayedData(data)
        setFilter('No Filter')
      }
      else {
        runIsLoading()
        setStockChecked(!stockChecked)
        let filter = data.filter(a=> a.attributes.stock !== 0)
        console.log('filter: ', filter)
        setDisplayedData(filter)
        setRatingChecked(false)
        setFilter('No Filter')
      }
    }
  }

  const onPressRatingChecked = () => {
    if(data.length > 0) {
      if(ratingChecked == true) {
        runIsLoading()
        setRatingChecked(!ratingChecked)
        setDisplayedData(data)
        console.log('data: ', data)
        console.log('filteredDataRating: ', filteredRating)
        setFilter('No Filter')
      }
      else {
        runIsLoading()
        setRatingChecked(!ratingChecked)
        setDisplayedData(filteredRating)
        setStockChecked(false)
        setFilter('No Filter')
      }
    }
    else {
      alert('No data to filter')
    }
  }

  const getData = () => {
    setLoading(true)
    axios.get(`https://recruitment.dev.rollingglory.com/api/v2/gifts?page[number]=1&page[size]=${count}`)
    .then(res => {
        setLoading(false)
        //FullData
        let data = res.data
        console.log('get: ', data.data)
        setData(data.data)
        
        //FilteredData
        let filteredRating = data.data.filter(a=> a.attributes.rating > 3.5 || a.attributes.rating > 3.50)
        setFilteredRating(filteredRating)
        
        if(ratingChecked == true) {
          setDisplayedData(filteredRating)
        }
        else {
          setDisplayedData(data.data)
        }
    })
    .catch(err=> {
        setLoading(false)
        console.log(err)
        alert(err.message.data)
    })
  }

  const onClickCard = (data) => {
      navigate('/details', {
        state: {
          data: data
        }
    })
  }

  const handleSort = (action) => {
    if(action == 'reset') {
      setDisplayedData(data)
      setFilter('No Filter')
      runIsLoading()
      setStockChecked(false)
      setRatingChecked(false)
    }
    else if(action == 'terbaru') {
      setFilter('Terbaru')
      let newProduct = data.filter(a => a.attributes.isNew == 1)
      let oldProdcut = data.filter(a => a.attributes.isNew !== 1)
      let result = newProduct.concat(oldProdcut)
      setFilteredNew(result)
      setDisplayedData(result)
      runIsLoading()
      setStockChecked(false)
      setRatingChecked(false)
      console.log('newProduct: ', newProduct)
    }
    else if(action == 'ulasan') {
      runIsLoading()
      let filter = data.sort((a,b) =>  b.attributes.numOfReviews - a.attributes.numOfReviews)
      console.log('filter: ', filter)
      setFilter('Ulasan')
      setFilteredUlasan(filter)
      setDisplayedData(filter)
      setStockChecked(false)
      setRatingChecked(false)
    }
  }

  useEffect(()=> {
    getData()
  },[count])

  useEffect(()=> {
    setTimeout(()=> {
      localStorage.setItem('loading', loading)
    }, 1000)
  }, [loading])

  useEffect(()=> {
    if(ratingChecked === true) {
      setDisplayedData(filteredRating)
    }
    else {
      setDisplayedData(data)
    }
  }, [ratingChecked])


  if(loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-6">
          <Button variant="success" className="mt-6" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-2 col-sm-12 col-xs-12">
          <p className="content-header">Filter</p>
          <hr/>
          <div className="card ps-3 pe-3 pt-2">
            <div className="row">
              <div className="col-sm-10">
                <p className="filter-font">Rating 4 Ke Atas</p>
              </div>
              <div className="col-sm-2">
                <input type="checkbox" checked={ratingChecked} onClick={onPressRatingChecked}/>  
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10">
                <p className="filter-font">Stock Tersedia</p>
              </div>
              <div className="col-sm-2">
                <input type="checkbox" checked={stockChecked} onClick={onPressStockChecked}/>  
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col">
              <p className="content-header">Product List</p>
            </div>
            <div className="col d-flex justify-content-end">
              <p className="content-header me-4">Urutkan</p>
              <Dropdown>
                <Dropdown.Toggle variant="outline-success" id="dropdown-basic" size="sm">
                  {filter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>handleSort('reset')}>No filter</Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleSort('terbaru')}>Terbaru</Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleSort('ulasan')}>Ulasan</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <hr/>
          </div>
          <div className="row d-flex justify-content-between">
            { displayedData.map((a, index) => (
              <Card
                key={index}
                headerTag = {
                  a.attributes.isNew == 1 && Math.round(a.attributes.rating) >= 4 && a.attributes.numOfReviews > 25 ? "card p-3 card-bg-hot" 
                  :  
                  a.attributes.isNew == 1 && Math.round(a.attributes.rating) >= 4 ? "card p-3 card-bg-best"
                  :
                  a.attributes.isNew == 1 ? "card p-3 card-bg-new"
                  :
                  "card p-3"
                }
                headerText={
                  a.attributes.stock > 5 ? 'In Stock' 
                  : 
                  a.attributes.stock < 5 && a.attributes.stock !== 0 ? 'Stock < 5'
                  :
                  a.attributes.stock == 0 ? 'Sold Out'
                  :
                  null
                }
                headerTextStyle = {
                  a.attributes.stock > 5 ? "header-text-green" 
                  : 
                  a.attributes.stock < 5 && a.attributes.stock !== 0 ? "header-text-red" 
                  :
                  a.attributes.stock == 0 ? "header-text-red" 
                  :
                  null
                }
                images={a.attributes.images}
                name={a.attributes.name}
                points={a.attributes.points}
                starValue={Math.round(a.attributes.rating)}
                numReviews={a.attributes.numOfReviews}
                onClickCard={()=> onClickCard(a)}
              />
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success" onClick={()=>setCount(count+6)}>Load More</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Component;