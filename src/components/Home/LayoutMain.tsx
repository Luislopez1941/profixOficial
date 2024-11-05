"use client";

import React, { useEffect, useState } from 'react';
import './LayoutMain.css';
import Link from 'next/link';
import { Search, MapPin, Navigation } from 'lucide-react';
import APIs from '@/services/APIS';

interface State {
    id: number;
    name: string;
  }
  
  interface City {
    id: number;
    name: string;
    id_state: number; // si las ciudades tienen una relación con un estado
  }
  
  interface Municipality {
    id: number;
    name: string;
    id_city: number; // si los municipios tienen una relación con una ciudad
  }

const LayoutMain = () => {
    const [selectState, setSelectState] = useState<boolean>(false);
    const [selectedState, setSelectedState] = useState<number | null>(null);

    const [states, setStates] = useState<State[]>([])
    const [cities, setCities] = useState<City[]>([])
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

    const handleCompaniesChange = async (state: State) => {
        setSelectedState(state.id);
        let result = (await APIs.getCities(state.id)) as City[];
        setCities(result);
        setSelectState(false);
    };


    const [selectCity, setSelectCity] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<number | null>(null); // Specify the type

    const openSelectCity = () => {
        setSelectCity(!selectCity);
    };

    const handleCityChange = async (city: City) => { // Specify the type
        setSelectedCity(city.id);
        let result = (await APIs.getMunicipalities(city.id)) as Municipality[];
        setMunicipality(result)
        setSelectCity(false);
    };

    const [selectMunicipality, setSelectMunicipality] = useState<boolean>(false);
    const [selectedMunicipality, setSelectedMunicipality] = useState<number | null>(null);

    const openSelectMunicipality = () => {
        setSelectMunicipality(!selectMunicipality);
    };

    const handleMunicipalityChange = async (municipality: Municipality) => {
        setSelectedMunicipality(municipality.id);
        setSelectMunicipality(false);
    };



    return (
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
                            <Navigation strokeWidth={1.5} />
                                <input className='inputs__generic' type="text" placeholder='Buscar tipo de servicio' />
                            </div>
                        </div>
                        <div className='select__container'>
                            <div className='select-btn__general'>
                                <div className={`select-btn ${selectState ? 'active' : ''}`} onClick={openSelectStore}>
                                <MapPin strokeWidth={1.5} />
                                    <div>
                                        <p>{selectedState ? states.find((s) => s.id === selectedState)?.name : 'Selecciona'}</p>
                                        <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                    </div>
                                </div>
                                <div className={`content ${selectState ? 'active' : ''}`}>
                                    <ul className={`options ${selectState ? 'active' : ''}`} style={{ opacity: selectState ? '1' : '0' }}>
                                        {states?.map((state) => (
                                            <li key={state.id} onClick={() => handleCompaniesChange(state)}>
                                                {state.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='select__container'>
                            <div className='select-btn__general'>
                                <div className={`select-btn ${selectCity ? 'active' : ''}`} onClick={openSelectCity}>
                                <MapPin strokeWidth={1.5} />
                                    <div>
                                        <p>{selectedCity ? cities.find((s) => s.id === selectedCity)?.name : 'Ciudad'}</p>
                                        <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                    </div>
                                </div>
                                <div className={`content ${selectCity ? 'active' : ''}`}>
                                    <ul className={`options ${selectCity ? 'active' : ''}`} style={{ opacity: selectCity ? '1' : '0' }}>
                                        {cities?.map((city) => (
                                            <li key={city.id} onClick={() => handleCityChange(city)}>
                                                {city.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='select__container'>
                            <div className='select-btn__general'>
                                <div className={`select-btn ${selectMunicipality ? 'active' : ''}`} onClick={openSelectMunicipality}>
                                <MapPin strokeWidth={1.5} />
                                    <div>
                                        <p>{selectedMunicipality ? municipality?.find((s) => s.id === selectedMunicipality)?.name : 'Municipio'}</p>
                                        <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
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
                        <div className='btn-search'>
                            <Link href='/workers/' className='btn'>
                                Buscar
                                <Search strokeWidth={1.75} />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutMain;
