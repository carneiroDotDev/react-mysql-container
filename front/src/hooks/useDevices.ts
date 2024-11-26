import {
    useQuery,
  } from '@tanstack/react-query'
import API_URL from '../api'

const useDevices = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['devices'],
        queryFn: () =>
          fetch(`${API_URL}/devices`).then((res) =>
            res.json(),
          ),
      })

      return { isPending, error, data }
}

export default useDevices