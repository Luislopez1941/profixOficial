"use client";


import React, { useEffect, useState } from 'react'
import APIs from '@/services/APIS';
import useUserStore from '@/zustand/UserStore';
import { User } from 'lucide-react';
import Link from 'next/link';
import './Profile.css'
import { motion, AnimatePresence } from 'framer-motion';

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
  typeUser: string;
  phone: string;
  email: string;
  password: string;
  profile: string;
  description: string
}


const page = () => {
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
    <AnimatePresence>
      <motion.div
        key="workers"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="user__profile">
          <div className='backgorund-profile'></div>
          <div className="cols__container">
            <div className="left__col">
              <div className="img__container">
                {user?.profile ?
                  <div className='user-true' style={{ backgroundImage: `url(${user?.profile})` }}>
                  </div>
                  :
                  <div className='user-false'>
                    <User strokeWidth={1.25} />
                  </div>
                }
                <span></span>
              </div>
              <div className='profile-information__container'>
                <div className='name__conatiner'>
                  <p className='name'>{user?.firstName} {user?.firstSurname}</p>
                </div>
                <div className='skills__contaiiner'>
                  <p>Plomero</p>
                  <p>Electicista</p>
                </div>
                <div className='description'>
                  <p>
                    {user?.description}
                  </p>
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
      </motion.div>
    </AnimatePresence >
  )
}

export default page
