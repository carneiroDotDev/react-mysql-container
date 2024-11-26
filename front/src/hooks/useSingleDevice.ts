import {
    useQuery,
  } from '@tanstack/react-query'
import API_URL from '../api'

const useSingleDevice = (id: string) => {
    const { isPending, error, data } = useQuery({
        queryKey: ['devices'],
        queryFn: () =>
          fetch(`${API_URL}/devices/${id}`).then((res) =>
            res.json(),
          ),
      })

      return { isPending, error, data }
}

export default useSingleDevice