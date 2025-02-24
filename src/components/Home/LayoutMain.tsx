"use client";

import React, { useEffect, useState } from 'react';
import './LayoutMain.css';
import { Search, MapPin } from 'lucide-react';
import APIs from '@/services/APIS';
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from 'zustand';
import { storeGlobal } from '@/zustand/GlobalVariations';


interface State {
    id: number;
    name: string;
}

interface Localities {
    id: number;
    name: string;
    id_city: number; // si las ciudades tienen una relación con un estado
}

interface Municipality {
    id: number;
    name: string;
    id_state: number; 
 // si los municipios tienen una relación con una ciudad
}

const LayoutMain = () => {
    const [selectState, setSelectState] = useState<boolean>(false);
    const [selectedState, setSelectedState] = useState<number | null>(null);
    const router = useRouter();
    const setData = storeGlobal(state => state.setData)
    const { data } = useStore(storeGlobal);
    const [states, setStates] = useState<State[]>([])
    const [localities, setLocalities] = useState<Localities[]>([])
    const [municipality, setMunicipality] = useState<Municipality[]>([])


    const fetch = async () => {
        try {
            let resultStates = (await APIs.getStates()) as State[];
            console.log(resultStates)
            setStates(resultStates)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetch()
    }, [])




    const openSelectStore = () => {
        setSelectState(!selectState);
    };

    const handleStateChange = async (state: State) => {
        setSelectedState(state.id);
        setSelectState(false);
        let response = (await APIs.getMunicipalities(state.id)) as Municipality[];
        setMunicipality(response);

    };


    const [selectlocalities, setSelectLocalities] = useState<boolean>(false);
    const [selectedlocality, setSelectedLocality] = useState<number | null>(null); // Specify the type

    const openSelectLocalities = () => {
        setSelectLocalities(!selectlocalities);
    };

    const handleMunicipalityChange = async (municipality: Municipality) => {
        setSelectedMunicipality(municipality.id);
        setSelectMunicipality(false);
        let response = (await APIs.getLocalities(municipality.id)) as Localities[];
        setLocalities(response)
    };


    const handleLocalitiesChange = async (locality: Localities) => { // Specify the type
        setSelectedLocality(locality.id);
        setSelectLocalities(false);
        

    };

    const [selectMunicipality, setSelectMunicipality] = useState<boolean>(false);
    const [selectedMunicipality, setSelectedMunicipality] = useState<number | null>(null);

    const openSelectMunicipality = () => {
        setSelectMunicipality(!selectMunicipality);
    };

   
    const [typeServive, setTypeService] = useState<string>('')



    const searchUser = () => {
        let data = {
            type: 'get-user',
            type_service: typeServive,
            id_state: selectedState,
            id_locality: selectedlocality,
            id_municipality: selectedMunicipality
        };

        setData(data);
        localStorage.setItem('filter', JSON.stringify(data));  // Aquí se usa JSON.stringify
        router.push('/workers');
    };



    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className='layout'>
                    <div className='layout__container'>
                        <div className='text__search'>
                            <div>
                                <p className='text__main'>Donde buscar un servicio es Fácil y Seguro</p>
                            </div>
                            <div className='warning'>
                                <p>
                                    Revisa la calificación de los trabajadores para asegurar un trabajo de calidad
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-shield-half"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.998 2l.032 .002l.086 .005a1 1 0 0 1 .342 .104l.105 .062l.097 .076l.016 .015l.247 .21a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.791 -2.75l.046 -.036l.053 -.041a1 1 0 0 1 .217 -.112l.075 -.023l.036 -.01a1 1 0 0 1 .12 -.022l.086 -.005zm.002 2.296l-.176 .135a13 13 0 0 1 -7.288 2.572l-.264 .006l-.064 .31a11 11 0 0 0 1.064 7.175l.17 .314a11 11 0 0 0 6.49 5.136l.068 .019z" /></svg>
                                </p>
                            </div>
                        </div>
                        <div className='search'>
                            <div className='row__one'>
                                <div>
                                    <div className='inputs__general_icons'>
                                        <Search className='icon-left' strokeWidth={1.75} />
                                        <input className='inputs__generic' type="text" placeholder='Buscar tipo de servicio' value={typeServive} onChange={(e) => setTypeService(e.target.value)} />
                                    </div>
                                </div>
                                <div className='select__container'>
                                    <div className='select-btn__general'>
                                        <div className={`select-btn ${selectState ? 'active' : ''}`} onClick={openSelectStore}>
                                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24" height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                                            <div>
                                                <p>{selectedState ? states.find((s) => s.id === selectedState)?.name : 'Estado'}</p>
                                                <svg className='chevron__down' fill='currentColor' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                            </div>
                                        </div>
                                        <div className={`content ${selectState ? 'active' : ''}`}>
                                            <ul className={`options ${selectState ? 'active' : ''}`} style={{ opacity: selectState ? '1' : '0' }}>
                                                {states?.map((state) => (
                                                    <li key={state.id} onClick={() => handleStateChange(state)}>
                                                        {state.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='select__container'>
                                    <div className='select-btn__general'>
                                        <div className={`select-btn ${selectMunicipality ? 'active' : ''}`} onClick={openSelectMunicipality}>
                                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24" height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>

                                            <div>
                                                <p>{selectedMunicipality ? municipality?.find((s) => s.id === selectedMunicipality)?.name : 'Municipio'}</p>
                                                <svg className='chevron__down' fill='currentColor' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                            </div>
                                        </div>
                                        <div className={`content ${selectMunicipality ? 'active' : ''}`}>
                                            <ul className={`options ${selectMunicipality ? 'active' : ''}`} style={{ opacity: selectMunicipality ? '1' : '0' }}>
                                                {municipality?.map((municipality) => (
                                                    <li key={municipality.id} onClick={() => handleMunicipalityChange(municipality)}>
                                                        {municipality.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='select__container'>
                                    <div className='select-btn__general'>
                                        <div className={`select-btn ${selectlocalities ? 'active' : ''}`} onClick={openSelectLocalities}>
                                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24" height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>

                                            <div>
                                                <p>{selectedlocality ? localities?.find((s) => s.id === selectedlocality)?.name : 'Localidad/Ciudad'}</p>
                                                <svg className='chevron__down' fill='currentColor' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                            </div>
                                        </div>
                                        <div className={`content ${selectlocalities ? 'active' : ''}`}>
                                            <ul className={`options ${selectlocalities ? 'active' : ''}`} style={{ opacity: selectlocalities ? '1' : '0' }}>
                                                {localities?.map((locality) => (
                                                    <li key={locality.id} onClick={() => handleLocalitiesChange(locality)}>
                                                        {locality.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='btn-search'>
                                    <button className='btn' onClick={searchUser}>
                                        Buscar
                                        <Search strokeWidth={1.75} />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LayoutMain;
