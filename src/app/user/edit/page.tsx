"use client"

import React, { useRef, useState, ChangeEvent, useEffect } from 'react'
import './EditProfile.css'
import Image from 'next/image'
import userImg from '../../../assets/img/user.jpeg'
import { ArrowUpFromLine } from 'lucide-react';
import APIs from '@/services/APIS'
import useUserStore from '@/zustand/UserStore'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'

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

interface UserData {
  firstName: string;
  firstSurname: string;
  background: string;
  profilePhoto: string;
  typeUser: string;
  skills: []
  phone: string;
  email: string;
  password: string;

  description: string
}


const EditProfile = () => {
  const [skills, setSkills] = useState<Skills[]>([]);

  const userState = useUserStore(state => state.user);
  const userGlobal: UserInfo = userState;

  const [user, setUser] = useState<UserData>()

  const [description, setDescription] = useState<string>()

  const getUser = async () => {
    try {
      let result = await APIs.getUser(userGlobal) as UserData;

      setUser(result);
      setDescription(result.description)
      setSelectedImage(result.profilePhoto)
      setSkills(result.skills)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser()

  }, [])

  console.log(user)



  const [selectedServices, setSelectedServices] = useState<Skills | undefined>(undefined);
  const [selectServices, setSelectServices] = useState<boolean>(false);

  const openSelectServices = () => setSelectServices((prev) => !prev);

  const handleServicesChange = (service: Skills) => {
    setSelectedServices(service);
    setSelectServices(false); // Cerrar el select al seleccionar un servicio
  };

  const handleAddSkill = () => {
    if (selectedServices) {  // Aseguramos que selectedServices no sea undefined
      let find = skills.find((x: { id: number }) => x.id == selectedServices.id);
      if (!find) {
        setSkills([...skills, selectedServices]);  // Solo si selectedServices está definido
        setSelectedServices(undefined);
      }
    } else {
      console.log('selectedServices is undefined');
    }
  };


  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };


  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  const [selectedImage, setSelectedImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validar tipo de imagen
      if (!file.type.startsWith("image/")) {
        toast.error("Archivo no permitido. Por favor, selecciona una imagen.");
        setSelectedImage(''); // Restablecer la imagen seleccionada
        return;
      }

      // Validar tamaño de la imagen
      if (file.size > MAX_IMAGE_SIZE) {
        toast.warning("La imagen es demasiado grande. El tamaño máximo permitido es 5MB.");
        setSelectedImage(''); // Restablecer la imagen seleccionada
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Convertir la imagen a Base64
      };
      reader.readAsDataURL(file); // Convierte la imagen a Base64
    }
  };

  const router = useRouter();
  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const update = async () => {
    // Crear el objeto de datos
    let data: UpdateUserData = {
      id: userGlobal.id,
      type: userGlobal.typeUser,
      profilePhoto: selectedImage, // Asegúrate de que `selectedImage` es Base64
      background: '', // Si tienes fondo, reemplaza esta cadena vacía con el valor adecuado
      description: description,
      skills: skills
    };

    try {
      // Llamar a la API para actualizar el usuario
      await APIs.updateUser(data);

      // Notificar éxito
      toast.success('Usuario actualizado exitosamente');

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/user/profile');
      }, 2000);

    } catch (error) {
      // Manejo de errores: mostrar el error
      console.error('Error al actualizar el usuario:', error);
      toast.error('Hubo un problema al actualizar tu perfil. Intenta de nuevo.');
    }
  };

  console.log(userGlobal)



  return (
    <div className="user__profile">
      <Toaster richColors position="top-right" />
      <div className='backgorund-profile' style={{ backgroundImage: selectedImage ? `url(${selectedImage})` : 'none' }} ></div>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">

            <div className="user-false" onClick={handleDivClick} style={{
              cursor: 'pointer',
              backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              <ArrowUpFromLine strokeWidth={1.25} />
            </div>

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
              <div className="skills-add">
                {skills?.map((skill: Skills, index: number) => (
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
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                  (7.8)
                </div>
                Calificaciones
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /></svg>
                Trabajos
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                Enviar mensaje
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EditProfile
