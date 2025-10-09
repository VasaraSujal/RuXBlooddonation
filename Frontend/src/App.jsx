import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import About from './pages/About'
import { LanguageProvider } from './utils/LanguageContext'
import EmergencyHomepage from './pages/EmergencyHomepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LanguageProvider>
      <EmergencyHomepage/>
      </LanguageProvider>
    </>
  )
}

export default App
