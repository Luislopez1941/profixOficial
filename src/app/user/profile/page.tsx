"use client";


import React, { useEffect, useState } from 'react'
import './Profile.css'
import { User } from 'lucide-react';
import Link from 'next/link';
import APIs from '@/services/APIS';
import useUserStore from '@/zustand/UserStore';


interface UserInfo {
  id: number;
  name: string;
  email: string;
  typeUser: string;
  token: string;
 
};

interface UserData {
  first_name: string;
  second_name: String;
  first_surname: string;
  second_last_name: string;
  background: string;
  profilePhoto: string;
  typeUser: string;
  skills: []
  phone: string;
  email: string;
  password: string;

  description: string
}


const Profile = () => {
  const userState = useUserStore(state => state.user);
  const userGlobal: UserInfo = userState;

  const [user, setUser] = useState<UserData>()

  const getUser = async () => {
    try {
      let result = await APIs.getUser(userGlobal) as UserData;
     
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser()
 
  }, [])




  return (
    <div className="user__profile">
      <div className='backgorund-profile'></div>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            {user?.profilePhoto ?
              <div className='user-true' style={{ backgroundImage: `url(${user?.profilePhoto})` }}>
              </div>
              :
              <div className='user-false'>
                <User strokeWidth={1.25} />
              </div>
            }
          
          </div>
          <div className='profile-information__container'>
            <div className='name__conatiner'>
              <p className='name'>{user?.first_name} {user?.second_name} {user?.first_surname} {user?.second_last_name}</p>
            </div>
            <div className='btn__edit_container'>
              <Link href='/user/edit' className='btn__general-purple'>Editar perfil</Link>
            </div>
            <div className='skills__contaiiner'>
              {user?.skills?.map((x: any) => (
                <p>{x.name}</p>
              ))}
            </div>
            <div className='description'>
                <p>
                  {user?.description}
                </p>
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
              <svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /></svg>
                Trabajos
                </li>
              <li>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                Enviar mensaje
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
