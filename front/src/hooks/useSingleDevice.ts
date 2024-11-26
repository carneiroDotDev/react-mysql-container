import {
    useQuery,
  } from '@tanstack/react-query'

const useSingleDevice = (id: string) => {
    const { isPending, error, data } = useQuery({
        queryKey: ['devices'],
        queryFn: () =>
          fetch(`http://localhost:8800/devices/${id}`).then((res) =>
            res.json(),
          ),
      })

      return { isPending, error, data }
}

export default useSingleDevice