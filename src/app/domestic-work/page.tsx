'use client';

import React from 'react'
import './styles/Jobs.css'
import Menu from '@/components/Menu'
import Header from '@/components/Header'
import DomesticWorkComponent from '@/components/domestic-work/DomesticWork';
import { AnimatePresence, motion } from "framer-motion";



const DomesticWork = () => {
  // const userState = useUserStore(state => state.user);
  // const userGlobal: UserInfo = userState;


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}

      >
        <div className='job__main'>
          <Header />
          <Menu />
          <DomesticWorkComponent />
          hola

        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DomesticWork
