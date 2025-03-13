'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Menu from '@/components/Menu'



const page = () => {
  return (
    <AnimatePresence>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}

    >
        <div>
            <Header />
          
            <Menu />
        </div>
    </motion.div>
</AnimatePresence>
  )
}

export default page
