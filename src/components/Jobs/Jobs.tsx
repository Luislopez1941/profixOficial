import React from 'react'
import jobs from './CardJobs.json'
import CardJobs from './CardJobs'
import './styles/Jobs.css'
import { Wrench, Zap, Search, ChevronDown, Magnet } from 'lucide-react';
import { storeJobs } from '@/zustand/Jobs';
import ModalJob from './modalJob/ModalJob';

const Jobs = () => {

const setModal = storeJobs(state => state.setModal)
    console.log(jobs)

    return (
        <div className='jobs'>
            <div className='search'>
                <input className='inputs__general' type="text" placeholder='Buscar  '/>
                <div className='btn_search'>
                    <Search style={{ width: '1.4rem', height: '1.4rem' }} />
                </div>
            </div>
            <div className='options'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M771-593 630-734l-85 84-85-84 113-114q12-12 27-17.5t30-5.5q16 0 30.5 5.5T686-848l85 85q18 17 26.5 39.5T806-678q0 23-8.5 45T771-593ZM220-409q-18-18-18-42.5t18-42.5l98-99 85 85-99 99q-17 18-41.5 18T220-409Zm-43 297q-11-12-17-26.5t-6-30.5q0-16 5.5-30.5T177-226l283-282-127-128q-18-17-18-41.5t18-42.5q17-18 42-18t43 18l127 127 57-57 112 114q12 12 12 28t-12 28q-12 12-28 12t-28-12L290-112q-12 12-26.5 17.5T234-89q-15 0-30-6t-27-17Z" /></svg>
                    <p>Plomería</p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-320v-320q0-17 11.5-28.5T160-680h640q17 0 28.5 11.5T840-640v320q0 17-11.5 28.5T800-280H160q-17 0-28.5-11.5T120-320Z" /></svg>
                    <p>Albañilería</p>
                </div>
                <div>
                    <p>Servicios de limpieza</p>
                </div>
                <div>
                    <p>Cerrajería</p>
                </div>
            </div>
            <div className='row__three'>
                <button className='btn__create-job' onClick={() => setModal('create-new_job')}>Publicar un trabajo</button>
            </div>
            <div className='cards__job'>
                {jobs.jobs.map((x: any) => (
                    <CardJobs job={x} />
                ))}
            </div>
            <ModalJob />
        </div>
    )
}

export default Jobs
