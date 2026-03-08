"use client"

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <div className="logoBox">BB</div>
        <div className="logoText">BrainBoard</div>
      </div>

      <div className="navLinks">
        <a href="#">Product</a>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
      </div>

    </nav>
  )
}