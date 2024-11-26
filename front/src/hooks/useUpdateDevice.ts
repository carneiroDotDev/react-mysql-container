import {
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import { Device } from '../pages/types'
import API_URL from '../api'

const useUpdateDevice = (id: string) => {
    const queryClient = useQueryClient()

    const patchDevice = async (device: Omit<Device, 'id'>): Promise<Response> => {
        const data = await fetch(`${API_URL}/devices/${id}`, {                
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
