import {
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import { Device } from '../pages/types'

const usePostDevice = () => {
    const queryClient = useQueryClient()

    const postDevice = async (device: Omit<Device, 'id'>): Promise<Response> => {
        const data = await fetch(`http://localhost:8800/devices`, {                
            method: "POST",
            body: JSON.stringify(device),
            headers: {
              "Content-Type": "application/json",
            },})
        queryClient.invalidateQueries({
            queryKey: ['devices']
        })

      return data
}
      return useMutation({mutationFn: postDevice})
}

export default usePostDevice