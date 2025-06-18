import React from 'react'
import Navbar from "./shared/Navbar"
import Hero from "./Home/Hero"

import LatestJobs from './Home/LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
const Home = () => {
  useGetAllJobs();
 
  return (
    <>
      <Navbar />
      <Hero />
     <LatestJobs />
      <Footer /> 
    </>

  )
}

export default Home;