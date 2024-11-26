import {
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import { Device } from '../pages/types'

const useUpdateDevice = (id: string) => {
    const queryClient = useQueryClient()

    const patchDevice = async (device: Omit<Device, 'id'>): Promise<Response> => {
        const data = await fetch(`http://localhost:8800/devices/${id}`, {                
            method: "PUT",
            body: JSON.stringify(device),
            headers: {
              "Content-Type": "application/json",
            },})
        queryClient.invalidateQueries({
            queryKey: ['devices']
        })

      return data
}
      return useMutation({mutationFn: patchDevice})
}

export default useUpdateDevice
