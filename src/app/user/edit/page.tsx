"use client"

import React, { useRef, useState, ChangeEvent } from 'react'
import './EditProfile.css'
import Image from 'next/image'
import userImg from '../../../assets/img/user.jpeg'
import Link from 'next/link';
import { ArrowUpFromLine } from 'lucide-react';
import APIs from '@/services/APIS'
import useUserStore from '@/zustand/UserStore'

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

interface Skills {
  id: number,
  name: string
}


interface Skill {
  name: string; // Define la habilidad con un nombre
}

type SkillsArray = Skill[]; // Define un tipo que es un arreglo de habilidades

// Interfaz para los datos de actualización del usuario
interface UpdateUserData {
  id: any; // ID del usuario
  type: string; // Tipo de usuario
  profilePhoto: string;
  background: string; // Ruta de la imagen de perfil
  description?: string; // Descripción del usuario (opcional)
  skills: SkillsArray; // Arreglo de habilidades
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
  typeUser: string;
  token: string;
 
};

const EditProfile = () => {
  const [skills, setSkills] = useState<Skills[]>([]);

  const userState = useUserStore(state => state.user);
  const userGlobal: UserInfo = userState;

  const [description, setDescription] = useState<string>()

  const [selectedServices, setSelectedServices] = useState<Skills | undefined>(undefined);
  const [selectServices, setSelectServices] = useState<boolean>(false);

  const openSelectServices = () => setSelectServices((prev) => !prev);

  const handleServicesChange = (service: Skills) => {
    setSelectedServices(service);
    setSelectServices(false); // Cerrar el select al seleccionar un servicio
  };

  const handleAddSkill = () => {
    if (selectedServices && !skills.some((s) => s.id === selectedServices.id)) {
      setSkills([...skills, selectedServices]);
      setSelectedServices(undefined);
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const user = ''

  const [selectedImage, setSelectedImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Función para manejar el cambio de archivo
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // `reader.result` contiene la imagen en Base64
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file); // Esto convierte la imagen a Base64
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const update = async () => {
    let data: UpdateUserData = {
        id: userGlobal.id,
        type: userGlobal.typeUser,
        profilePhoto: selectedImage,
        background: '',
        description: description,
        skills: skills 
    };

    await APIs.updateUser(data);
};



  return (
    <div className="user__profile">
      <div className='backgorund-profile' style={{ backgroundImage: selectedImage ? `url(${selectedImage})` : 'none'}} ></div>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            {user ?
              <div className='urser-true'>
                <Image src={userImg} alt="Anna Smith" width={150} height={150} />
              </div>
              :
              <div className="user-false" onClick={handleDivClick} style={{
                cursor: 'pointer',
                backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                <ArrowUpFromLine strokeWidth={1.25} />
              </div>
            }
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <span></span>
          </div>
          <div className='profile-information__container'>
            <div className='name__conatiner'>
              <p className='name'>Juan Jose Hernandez Guzman</p>
            </div>
            <div className='btn__edit_container'>
              <button className='btn__general-purple' onClick={update}>Guardar perfil</button>
            </div>
            <div className="skills__container">
              <div className='add'>
                <div className='select__container'>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectServices ? 'active' : ''}`} onClick={openSelectServices}>
      
                      <div>
                        <p>{selectedServices ? selectedServices.name : 'Selecciona'}</p>
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
                <button onClick={handleAddSkill} className="add-skill-button">
                  Agregar
                </button>
              </div>
              <div className="skills-list">
                {skills.map((skill: Skills, index: number) => (
                  <div key={index} className="skill-item">
                    <span>{skill.name}</span>
                    <button onClick={() => handleRemoveSkill(index)} className="remove-skill-button">X</button>
                  </div>
                ))}
              </div>
            </div>
            <div className='description'>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='textarea__general' placeholder='Descripción'></textarea>
            </div>
            <ul className="about">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                Calificaciones
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3zm0 2h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1" /></svg>
                Trabajos
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-message"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-4.724l-4.762 2.857a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2h-1a4 4 0 0 1 -3.995 -3.8l-.005 -.2v-8a4 4 0 0 1 4 -4zm-4 9h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m2 -4h-8a1 1 0 1 0 0 2h8a1 1 0 0 0 0 -2" /></svg>
                Enviar mensaje
              </li>
            </ul>
            <div></div>

            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam
                erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl
                ligula egestas nulla.
              </p>

              <ul>
                <li><i className="fab fa-twitter"></i></li>
                <i className="fab fa-pinterest"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-dribbble"></i>
              </ul>
            </div>
          </div>
        </div>
        <div className="right__col">
          <nav>
            <ul>
              <li><a href="">Trabajos</a></li>
              <li><a href="">Fotos</a></li>
            </ul>
            <button>Follow</button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
