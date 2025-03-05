'use client';

import React from 'react'
import './styles/Jobs.css'
import Menu from '@/components/Menu'
import Header from '@/components/Header'
import JobsComponent from '@/components/Jobs/Jobs'
import { AnimatePresence, motion } from "framer-motion";



const Jobs = () => {
  // const userState = useUserStore(state => state.user);
  // const userGlobal: UserInfo = userState;


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className='job__main'>
          <Header />
          <Menu />
          <JobsComponent />

        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Jobs
