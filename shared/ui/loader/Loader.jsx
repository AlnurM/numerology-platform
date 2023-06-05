import { useLoader } from '@/shared/hooks'
// * Components
import CircleLoader from 'react-spinners/CircleLoader'

const Loader = () => {
  const isLoading = useLoader()
  if (!isLoading) {
    return null
  }
  return (
    <div className="z-[9999] absolute top-0 left-0 w-full h-[100vh] bg-white flex justify-center items-center">
      <CircleLoader
        color="#dbeafe"
        loading={isLoading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
} 

export default Loader
