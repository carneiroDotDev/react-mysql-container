import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DisplayDevicesPage } from './pages/DisplayDevicesPage'
import { AddDevicesPage } from './pages/AddDevicesPage'
import { UpdateDevicesPage } from './pages/UpdateDevicesPage'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Routes>
        <Route path="/" element={<DisplayDevicesPage />} />
        <Route path="/add" element={<AddDevicesPage />}/>
        <Route path="/update/:id" element={<UpdateDevicesPage />}/>
      </Routes>
      </Router>
      </QueryClientProvider>
  )
}

export default App
