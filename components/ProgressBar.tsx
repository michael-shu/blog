'use client';
import React from 'react'
import {motion, useScroll} from 'framer-motion';

const ProgressBar = () => {
    const {scrollYProgress} = useScroll();
  return (
    <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 h-1.5 w-full bg-[#2fc49c] z-50 origin-[0%]">
    </motion.div>
  )
}

export default ProgressBar;
