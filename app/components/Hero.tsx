"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="hero">

      <img
        src="/hero.avif"
        alt="Study workspace"
        className="heroImage"
      />

      <div className="heroOverlay"></div>

      <div className="heroContent">

        <motion.h1
          className="heroTitle"
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8 }}
        >
          Build Your <br/>
          Second Brain
        </motion.h1>

        <p className="heroSubtitle">
          Organize notes, plan tasks and track your study progress
          in one calm workspace built for every student.
        </p>

        <div className="heroButtons">
          <button className="primaryButton">
            Start Free
          </button>

          <button className="secondaryButton">
            View Demo
          </button>
        </div>

      </div>

    </section>
  )
}