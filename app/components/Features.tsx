"use client"

import { motion } from "framer-motion"

export default function Features() {
  return (
    <section className="features">

      <h2 className="featuresTitle">
        Tools that help you study better
      </h2>

      <div className="featuresGrid">

        {/* Smart Notes */}

        <motion.div
          className="featureCard"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a"
            className="featureImg"
          />

          <h3>Smart Notes</h3>

          <p>
            Capture ideas, summarize lectures and organize
            all your notes in one calm workspace.
          </p>
        </motion.div>


        {/* Task Planner */}

        <motion.div
          className="featureCard"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe"
            className="featureImg"
          />

          <h3>Task Planner</h3>

          <p>
            Plan assignments, track deadlines and keep
            your daily study schedule organized.
          </p>
        </motion.div>


        {/* Progress Tracking */}

        <motion.div
          className="featureCard"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
            className="featureImg"
          />

          <h3>Progress Tracking</h3>

          <p>
            See how much you study and stay motivated
            with visual productivity insights.
          </p>
        </motion.div>

      </div>

    </section>
  )
}