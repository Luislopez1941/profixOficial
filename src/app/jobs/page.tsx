'use client';

import React from 'react'
import './styles/Jobs.css'
import Menu from '@/components/Menu'
import Header from '@/components/Header'
import JobsComponent from '@/components/Jobs/Jobs'

const Jobs = () => {
  return (
    <div >
      <Header />
      <Menu />
      <JobsComponent />
      
    </div>
  )
}

export default Jobs
