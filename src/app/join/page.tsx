'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import APIs from '@/services/APIS';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FormData {
    first_name: string;
    first_surname: string;
    phone: string;
    email: string;
    password: string;
    id_state: number | null;
    id_city: number | null;
    id_municipality: number | null;
}

interface State {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
    id_state: number; 
}

interface Municipality {
    id: number;
    name: string;
    id_city: number; 
}

const Page: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        first_surname: '',
        phone: '',
        email: '',
        password: '',
        id_state: null,
        id_city: null,
        id_municipality: null
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await APIs.customerRegistration(formData);
            router.push('/join/success');
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    const [next, setNext] = useState<number>(0);
    const [selectState, setSelectState] = useState<boolean>(false);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

    const fetchStates = async () => {
        try {
            const resultStates = await APIs.getStates() as State[];
            setStates(resultStates);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    useEffect(() => {
        fetchStates();
    }, []);

    const openSelectState = () => {
        setSelectState(prev => !prev);
    };

    const handleStateChange = async (state: State) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            id_state: state.id
        }));
        try {
            const result = await APIs.getCities(state.id) as City[];
            setCities(result);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
        setSelectState(false);
    };

    const [selectCity, setSelectCity] = useState<boolean>(false);
    
    const openSelectCity = () => {
        setSelectCity(prev => !prev);
    };

    const handleCityChange = async (city: City) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            id_city: city.id
        }));
        try {
            const result = await APIs.getMunicipalities(city.id) as Municipality[];
            setMunicipalities(result);
        } catch (error) {
            console.error("Error fetching municipalities:", error);
        }
        setSelectCity(false);
    };

    const [selectMunicipality, setSelectMunicipality] = useState<boolean>(false);

    const openSelectMunicipality = () => {
        setSelectMunicipality(prev => !prev);
    };

    const handleMunicipalityChange = (municipality: Municipality) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            id_municipality: municipality.id
        }));
        setSelectMunicipality(false);
    };

    
    const openSelectStore = () => {
        setSelectState(!selectState);
    };

    const handleCompaniesChange = async (state: State) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            id_state: state.id
        }));
        let result = (await APIs.getCities(state.id)) as City[];
        setCities(result);
        setSelectState(false);
    };


 


    return (
        <div className='join'>
            <div className='join__container'>
                <div className='left'>
                    <div>
                        {/* Puedes agregar contenido adicional aquí */}
                    </div>
                </div>
                <div className='right'>
                    <AnimatePresence>
                        <div>
                        {next === 0 ? (
                            <motion.div 
                                key="form"
                                initial={{opacity: 0 }}
                                animate={{opacity: 1 }}
                                transition={{ ease: "linear", duration: 1.5 }}
                                className='form__join'
                            >
                                <div className='titles'>
                                    <h2 className='title__main'>Crear cuenta</h2>
                                    <div className='title__warning'>
                                        <p>Inicia sesión para ser parte de nuestra comunidad de profesionales.</p>
                                    </div>
                                </div>
                                <div className='form__join_container'>
                                    <div className='row__one'>
                                        <input className='inputs__general' type="text" name="first_name" placeholder="Primer nombre" value={formData.first_name} onChange={handleChange} autoComplete="given-name" />
                                        <input className='inputs__general' type="text" name="first_surname" placeholder="Primer apellido" value={formData.first_surname} onChange={handleChange} autoComplete="given-name" />
                                    </div>
                                    <div className='row__two'>
                                        <input className='inputs__general' type="text" name="phone" placeholder="Numero telefonico" value={formData.phone} onChange={handleChange} autoComplete="given-name" />
                                        <input className='inputs__general' type="email" name="email" placeholder="Correo electronico" value={formData.email} onChange={handleChange} autoComplete="given-name" />
                                    </div>
                                    <div className='row__three'>
                                        <input className='inputs__general' type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} autoComplete="given-name" />
                                    </div>
                                    <div className='btn'>
                                        <button className='btn__create' type="button" onClick={() => setNext(1)}>Crear cuenta</button>
                                    </div>
                                </div>
                                {/* <div className='h-line'>
                                    <p>Iniciar sesión con</p>
                                </div> */}
                                {/* <div className='logins'>
                                    <div>
                                        <p>Iniciar sesión con Google</p>
                                    </div>
                                    <div>
                                        <p>Iniciar sesión con Facebook</p>
                                    </div>
                                </div> */}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="location"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ ease: "linear", duration: 1.5 }}
                                className={`form__join-finally`}
                            >
                                <div className='btn-back' onClick={() => setNext(0)}>Regresar</div>
                                <p className='title'>Ubicacion</p>
                                <p>Seleciona tu localidad para prestar tus servcios como profecional</p>
                                <form onSubmit={handleSubmit}>
                                    <div className='select__container'>
                                        <div className='select-btn__general'>
                                            <div className={`select-btn ${selectState ? 'active' : ''}`} onClick={openSelectStore}>
                                                <MapPin strokeWidth={1.5} />
                                                <div>
                                                    <p>{formData.id_state ? states.find((s) => s.id === formData.id_state)?.name : 'Selecciona'}</p>
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
                                    <div className='select__container my-4'>
                                        <div className='select-btn__general'>
                                            <div className={`select-btn ${selectCity ? 'active' : ''}`} onClick={openSelectCity}>
                                                <MapPin strokeWidth={1.5} />
                                                <div>
                                                    <p>{formData.id_city ? cities.find((s) => s.id === formData.id_city)?.name : 'Ciudad'}</p>
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
                                                    <p>{formData.id_municipality ? municipalities?.find((s) => s.id === formData.id_municipality)?.name : 'Municipio'}</p>
                                                    <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                                </div>
                                            </div>
                                            <div className={`content ${selectMunicipality ? 'active' : ''}`}>
                                                <ul className={`options ${selectMunicipality ? 'active' : ''}`} style={{ opacity: selectMunicipality ? '1' : '0' }}>
                                                    {municipalities?.map((municipality) => (
                                                        <li key={municipality.id} onClick={() => handleMunicipalityChange(municipality)}>
                                                            {municipality.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='container__btn'>
                                        <button className='btn__create-join' type="submit">Finalizar</button>
                                    </div>
                                </form>
                             
                            </motion.div>
                        )}
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Page;
