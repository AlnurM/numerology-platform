import { useRouter } from 'next/router'
import { useIsMobile } from '@/shared/hooks'
// * Components
import { Chip } from '@/shared/ui'

const ProductItem = ({ data, types }) => {
  const router = useRouter()
  const isMobile = useIsMobile()
  return (
    <div 
      className={`${isMobile ? 'w-full' : 'mr-7 w-[calc(33%-24px)]'} mb-6 h-full overflow-hidden rounded-xl shadow-md cursor-pointer`}
      onClick={() => router.push(`/${router.query.uid}/${data.id}`)}
    >
      <div 
        className="w-full h-48 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${types[data.typeId].cover})`
        }}
      />
      <div className="p-4 background-white">
        <span className="text-xl">{data.name}</span>
        <div className="mt-2 flex">
          <Chip type="positive" className="mr-3 w-fit">{types[data.typeId].name}</Chip>
          <Chip type="negative" className="w-fit">pdf</Chip>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
