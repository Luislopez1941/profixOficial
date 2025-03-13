'use client'

import React from 'react'
import Menu from '@/components/Menu'
import { motion, AnimatePresence } from 'framer-motion';
import JobsComponent from '@/components/Jobs/Jobs';
import Header from '@/components/Header';

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
                    <JobsComponent />
                    <Menu />
                </div>
            </motion.div>
        </AnimatePresence>

    )
}

export default page
