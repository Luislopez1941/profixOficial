
'use client'

import React from 'react'
import './page.css'
import '../../components/Header.css'
import Footer from '@/components/Footer'
import { Wrench, Zap, Search, ChevronDown, Magnet } from 'lucide-react';
import Card from '@/components/general/Card'
import Header from '@/components/Header'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from 'zustand';
import { storeGlobal } from "@/zustand/GlobalVariations";
import APIs from "@/services/APIS";


interface Skill {
  name: string;
}

export interface Customer {
  id: number;
  first_name: string;
  second_name?: string;
  first_surname: string;
  second_last_name?: string;
  country?: string;
  email: string;
  password: string;
  profilePhoto?: string;
  phone: string;
  gender?: string;
  skills?: Skill[];
  starts?: Skill[];
  birthdate?: string;
  dni?: string;
  type_user?: string;
  id_state?: number; 
  id_city?: number; 
  id_municipality?: number; 
}



const Page = () => {

  const storedData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('filter') || '{}') : {};

  const router = useRouter();
  const { data } = useStore(storeGlobal);  // Accediendo al estado global
  const [workers, setWorkers] = useState<any>([]);

  const setData = storeGlobal(state => state.setData)
  const [active, setActive] = useState<boolean>(false)

  // Verificamos si `data` está disponible antes de hacer la llamada API
  const fetchData = async () => {
    try {
      setActive(true)
      let result = await APIs.getCustomers(data == null ? storedData : data);
      setWorkers(result);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setTimeout(() => {
        setActive(false)

      }, 2000);

    }
  };

  useEffect(() => {
      if (data && data.type === 'get-user') {
        fetchData();
      } else {
        fetchData();
      }
    
  }, [data]);
  console.log()

  const pages = [1, 2, 3, 4]
  const activePage = 1

  return (
    <AnimatePresence>

      {active ?
        <div className="loading-workers">
          <svg fill="hsl(228, 97%, 42%)" width="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><filter id="spinner-gF01"><feGaussianBlur in="SourceGraphic" stdDeviation="1" result="y" /><feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z" /><feBlend in="SourceGraphic" in2="z" /></filter></defs><g filter="url(#spinner-gF01)"><circle cx="5" cy="12" r="4"><animate attributeName="cx" calcMode="spline" dur="2s" values="5;8;5" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" /></circle><circle cx="19" cy="12" r="4"><animate attributeName="cx" calcMode="spline" dur="2s" values="19;16;19" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" /></circle><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></g></svg>
        </div>
        :
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}

        >
          <div className='workers'>
            <Header />
            <header className='hero__workers'>
              <div className='row__one'>
              </div>
              <div className='row__two'>
                <input className='inputs__general' type="text" placeholder='Buscar servicios' />
                <div className='search'>
                  <Search style={{ width: '1.4rem', height: '1.4rem' }} />
                </div>
              </div>
              <div className='row__three'>
                <div className='btn__filter'>
                  <p>Filtro avanzado</p>
                  <ChevronDown />
                </div>
              </div>
            </header>
            <section className='main__workers'>
              <div className='row__one'>
                <div className='item'>
                  <Wrench style={{ width: '1rem', height: '1rem' }} />
                  <p>Plomeros</p>
                </div>
                <div className='item'>
                  <Zap style={{ width: '1rem', height: '1rem' }} />
                  <p>Electricitas</p>
                </div>
                <div className='item'>
                  <Magnet style={{ width: '1rem', height: '1rem' }} />
                  <p>Herrero</p>
                </div>
                <div className='item'>
                  <p>Soldador</p>
                </div>
                <div className='item'>
                  <p>Jardinero </p>
                </div>
              </div>
              <div className='row__three'>
                {workers?.map((item: Customer, index: number) => (
                  <div className='item' key={index}>
                    <Card item={item} route={'/workers/profile'} />
                  </div>
                ))}
              </div>
              <div className='row__pages'>
                <div className='chevron-left'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                </div>
                <div className='row__pages_container'>
                  {pages.map((x: number, index: number) => (
                    <div className={`${x == activePage ? 'active' : ''}`} key={index}>{x}</div>
                  ))}
                </div>
                <div className='chevron-right'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                </div>
              </div>
            </section>
            <Footer />
          </div>
        </motion.div>
      }


    </AnimatePresence>
  )
}

export default Page
