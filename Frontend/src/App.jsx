import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import About from './pages/About'
import { LanguageProvider } from './utils/LanguageContext'
import EmergencyHomepage from './pages/EmergencyHomepage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import QuickRegistration from './pages/QuickRegistration'
import FindDonor from './pages/FindDonor'
import BloodBanks from './pages/BloodBanks'
import Contact from './pages/Contact'
import Statistics from './pages/Statistics'
import Camps from './pages/Camps'

function App() {
  const [count, setCount] = useState(0)

  return (
       <>
           <LanguageProvider>
    <Router>
      <Routes>
        <Route path="/" element={<EmergencyHomepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<QuickRegistration />} />
        <Route path="/finddonor" element={<FindDonor />} />
        <Route path="/blood-banks" element={<BloodBanks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/camps" element={<Camps />} />
      </Routes>
    </Router>
      </LanguageProvider>
    </>
  )
}

export default App
