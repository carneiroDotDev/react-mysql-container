import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DisplayDevicesPage } from './pages/DisplayDevicesPage'
import { AddDevicesPage } from './pages/AddDevicesPage'
import { UpdateDevicesPage } from './pages/UpdateDevicesPage'

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<DisplayDevicesPage />} />
        <Route path="/add" element={<AddDevicesPage />}/>
        <Route path="/update" element={<UpdateDevicesPage />}/>
      </Routes>
      </Router>
  )
}

export default App
