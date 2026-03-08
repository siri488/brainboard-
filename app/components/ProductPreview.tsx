"use client"

import { motion } from "framer-motion"

export default function ProductPreview() {
  return (
    <section className="productPreview">

      <div className="previewContent">

        <motion.div
          className="previewImageContainer"
          initial={{ opacity:0, x:-40 }}
          whileInView={{ opacity:1, x:0 }}
          transition={{ duration:0.6 }}
          viewport={{ once:true }}
        >
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
            alt="Study workspace"
            className="previewImage"
          />
        </motion.div>


        <motion.div
          className="previewText"
          initial={{ opacity:0, x:40 }}
          whileInView={{ opacity:1, x:0 }}
          transition={{ duration:0.6 }}
          viewport={{ once:true }}
        >

          <h2 className="previewTitle">
            Your Study Workspace
          </h2>

          <p className="previewSubtitle">
            Keep your notes, tasks and study progress organized in one calm workspace.
          </p>

        </motion.div>

      </div>

    </section>
  )
}