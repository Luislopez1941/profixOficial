import React, { useEffect, useState } from 'react'
// import jobs from './CardJobs.json'
import CardJobs from './CardJobs'
import './styles/Jobs.css'
import { Search } from 'lucide-react';
import { storeJobs } from '@/zustand/Jobs';
import ModalJob from './modalJob/ModalJob';
import APIs from '@/services/APIS';
import useUserStore from '@/zustand/UserStore';
import Send from './modalSend/Send';

interface Skills {
    id: number,
    name: string
}

const Jobs = () => {
    const userState = useUserStore(state => state.user);
    const [jobs, setJobs] = useState<any>([])
    const user: any = userState;
    

    const [skills, setSkills] = useState<any>([])


    const fetch = async () => {
        try {
            let response = await APIs.getJobs('', skills, user.id_municipality)
            setJobs(response)
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

    useEffect(() => {

    }, [skills])

    const setModal = storeJobs(state => state.setModal)


    const [selectedServices, setSelectedServices] = useState<Skills | undefined>(undefined);
    const [selectServices, setSelectServices] = useState<boolean>(false);

    const openSelectServices = () => setSelectServices((prev) => !prev);

    const handleServicesChange = (service: Skills) => {
        setSelectedServices(service);
        setSelectServices(false);
        setSkills([...skills, service])
        console.log('service', service)
    };

    const [job_title, setJob_title] = useState<any>(null)

    const [id_municipality, setId_municipality] = useState<any>(null)

    const search = async () => {
        try {
            let response: any = await APIs.getJobs(job_title, skills, id_municipality)
            console.log(response)
            setJobs(response)
        } catch (error) {

        }

    }

    console.log('jobs', jobs)

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchTermLenght, setSearchTermLenght] = useState('');

    const [resultLocalities, setResultLocalities] = useState<any>([])

    const handleSearch = async () => {
        // Llamada a la API o lógica de búsqueda aquí
        let response = await APIs.searchMunicipalities(searchTerm)
        setResultLocalities(response)


    };

    useEffect(() => {
        handleSearch()
    }, [searchTerm])

    console.log('user', user)

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
                            <input className='inputs__general' value={job_title} onChange={(e) => setJob_title(e.target.value)} type="text" placeholder='Buscar' />
                        </div>
                        <div className={`input_container_main ${searchTermLenght.length > 0 ? 'localities' : ''}`}>
                            <div className={`input two `}>
                                <div className='input_container'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                                </div>
                                <input className={`inputs__general `} value={searchTerm} onChange={(e) => handleSearchChnage(e)} type="text" placeholder='Buscar' />
                                <div className={`container__result_localities ${searchTermLenght.length > 0 ? 'active' : ''}`}>
                                    {(resultLocalities && Array.isArray(resultLocalities)) ? (
                                        resultLocalities.map((x: any) => (
                                            <div className='options__localities_container'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                                                <p key={x.id} onClick={() => addLocalities(x)}>{x.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div>
                    <div className='btn_search' onClick={search}>
                        <p className='text'>Buscar</p>
                        <Search className='icon'  style={{ width: '1.4rem', height: '1.4rem' }} />
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
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-bed"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 6a1 1 0 0 1 .993 .883l.007 .117v6h6v-5a1 1 0 0 1 .883 -.993l.117 -.007h8a3 3 0 0 1 2.995 2.824l.005 .176v8a1 1 0 0 1 -1.993 .117l-.007 -.117v-3h-16v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-11a1 1 0 0 1 1 -1z" /><path d="M7 8a2 2 0 1 1 -1.995 2.15l-.005 -.15l.005 -.15a2 2 0 0 1 1.995 -1.85z" /></svg>
                        <p>Hoteleria</p>
                    </div>
                    <div>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-soup"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 10a2 2 0 0 1 2 2v.5c0 1.694 -2.247 5.49 -3.983 6.983l-.017 .013v.504a2 2 0 0 1 -1.85 1.995l-.15 .005h-8a2 2 0 0 1 -2 -2v-.496l-.065 -.053c-1.76 -1.496 -3.794 -4.965 -3.928 -6.77l-.007 -.181v-.5a2 2 0 0 1 2 -2z" /><path d="M11.417 3.188a1 1 0 1 1 1.166 1.624c-.375 .27 -.593 .706 -.583 1.209a1.4 1.4 0 0 0 .583 1.167a1 1 0 1 1 -1.166 1.624a3.38 3.38 0 0 1 -1.417 -2.791a3.4 3.4 0 0 1 1.417 -2.833" /><path d="M15.417 3.188a1 1 0 1 1 1.166 1.624c-.375 .27 -.593 .706 -.583 1.209a1.4 1.4 0 0 0 .583 1.167a1 1 0 1 1 -1.166 1.624a3.38 3.38 0 0 1 -1.417 -2.791a3.4 3.4 0 0 1 1.417 -2.833" /><path d="M7.417 3.188a1 1 0 1 1 1.166 1.624c-.375 .27 -.593 .706 -.583 1.209a1.4 1.4 0 0 0 .583 1.167a1 1 0 1 1 -1.166 1.624a3.38 3.38 0 0 1 -1.417 -2.791a3.4 3.4 0 0 1 1.417 -2.833" /></svg>
                        <p>Restaurantes</p>
                    </div>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-160q-50 0-85-35t-35-85H80q-17 0-28.5-11.5T40-320v-400q0-33 23.5-56.5T120-800h480q33 0 56.5 23.5T680-720v80h80q19 0 36 8.5t28 23.5l88 117q4 5 6 11t2 13v147q0 17-11.5 28.5T880-280h-40q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240Zm480 0q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120Z"/></svg>
                        <p>Logística y Transporte</p>
                    </div>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M714-162 537-339l84-84 177 177q17 17 17 42t-17 42q-17 17-42 17t-42-17Zm-552 0q-17-17-17-42t17-42l234-234-68-68q-11 11-28 11t-28-11l-23-23v90q0 14-12 19t-22-5L106-576q-10-10-5-22t19-12h90l-22-22q-12-12-12-28t12-28l114-114q20-20 43-29t47-9q20 0 37.5 6t34.5 18q8 5 8.5 14t-6.5 16l-76 76 22 22q11 11 11 28t-11 28l68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q8 0 15 .5t14 2.5q9 3 11.5 12.5T737-809l-65 65q-6 6-6 14t6 14l44 44q6 6 14 6t14-6l65-65q7-7 16.5-5t12.5 12q2 7 2.5 14t.5 15q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L246-162q-17 17-42 17t-42-17Z"/></svg>
                        <p>Construcción</p>
                    </div>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q134 0 227 93t93 227q0 134-93 227t-227 93Zm0-80q100 0 170-70t70-170q0-17-2.5-33.5T710-546q-15 3-30 4.5t-30 1.5q-63 0-120-24t-102-70q-28 57-77 99t-111 61q3 98 72.5 166T480-240ZM380-400q-17 0-28.5-11.5T340-440q0-17 11.5-28.5T380-480q17 0 28.5 11.5T420-440q0 17-11.5 28.5T380-400Zm200 0q-17 0-28.5-11.5T540-440q0-17 11.5-28.5T580-480q17 0 28.5 11.5T620-440q0 17-11.5 28.5T580-400ZM40-760v-80q0-33 23.5-56.5T120-920h80q17 0 28.5 11.5T240-880q0 17-11.5 28.5T200-840h-80v80q0 17-11.5 28.5T80-720q-17 0-28.5-11.5T40-760ZM200-40h-80q-33 0-56.5-23.5T40-120v-80q0-17 11.5-28.5T80-240q17 0 28.5 11.5T120-200v80h80q17 0 28.5 11.5T240-80q0 17-11.5 28.5T200-40Zm640 0h-80q-17 0-28.5-11.5T720-80q0-17 11.5-28.5T760-120h80v-120h80v120q0 33-23.5 56.5T840-40Zm0-720v-80h-80q-17 0-28.5-11.5T720-880q0-17 11.5-28.5T760-920h80q33 0 56.5 23.5T920-840v80q0 17-11.5 28.5T880-720q-17 0-28.5-11.5T840-760Z"/></svg>
                        <p>Seguridad </p>
                    </div>
                    <div>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-device-imac"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 22a1 1 0 0 1 0 -2h.616l.25 -2h-4.866a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-4.867l.25 2h.617a1 1 0 0 1 0 2zm5.116 -4h-2.233l-.25 2h2.733z" /></svg>
                        <p>Oficina</p>
                    </div>
                   
                </div>
            
            </div>
          
            <div className='cards__job'>
                {jobs?.map((x: any) => (
                    <CardJobs job={x} />
                ))}
            </div>
            <ModalJob />
        </div>
    )
}

export default Jobs
