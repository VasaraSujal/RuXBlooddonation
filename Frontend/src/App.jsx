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
      </Routes>
    </Router>
      </LanguageProvider>
    </>
  )
}

export default App
