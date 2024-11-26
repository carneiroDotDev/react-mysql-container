import { Link, useNavigate } from 'react-router-dom'
import './AddDevicesPage.css'
import { useState } from 'react'
import {usePostDevice} from '../hooks'
import { Device } from './types'

export const AddDevicesPage = () => {
    const {mutate: postDevice} = usePostDevice()
    const [device, setDevice] =  useState<Omit<Device,"id">>({
        deviceName: '',
        deviceType: 'SMARTPHONE',
        ownerName: '',
        batteryStatus: 100
    })
    const [missInfo, setMissInfo] = useState(false)
    const navigate = useNavigate()


    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) =>{
        setDevice(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit: React.EventHandler<React.FormEvent> = async (e) => {
        e.preventDefault()
        if(!device.batteryStatus || !device.deviceName || !device.deviceType || !device.ownerName){
            setMissInfo(true)
            return
        }
        try{
            postDevice(device)
        
    } catch(err){
        console.log(err)
    }
        setMissInfo(false)
        navigate('/')
    }

  return (
    <div className="form">
    <div className="title">Add a new device</div>
    <div className="input-container ic1">
      <input required id="deviceName" className="input" type="text" name="deviceName" placeholder=" " onChange={handleChange} />
      <div className="cut"></div>
      <label htmlFor="deviceName" className="placeholder">Device name</label>
    </div>
    <div className="input-container ic2">
      <select required name="deviceType" id="deviceType" onChange={handleChange}>
         <option value="SMARTPHONE">Smartphone</option>
         <option value="CAMERA">Camera</option>
         <option value="TABLET">Tablet</option>
      </select>
      <div className="cut"></div>
      <label htmlFor="deviceType" className="placeholder">Device type</label>
    </div>
    <div className="input-container ic2">
      <input required id="ownerName" name='ownerName' className="input" type="text" placeholder=" " onChange={handleChange}/>
      <div className="cut"></div>
      <label htmlFor="ownerName" className="placeholder">Owner name</label>
    </div>
    <div className="input-container ic2">
      <input required id="batteryStatus" name='batteryStatus' className="input" type="range" defaultValue={"100"} min="0" max="100" step="1" placeholder=" " onChange={handleChange}/>
      <div className="cut"></div>
      <label htmlFor="batteryStatus" className="placeholder">Battery Status</label>
    </div>
    {missInfo && <p className="missingInfo">Some info is missing.</p>}
    <button type="submit" className="submit" onClick={handleSubmit}>Add new device</button>
    <Link to="/"><button className="btn outline">Cancel</button></Link>
  </div>
  )
}
