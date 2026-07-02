import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="brand">MediGuide</NavLink>
      <div className="links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/about-me" className={({ isActive }) => isActive ? 'active' : ''}>About Me</NavLink>
        <NavLink to="/about-mediguide" className={({ isActive }) => isActive ? 'active' : ''}>About MediGuide</NavLink>
      </div>
    </nav>
  )
}
