import React from 'react'
import './styles/CardDomesticWork.css'
import { storeJobs } from '@/zustand/Jobs'


const CardDomesticWork = ({ job }: any) => {
  const setModal = storeJobs(state => state.setModal)

  return (
    <div className='card__domestic-work_main'>
      <div className="card__domestic-work">
        <div className="image_domestic-work" >
          <div className='image' style={{
            backgroundImage: `url(${job.photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>

          </div>

        </div>
        <div className="content">
          <p className="title">{job.title}</p>
          <p className="description">{job.description}</p>
          <p className="category">
            <strong>Categoría:</strong> {job.category}
          </p>
          <p className="location">
            <strong>Ubicación:</strong> {job.location}
          </p>
          <p className="price">
            <strong>Precio por día:</strong> {job.price_per_day}
          </p>
          <p className="qualification">
            <strong>Calificación:</strong> {job.qualification} / 5
          </p>
          <p className="stars">{job.stars.join(" ")}</p>

          {job.skills && (
            <div className="skills">
              {job.skills.map((skill: any, index: number) => (
                <div key={index}>
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="btn-send">
          <button>Mandar una oferta</button>
        </div>
      </div>
    </div>
  )
}

export default CardDomesticWork
