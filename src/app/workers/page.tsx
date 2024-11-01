
'use client'

import React from 'react'
import './page.css'
import '../../components/Header.css'
import itemServi from '../../components/Home/json/items.json'
import Footer from '@/components/Footer'
import { Wrench, Zap, Search, ChevronDown, Magnet } from 'lucide-react';
import Card from '@/components/general/Card'
import Header from '@/components/Header'


interface Skill {
  name: string;
}

interface Item {
  image: string;
  fullname: string;
  skills: Skill[];
  starts: number[];
}


const Page = () => {


  const pages = [1, 2, 3, 4]
  const active = 1

  return (
    <div className='workers'>
      <Header />
      <header className='hero__workers'>
        <div className='row__one'>
        </div>
        <div className='row__two'>
          <input className='inputs__general' type="text" placeholder='Buscar servicios' />
          <div className='search'>
            <Search style={{ width: '1rem', height: '1rem' }} />
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
          {itemServi.map((item: Item, index: number) => (
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
              <div className={`${x == active ? 'active' : ''}`} key={index}>{x}</div>
            ))}
          </div>
          <div className='chevron-right'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Page
