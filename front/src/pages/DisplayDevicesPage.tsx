import { Link } from 'react-router-dom'

import {useDevices, useDeleteDevice} from '../hooks'
import { Device } from './types'

const Card = ({ id, deviceName, deviceType, ownerName, batteryStatus }: Device) => {
    const { mutate: deleteDevice } = useDeleteDevice()
    return (<div className="wrapper">
             <p className='cardTitle'>{deviceName}</p>
             <p>Owner: {ownerName}</p>
             <p>Type: {deviceType}</p>
             <p>Battery: {batteryStatus}%</p>
       <div className="button-wrapper"> 
         <button className="btn outline"><Link to={`/update/${id}`}>Update</Link></button>
         <button className="btn fill" onClick={()=> deleteDevice(id)}>Delete</button>
       </div>
       </div>
        )
}

export const DisplayDevicesPage = () => {
    const { isPending, error, data: devices } = useDevices()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
        <h1>Körber Devices Manager</h1>
        <Link to="/add"><button className="btn outline addDeviceButton">Add new device</button></Link>
        {devices.map((device: Device) => (
            <Card key={device.id} {...device} />
        ))}
    </div>
  )
}
