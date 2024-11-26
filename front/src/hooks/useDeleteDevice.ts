import {
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'

const useDeleteDevice = () => {
    const queryClient = useQueryClient()

    const deleteDevice = async (id: number): Promise<Response> => {
        const data = await fetch(`http://localhost:8800/devices/${id}`, {method: 'DELETE'})
        queryClient.invalidateQueries({
            queryKey: ['devices']
        })

      return data
}
      return useMutation({mutationFn: deleteDevice})
}

export default useDeleteDevice