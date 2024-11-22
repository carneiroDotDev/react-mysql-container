import { Link, useLocation, useNavigate } from 'react-router-dom'
import './AddDevicesPage.css'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Device } from './types'

export const UpdateDevicesPage = () => {
    const navigate = useNavigate()
    const deviceId = useLocation().pathname.split('/')[2]

    const { isPending, error, data: device } = useQuery<Device[]>({
        queryKey: ['displayDevices'],
        queryFn: () =>
          fetch(`http://localhost:8800/devices/${deviceId}`).then((res) =>
            res.json(),
          ),
      })
      
    const [missInfo, setMissInfo] = useState(false)
    const [updatedDevice, setUpdatedDevice] =  useState({
        deviceName: '',
        deviceType: '',
        ownerName: '',
        batteryStatus: ''
    })

    useEffect(() => {
        if(device?.length){
            const { deviceName, deviceType, ownerName, batteryStatus } = device[0]
            setUpdatedDevice({deviceName, deviceType, ownerName, batteryStatus: String(batteryStatus)})
        }
    } , [device])



  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) =>{
        setUpdatedDevice(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit: React.EventHandler<React.FormEvent> = async (e) => {
        e.preventDefault()
        if(!updatedDevice.batteryStatus || !updatedDevice.deviceName || !updatedDevice.deviceType || !updatedDevice.ownerName){
            setMissInfo(true)
            return
        }
        try{
            await fetch(`http://localhost:8800/devices/${deviceId}`, {
                method: "PUT",
                body: JSON.stringify(updatedDevice),
                headers: {
                  "Content-Type": "application/json",
                },
        })
    } catch(err){
        console.log(err)
    }
        setMissInfo(false)
        navigate('/')
    }

  return (
    <div className="form">
    <div className="title">Update the device:</div>
    <div className="input-container ic1">
      <input required id="deviceName" className="input" type="text" name="deviceName" defaultValue={updatedDevice.deviceName} onChange={handleChange} />
    </div>
    <div className="input-container ic2">
      <select required name="deviceType" id="deviceType" defaultValue={updatedDevice.deviceType} onChange={handleChange}>
         <option value={updatedDevice.deviceType}>{updatedDevice.deviceType}</option>
         <option value="SMARTPHONE">Smartphone</option>
         <option value="CAMERA">Camera</option>
         <option value="TABLET">Tablet</option>
      </select>
    </div>
    <div className="input-container ic2">
      <input required id="ownerName" name='ownerName' className="input" defaultValue={updatedDevice.ownerName} type="text" onChange={handleChange}/>
    </div>
    <div className="input-container ic2">
      <input required id="batteryStatus" name='batteryStatus' className="input" type="range" defaultValue={updatedDevice.batteryStatus} min="0" max="100" step="1" onChange={handleChange}/>
      <div className="cut"></div>
      <label htmlFor="batteryStatus" className="placeholder">Battery Status</label>
    </div>
    {missInfo && <p className="missingInfo">Some info is missing.</p>}
    <button type="submit" className="submit" onClick={handleSubmit}>Update device</button>
    <Link to="/"><button className="btn outline">Cancel</button></Link>
  </div>
  )
}
