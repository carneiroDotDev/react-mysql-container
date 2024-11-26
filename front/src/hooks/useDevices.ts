import {
    useQuery,
  } from '@tanstack/react-query'

const useDevices = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['devices'],
        queryFn: () =>
          fetch('http://localhost:8800/devices').then((res) =>
            res.json(),
          ),
      })

      return { isPending, error, data }
}

export default useDevices