import { useRouter } from 'next/router'

const useLoader = () => {
  const router = useRouter()
  return router.isFallback
}

export default useLoader