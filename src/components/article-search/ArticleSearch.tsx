import React, { useEffect, useState } from 'react'
import result from './CardJobs.json'
import CardDomesticWork from './CardArticleSearch'
import './styles/ArticleSearch.css'
import { Search } from 'lucide-react';
import { storeJobs } from '@/zustand/Jobs';
import ModalDomesticWork from './modalArticleSearch/ModalArticleSearch';
import APIs from '@/services/APIS';
import useUserStore from '@/zustand/UserStore';


interface Skills {
    id: number,
    name: string
}

const ArticleSearch = () => {
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

    const [searchTermCT, setSearchTermCT] = useState<string>('');
    const [searchTermLenghtCT, setSearchTermLenghtCT] = useState('');

    console.log('searchTermCT', searchTermCT)

    const [resultCategorySearch, setResultCategorySearch] = useState<any>([])

    const handleCategorySearch = async () => {
        // Llamada a la API o lógica de búsqueda aquí
        // let response = await APIs.searchMunicipalities(searchTerm)
        // setResultLocalities(response)
    };

    const addCategorySearch = (x: any) => {
        setSearchTermCT(x.name)
        setSearchTermLenghtCT('')
    }

    const handleCategorySearchChange = (e: any) => {
        console.log(e.target.value)
        setSearchTermCT(e.target.value)
        setSearchTermLenghtCT(e.target.value)
    }


    useEffect(() => {
        handleSearch()
    }, [searchTerm])

    useEffect(() => {
        handleCategorySearch()
    }, [searchTermCT])



    const addLocalities = (x: any) => {
        setId_municipality(x.id)
        setSearchTerm(x.name)
        setSearchTermLenght('')
    }

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value)
        setSearchTermLenght(e.target.value)
    }

    console.log(result)

    return (
        <div className='article__search'>
            <div className='filter'>
                <div className='search'>
                    <div className='container__inputs'>
                        <div className={`input_container_main ${searchTermLenghtCT.length > 0 ? 'category_search' : ''}`}>
                            <div className='input one'>
                                <div className='input_container'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Z" /></svg>                            </div>
                                <input className='inputs__general' value={searchTermCT} onChange={(e) => handleCategorySearchChange(e)} type="text" placeholder='Buscar' />
                                <div className={`container__result_category_search ${searchTermLenghtCT.length > 0 ? 'active' : ''}`}>
                                    {(resultCategorySearch && Array.isArray(resultCategorySearch)) ? (
                                        resultCategorySearch.map((x: any) => (
                                            <div className='options__category_search'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                                                <p key={x.id} onClick={() => addCategorySearch(x)}>{x.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={`input_container_main ${searchTermLenght.length > 0 ? 'localities' : ''}`}>
                            <div className={`input two `}>
                                <div className='input_container'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                                </div>
                                <input className={`inputs__general `} value={searchTerm} onChange={(e) => handleSearchChange(e)} type="text" placeholder='Buscar' />
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
                        <Search className='icon' style={{ width: '1.4rem', height: '1.4rem' }} />
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
            
            <div className='row__three'>
                <button className='btn__create-job' onClick={() => setModal('create-new_job')}>Publicar un trabajo</button>
            </div>
            <div className='cards__job'>
                {result?.map((x: any) => (
                    <CardDomesticWork job={x} />
                ))}
            </div>
            <ModalDomesticWork />
        </div>
    )
}

export default ArticleSearch
