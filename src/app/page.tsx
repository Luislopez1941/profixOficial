'use client';

import styles from "./page.module.css";
import Header from "@/components/Header";
import LayoutMain from "@/components/Home/LayoutMain";
import Main from "@/components/Home/Main";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "@/components/Menu";

export default function Home() {
   // Solo se vuelve a ejecutar si `data` cambia

  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={styles.page}
        >
        <Menu />

        <Header />

        
        <Main />
        <Footer />
            
        
        </motion.div>

    </AnimatePresence>
  );
}
