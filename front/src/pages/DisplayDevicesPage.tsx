import {
    useQuery,
  } from '@tanstack/react-query'
import { Device } from './types'
import { Link } from 'react-router-dom'

const handleDelete = async (id: number) => {
    try{
        await fetch(`http://localhost:8800/devices/${id}`, {
            method: "DELETE",
    })
    window.location.reload()
    } catch(err){
        console.log(err)
    }
}

const Card = ({ id, deviceName, deviceType, ownerName, batteryStatus }: Device) => {
    return (<div className="wrapper">
             <h1>{deviceName}</h1>
             <p>Owner: {ownerName}</p>
             <p>Type: {deviceType}</p>
             <p>Battery: {batteryStatus}%</p>
       <div className="button-wrapper"> 
         <button className="btn outline"><Link to={`/update/${id}`}>Update</Link></button>
         <button className="btn fill" onClick={()=> handleDelete(id)}>Delete</button>
       </div>
       </div>
        )
}

export const DisplayDevicesPage = () => {
    const { isPending, error, data: devices } = useQuery({
        queryKey: ['displayDevices'],
        queryFn: () =>
          fetch('http://localhost:8800/devices').then((res) =>
            res.json(),
          ),
      })

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
