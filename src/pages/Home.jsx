import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import "../pages/style.scss";


function Home() {
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar/>
            <Chat/>

            
        </div>
        
     </div>
  )
}

export default Home