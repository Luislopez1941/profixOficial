"use client";

import React, { useEffect, useState } from 'react'
import './Header.css'
import Link from 'next/link';
import { User } from 'lucide-react';
import useUserStore from '@/zustand/UserStore';
import { div } from 'framer-motion/client';



const Header = () => {
  const userState = useUserStore(state => state.user);

  const user = userState;
  const [toggle, setToggle] = useState<boolean>(false)

  const [state, setState] = useState<boolean>(false)


  useEffect(() => {
    if (user.email) {
      setState(true)
    } else {
      setState(false)
    }
  }, [user])


  return (
    <div className='hero'>
      <div className='hero__container'>
        {/* <div className='toggle' onClick={() => setToggle(!toggle)}>
          <button className={`toggle__botton ${toggle ? 'activo' : ''}`}>
            <span className="l1 span"></span>
            <span className="l2 span"></span>
            <span className="l3 span"></span>
          </button>
        </div> */}
        <div>
          <h2 className='title'>Proservicios</h2>
        </div>
        {/* <div className={`nav__hero ${toggle ? 'activo' : ''}`}>
          <div>
            <div className='toggle' onClick={() => setToggle(!toggle)}>
              <button className={`toggle__botton ${toggle ? 'activo' : ''}`}>
                <span className="l1 span"></span>
                <span className="l2 span"></span>
                <span className="l3 span"></span>
              </button>
            </div>
          </div>
          {state ?
            <div className='nav__hero_container true-login'>
              <div className='sidebar__profile'>
                <div>
                  <div className='image__profile-sidebar'>
                    <div className='image__container-sidebar'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                    </div>
                  </div>
                  <div className='sidebar__profile-name'>
                    <p>Luis Lopez</p>
                  </div>
                  <div className='sidebar__profile-label'>
                    <p>Seguidos</p>
                    <p>Seguidor</p>
                  </div>
                </div>
              </div>
              <ul className='nav__items'>
                <li className='nav__item'>
                  <Link className='nav__link' href='/login'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                    Perfil
                  </Link>
                </li>
                <li className='nav__item'>
                  <Link className='nav__link' href='/login'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
                    Perfiles guardados
                  </Link>
                </li>
                <li className='nav__item'>
                  <Link className='nav__link' href='/login'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                    Contacto
                  </Link></li>
              </ul>
              <div className='sidebar__end'>
                <div className='sidebar__end_container'>
                  <p>Configuracion</p>
                </div>
              </div>
              <div className='btn__container'>
                {state == true ?
                  <button className='btn__general-purple' type='button' onClick={logout}>Cerrar sesión</button>
                  :
                  ''
                }
              </div>
            </div>
            :
            <div className='nav__hero_container false-login'>
              <div>
              <Link href='/login'><button className='btn__general-purple' type='button'>Iniciar sesion</button></Link>
                
              </div>
              <div className='hero__items'>
                <p>¿Quines somos?</p>
                <p>Explora</p>
                <p>Ayuda</p>
                <p>Contacto</p>
              </div>
            </div>
          }
        </div> */}
        {state == true ?
          <div className='nav__account-login-true'>
            <div className='bell'>
              <div className='number-bell'><small>1</small></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-bell"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z" /><path d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z" /></svg>
            </div>
            <div className='bell'>
              <div className='number-bell'><small>4</small></div>
              <svg xmlns="http://www.w3.org/2000/svg"  width="25"  height="25"  viewBox="0 0 24 24"  fill="#3F7DC0"  className="icon icon-tabler icons-tabler-filled icon-tabler-message-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.821 4.91c3.899 -2.765 9.468 -2.539 13.073 .535c3.667 3.129 4.168 8.238 1.152 11.898c-2.841 3.447 -7.965 4.583 -12.231 2.805l-.233 -.101l-4.374 .931l-.04 .006l-.035 .007h-.018l-.022 .005h-.038l-.033 .004l-.021 -.001l-.023 .001l-.033 -.003h-.035l-.022 -.004l-.022 -.002l-.035 -.007l-.034 -.005l-.016 -.004l-.024 -.005l-.049 -.016l-.024 -.005l-.011 -.005l-.022 -.007l-.045 -.02l-.03 -.012l-.011 -.006l-.014 -.006l-.031 -.018l-.045 -.024l-.016 -.011l-.037 -.026l-.04 -.027l-.002 -.004l-.013 -.009l-.043 -.04l-.025 -.02l-.006 -.007l-.056 -.062l-.013 -.014l-.011 -.014l-.039 -.056l-.014 -.019l-.005 -.01l-.042 -.073l-.007 -.012l-.004 -.008l-.007 -.012l-.014 -.038l-.02 -.042l-.004 -.016l-.004 -.01l-.017 -.061l-.007 -.018l-.002 -.015l-.005 -.019l-.005 -.033l-.008 -.042l-.002 -.031l-.003 -.01v-.016l-.004 -.054l.001 -.036l.001 -.023l.002 -.053l.004 -.025v-.019l.008 -.035l.005 -.034l.005 -.02l.004 -.02l.018 -.06l.003 -.013l1.15 -3.45l-.022 -.037c-2.21 -3.747 -1.209 -8.391 2.413 -11.119z" /></svg>
            </div>
            {/* <Link href='/user/profile' className='user'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
            </Link> */}
          </div>
          :
          <div className='nav__account-login-false'>
            <Link href='/login' className='login__hero'>
              <User strokeWidth={2.25} style={{ width: '1rem', height: '1rem', color: '#171717' }} />
              <small className='text__login'>Iniciar sesión</small>
            </Link>
            <div className='btn__seller'>
              <Link className='btn__join' href='/join'>
                <small>Unirme</small>
              </Link>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default Header
