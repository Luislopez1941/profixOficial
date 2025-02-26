import React, { useEffect, useState } from 'react'
import jobs from './CardJobs.json'
import CardJobs from './CardJobs'
import './styles/Jobs.css'
import {Search} from 'lucide-react';
import { storeJobs } from '@/zustand/Jobs';
import ModalJob from './modalJob/ModalJob';
import APIs from '@/services/APIS';

interface Skills {
    id: number,
    name: string
}

const Jobs = () => {

    const [skills, setSkills] = useState<any>([])

    const fetch = async () => {
        try {
      
        } catch (error) {

        }

    }

    useEffect(() => {
        fetch()
    }, [])

    const services = [
        { id: 1, name: 'Plomero' },
        { id: 2, name: 'Electricista' },
        { id: 3, name: 'Carpintero' },
        { id: 4, name: 'Jardinero' },
        { id: 5, name: 'Pintor' },
        { id: 6, name: 'Albañil' },
        { id: 7, name: 'Gasfitter' },
        { id: 8, name: 'Servicio de limpieza' },
        { id: 9, name: 'Montador de muebles' },
        { id: 10, name: 'Reparador de electrodomésticos' },
    ];

    console.log(skills)
    useEffect(() => {

    }, [skills])

    const setModal = storeJobs(state => state.setModal)
    console.log(jobs)

    const [selectedServices, setSelectedServices] = useState<Skills | undefined>(undefined);
    const [selectServices, setSelectServices] = useState<boolean>(false);

    const openSelectServices = () => setSelectServices((prev) => !prev);

    const handleServicesChange = (service: Skills) => {
        setSelectedServices(service);
        setSelectServices(false);
        setSkills([...skills, service])
        console.log('service', service)
    };

    const [type_service, seTtype_service] = useState<any>(null)

    const [id_municipality, setId_municipality] = useState<any>(null)

    const search = async () => {
        try {
            await APIs.getJobs(type_service, skills, id_municipality)
            // setSkills(response)
        } catch (error) {

        }

    }

    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermLenght, setSearchTermLenght] = useState('');

    const [resultLocalities, setResultLocalities] = useState<any>([])

    const handleSearch = async () => {
        // Llamada a la API o lógica de búsqueda aquí
        let response = await APIs.searchMunicipalities()
    
            setResultLocalities(response)
    

    };

    useEffect(() => {
        handleSearch()
    }, [searchTerm])

    console.log('resultLocalities', resultLocalities)

    const addLocalities = (x: any) => {
        setId_municipality(x.id)
        setSearchTerm(x.name)
        setSearchTermLenght('')
    }

    const handleSearchChnage = (e: any) => {
        setSearchTerm(e.target.value)
        setSearchTermLenght(e.target.value)
    }
  

    return (
        <div className='jobs'>
            <div className='filter'>
                <div className='search'>
                    <div className='container__inputs'>
                        <div className='input'>
                            <div className='input_container'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3zm0 2h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1" /></svg>
                            </div>
                            <input className='inputs__general' value={type_service} onChange={(e) => seTtype_service(e.target.value)} type="text" placeholder='Buscar' />
                        </div>
                        <div className='input two'>
                            <div className='input_container'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                            </div>
                            <input className='inputs__general' value={searchTerm} onChange={(e) => handleSearchChnage(e)} type="text" placeholder='Buscar' />
                            <div className={`container__result_localities ${searchTermLenght.length > 0 ? 'active' : ''}`}>
                                {(resultLocalities && Array.isArray(resultLocalities)) ? (
                                    resultLocalities.map((x: any) => (
                                        <p key={x.id} onClick={() => addLocalities(x)}>{x.name}</p>
                                    ))
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        <div className='btn_search'>
                            <Search onClick={search} style={{ width: '1.4rem', height: '1.4rem' }} />
                        </div>
                    </div>
                </div>
                <div className='filter__select'>
                    <div className='select__container'>
                        <div className='select-btn__general'>
                            <div className={`select-btn ${selectServices ? 'active' : ''}`} onClick={openSelectServices}>
                                <div>
                                    <p>{selectedServices ? selectedServices.name : 'Categoría'}</p>
                                    <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                    </svg>
                                </div>
                            </div>
                            <div className={`content ${selectServices ? 'active' : ''}`}>
                                <ul className={`options ${selectServices ? 'active' : ''}`} style={{ opacity: selectServices ? '1' : '0' }}>
                                    {services.map((service) => (
                                        <li key={service.id} onClick={() => handleServicesChange(service)}>
                                            {service.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='filter__service'>
                    <div className='input'>
                        <input className='inputs__general' placeholder='Buscar' type="text" />
                        <div className='btn_search'>
                            <Search style={{ width: '1.4rem', height: '1.4rem' }} />
                        </div>
                    </div>
                </div> */}
            </div>
            <div className='options'>
                <div className='row__one'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M771-593 630-734l-85 84-85-84 113-114q12-12 27-17.5t30-5.5q16 0 30.5 5.5T686-848l85 85q18 17 26.5 39.5T806-678q0 23-8.5 45T771-593ZM220-409q-18-18-18-42.5t18-42.5l98-99 85 85-99 99q-17 18-41.5 18T220-409Zm-43 297q-11-12-17-26.5t-6-30.5q0-16 5.5-30.5T177-226l283-282-127-128q-18-17-18-41.5t18-42.5q17-18 42-18t43 18l127 127 57-57 112 114q12 12 12 28t-12 28q-12 12-28 12t-28-12L290-112q-12 12-26.5 17.5T234-89q-15 0-30-6t-27-17Z" /></svg>
                        <p>Plomería</p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-320v-320q0-17 11.5-28.5T160-680h640q17 0 28.5 11.5T840-640v320q0 17-11.5 28.5T800-280H160q-17 0-28.5-11.5T120-320Z" /></svg>
                        <p>Albañilería</p>
                    </div>
                    <div>
                        <p>Servicios de limpieza</p>
                    </div>
                    <div>
                        <p>Cerrajería</p>
                    </div>
                </div>
                <div className='row__two'>
                    <button className='btn__create-job' onClick={() => setModal('create-new_job')}>Publicar un trabajo</button>
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
