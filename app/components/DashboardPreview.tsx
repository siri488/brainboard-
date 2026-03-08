"use client"

import { motion } from "framer-motion"

export default function DashboardPreview() {
  return (
    <section className="dashboardPreview">

      <motion.div
        className="dashboardCard"
        initial={{ opacity:0, y:60 }}
        whileInView={{ opacity:1, y:0 }}
        transition={{ duration:0.8 }}
        viewport={{ once:true }}
      >

        <div className="dashboardHeader">
          BrainBoard Dashboard
        </div>

        <div className="dashboardGrid">

          <div className="dashboardBox">
            <h4>Notes</h4>
            <p>Lecture summary</p>
            <p>Research ideas</p>
          </div>

          <div className="dashboardBox">
            <h4>Tasks</h4>
            <p>Finish assignment</p>
            <p>Study algorithms</p>
          </div>

          <div className="dashboardBox">
            <h4>Progress</h4>
            <p>Study streak: 6 days</p>
            <p>Tasks completed: 12</p>
          </div>

        </div>

      </motion.div>

    </section>
  )
}