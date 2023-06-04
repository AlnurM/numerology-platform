import { useIsMobile } from '@/shared/hooks'
// * Components
import { Icon } from '@/shared/ui'

const ClientProfile = ({ data }) => {
  const isMobile = useIsMobile()
  const size = isMobile ? 60 : 50
  return (
    <div className="flex items-center">
      {!isMobile && (
        <div className="mr-4 flex flex-col items-end">
          <span className="font-medium text-gray-900">{data.firstName} {data.lastName?.[0]}.</span>
          <span className="text-sm text-gray-700">{data.birthDate}</span>
        </div>
      )}
      <div className='overflow-hidden' style={{ width: size, height: size }}>
        {data.photo ? (
          <img className="w-full" src={data.photo} alt={data.firstName} /> 
        ) : (
          <Icon width={size} height={size} src="/assets/ic_profile.svg" />
        )}
      </div>
    </div>
  )
}

export default ClientProfile
