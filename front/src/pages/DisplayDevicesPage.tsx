import {
    useQuery,
  } from '@tanstack/react-query'
import { Device } from './types'

export const DisplayDevicesPage = () => {
    const { isPending, error, data: devices } = useQuery({
        queryKey: ['displayDevices'],
        queryFn: () =>
          fetch('http://localhost:8800/devices').then((res) =>
            res.json(),
          ),
      })

      console.log('isPending ->', isPending)
      console.log('error ->', error)
      console.log('data ->', devices)

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
        <h1>Körber Devices Manager</h1>
        {devices.map((device: Device) => (
            <div className="device">
                <div className="">{device.deviceName}</div>
                <div className="">{device.deviceType}</div>
                <div className="">{device.ownerName}</div>
            </div>
        ))}
    </div>
  )
}
