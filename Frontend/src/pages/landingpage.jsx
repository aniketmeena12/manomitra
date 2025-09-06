import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuSparkles } from 'react-icons/lu'
import GamifyCard from './smallgame/gamifycard'
import { features } from '../utilis/data'
import Login from './auth/login'
import SignUp from './auth/signup'
import Modal from '../components/Modal'
import GHQForm from '../components/assestments/GhQ'
import AssessmentBox from './useritems/assestmentbox'

const Landingpage = () => {
  const navigate = useNavigate()
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("login")
  const handleCTA = () => {}

  return (
    <>
      <div className='w-full min-h-full bg-[#FFFCEF] pb-10'>
        <div className='w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0' />
        <div className='container mx-auto px-4 pt-6  relative z-10'>
          <header className='flex justify-between items-center mb-16'>
            <div className='text-xl text-black font-bold'>
              ManoMitra
            </div>
            <button
              className='bg-gradient-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer'
              onClick={() => setOpenAuthModal(true)}
            >
              Login/Sign Up
            </button>
          </header>
          <div className='flex flex-col md:flex-row items-center md:gap-x-32'>
            <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
              <div className='flex items-center justify-left mb-2'>
                <div className='flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300'>
                  <LuSparkles /> AI Powered
                </div>
              </div>
              <h1 className='text-5xl text-black font-medium mb-5 leading-tight'>
                <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>
                  Manomitra
                </span>
                - Because every mind deserves care,
                not judgement
              </h1>
            </div>
            <div className='w-full md:w-1/2'>
              <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
                Manomitra is your digital companion for mental well-being.
                Designed for students in higher education, it offers instant AI-powered support,
                self-help resources, mood tracking, and access to peer communities and professional counseling.
                With Manomitra, you are never alone in your journey towards a healthier and happier mind.
              </p>
              <button
                className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer'
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen relative z-10 flex items-center justify-center ">
  <div className="grid grid-cols-1 md:grid-cols-2  w-full max-w-7xl">
    
    <section className="flex items-center justify-center">
      <GamifyCard className="w-[80%] rounded-lg shadow-lg" />
    </section>
    <section className="flex items-center justify-center">
      <div className="w-full bg-[#FFFCEF] rounded-lg shadow-lg p-6">
        <AssessmentBox/>
      </div>
    </section>

  </div>
</div>

      <div className='w-full min-h-full bg-[#FFFCEF] mt-2'>
        <div className='container mx-auto px-4 pt-4 pb-8'>
          <section className='mt-2'>
            <h2 className='text-2xl font-medium text-center mb-8'>
              Features That makes smile in your face
            </h2>
            <div className='flex flex-col items-center gap-8'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                {features.slice(0, 3).map((features) => (
                  <div key={features.id}
                    className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'
                  >
                    <h3 className='text-base font-semibold mb-3 flex items-center gap-2'>
                      {features.icon && React.createElement(features.icon, { className: "text-amber-500 text-lg" })}
                      {features.title}
                    </h3>
                    <p className='text-gray-600'>{features.description}</p>
                  </div>
                ))}
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                {features.slice(3).map((features) => (
                  <div key={features.id}
                    className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'
                  >
                    <h3 className='text-base font-semibold mb-3 flex items-center gap-2'>
                      {features.icon && React.createElement(features.icon, { className: "text-amber-500 text-lg" })}
                      {features.title}
                    </h3>
                    <p className='text-gray-600'>{features.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5 '>
        footer
      </div>
      <Modal
      isOpen={openAuthModal}
      onClose={()=>{
        setOpenAuthModal(false);
        setCurrentPage("login");
      }}
      hideHeader>
        <div>
          {currentPage==="login"&& (
            <Login setCurrentPage={setCurrentPage}/>
          )}
          {currentPage ==="signup"&&(
            <SignUp setCurrentPage={setCurrentPage}/>
          )}
        </div>
      </Modal>
    </>
  )
}

export default Landingpage
