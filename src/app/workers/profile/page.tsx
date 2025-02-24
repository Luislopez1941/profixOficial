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
  first_name: string;
  second_name: String;
  first_surname: string;
  second_last_name: string;
  profilePhoto: string;
  background: string;
  typeUser: string;
  phone: string;
  skills: [];
  email: string;
  password: string;
  profile: string;
  workPhotos: any;
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
          <div className='backgorund-profile' style={{ backgroundImage: user?.background ? `url(${user?.background})` : 'none' }}></div>
          <div className="cols__container">
            <div className="left__col">

              <div className='profile-information__container'>
                <div className='left'>
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
                  <div className='name__conatiner'>
                    <p className='name'>{user?.first_name} {user?.second_name} {user?.first_surname} {user?.second_last_name}</p>
                  </div>


                  <div className='description'>
                    <p>{user?.description}</p>
                  </div>
                  <div className='skills__contaiiner'>
                    {user?.skills?.map((x: any) => (
                      <p>{x.name}</p>
                    ))}
                  </div>

                </div>
                <div className="about">
                  <div className='about__container'>

                    <div className='options__profile'>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3zm0 2h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1" /></svg>
                        Total de trabajos (13)
                      </li>
                      <li>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                          (7.8)
                        </div>
                        Calificaciones
                      </li>
                      <li>
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.497 4.409a10 10 0 0 1 -10.36 16.828l-.223 -.098l-4.759 .849l-.11 .011a1 1 0 0 1 -.11 0l-.102 -.013l-.108 -.024l-.105 -.037l-.099 -.047l-.093 -.058l-.014 -.011l-.012 -.007l-.086 -.073l-.077 -.08l-.067 -.088l-.056 -.094l-.034 -.07l-.04 -.108l-.028 -.128l-.012 -.102a1 1 0 0 1 0 -.125l.012 -.1l.024 -.11l.045 -.122l1.433 -3.304l-.009 -.014a10 10 0 0 1 1.549 -12.454l.215 -.203a10 10 0 0 1 13.226 -.217m-8.997 3.09a1.5 1.5 0 0 0 -1.5 1.5v1a6 6 0 0 0 6 6h1a1.5 1.5 0 0 0 0 -3h-1l-.144 .007a1.5 1.5 0 0 0 -1.128 .697l-.042 .074l-.022 -.007a4.01 4.01 0 0 1 -2.435 -2.435l-.008 -.023l.075 -.041a1.5 1.5 0 0 0 .704 -1.272v-1a1.5 1.5 0 0 0 -1.5 -1.5" /></svg>
                        Enviar mensaje
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <div className='image__portfolio'>
                <div className='tags'>
                  <a>
                    <p>Trabajos</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /></svg>
                  </a>
                  <a>
                    <p>Opiniones</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                  </a>
                </div>
                <div className='image__portfolio_container-profil-customers'>
                  {user?.workPhotos.length > 0 ? (
                    user?.workPhotos.map((x: string, index: number) => (
                      <div key={index} className="photos" style={{ backgroundImage: `url("${x}")` }}>
                      </div>

                    ))
                  ) : (
                    <p>Cargando fotos...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence >
  )
}

export default page
