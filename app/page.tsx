import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ProductPreview from "./components/ProductPreview"
import Features from "./components/Features"
import CTA from "./components/CTA"

export default function Home() {
  return (
    <main>
      <div className="bgShape bgShape1"></div>
<div className="bgShape bgShape2"></div>
      <Navbar />
      <Hero />
      <ProductPreview />
      <Features />
      <CTA />
    </main>
  )
}