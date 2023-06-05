import { useRouter } from 'next/router'

const useLoader = () => {
  const router = useRouter()
  return !router.isReady
}

export default useLoader