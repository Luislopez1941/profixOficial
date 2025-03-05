'use client'

import React, { useState } from 'react'
import { storeLogin } from '@/zustand/Login'
import './FormCreate.css'

interface FormData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}

const FormCreate: React.FC = () => {
    const setFormStatus = storeLogin(state => state.setFormStatus)

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);


    };



    return (
        <form className='form__login' onSubmit={handleSubmit}>
            <div className='titles'>
                <h2 className='title__main'>Crear cuenta</h2>
                <div className='title__warning'>
                    <p>Inicia sesión para ser parte de nuestra comunidad de profesionales.</p>
                </div>
            </div>
            <div className='form__login_create_container'>
                <div className='row__one'>
                    <div>

                        <input
                            className='inputs__general'
                            type="text"
                            name="firstName"
                            placeholder="Primer nombre"
                            value={formData.firstName}
                            onChange={handleChange}
                            autoComplete="given-name"
                        />
                    </div>
                    <div>
                        <input
                            className='inputs__general'
                            type="text"
                            name="lastName"
                            placeholder="Primer apellido"
                            value={formData.lastName}
                            onChange={handleChange}
                            autoComplete="given-name"
                        />
                    </div>
                </div>
                <div>

                    <input
                        className='inputs__general'
                        type="text"
                        name="phone"
                        placeholder="Numero telefonico"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="given-name"
                    />
                </div>
                <div className='email'>

                    <input
                        className='inputs__general'
                        type="email"
                        name="email"
                        placeholder="Correo electronico"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="given-name"
                    />
                </div>
                <div className='password'>

                    <input
                        className='inputs__general'
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="given-name"
                    />
                </div>
            </div>
            <div className='btn'>
                <button className='btn__create' type="submit">Crear cuenta</button>
            </div>
            <div className='btn__change'>
                <button className='btn' type="button" onClick={() => setFormStatus(false)}>Iniciar sesión</button>
            </div>
        </form>
    )
}

export default FormCreate
