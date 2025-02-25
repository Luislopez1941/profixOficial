import React from 'react'
import './styles/CardJobs.css'

const CardJobs = ({job}: any) => {
  return (
    <div className='card__jobs'>
      {/* <div className='image_jobs'>
        
      </div> */}
      <div className='content'>
        <p className='title'>{job.jobTitle}</p>
        <p className='description'>{job.jobDescription}</p>
      </div>
      <div className='skills'>
        <div>
        <p>Plomero</p>
        </div>
        <div>
        <p>Albañilería</p>
        </div>
      </div>
      <div className='btn-send'>
        <button>Mandar una oferta</button>
      </div>
    </div>
  )
}

export default CardJobs
