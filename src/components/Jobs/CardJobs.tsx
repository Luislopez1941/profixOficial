import React from 'react'
import './styles/CardJobs.css'
import { storeJobs } from '@/zustand/Jobs'
import Send from './modalSend/Send'
import './modalSend/Send.css'

const CardJobs = ({job}: any) => {

   const setModal = storeJobs(state => state.setModal)
  

    console.log('job',job)

  return (
    <div className='card__jobs'>
      {/* <div className='image_jobs'>
        
      </div> */}
      <div className='content'>
        <p className='title'>{job.job_title}</p>
        <p className='description'>{job.job_description}</p>
      </div>
      <div className='skills'>
        {job.skills.map((x: any) => (
          <div>
          <p>{x.name}</p>
        </div>
        ))}
      </div>
      <div className='btn-send'>
        <button onClick={() => setModal('modal-send')}>Mandar una oferta</button>
      </div>
      <Send job={job} />
    </div>
  )
}

export default CardJobs
