import React, {useEffect,} from 'react';
import './Home.css';
import Navbar from '../../components/Navbar';
import Content from '../../components/Content';
import Footer from '../../components/Footer';

const Home = () => {
    return (
        <>
            <div className="wrapper">
                <Navbar/>
                <Content/>
            </div>
            { localStorage.loading == true ?
                null
                :
                <Footer/>
            }

        </>
  )
}

export default Home;