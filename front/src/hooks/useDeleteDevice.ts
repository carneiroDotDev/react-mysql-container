import {
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import API_URL from '../api'

const useDeleteDevice = () => {
    const queryClient = useQueryClient()

    const deleteDevice = async (id: number): Promise<Response> => {
        const data = await fetch(`${API_URL}/devices/${id}`, {method: 'DELETE'})
        queryClient.invalidateQueries({
            queryKey: ['devices']
        })

      return data
}
      return useMutation({mutationFn: deleteDevice})
}

export default useDeleteDevice