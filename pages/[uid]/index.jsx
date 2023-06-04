import { useEffect } from 'react'
import { getProductsByUid, getProductTypes } from '@/entities/product'
import { withAuth } from '@/entities/client'
import { useHeader } from '@/widgets/header'
// * Components
import { ProductItem } from '@/entities/product'

const Main = ({ client, products, productTypes }) => {
  const { setTitle } = useHeader()
  useEffect(() => {
    setTitle(`Добро пожаловать, ${client.firstName}!`)
  }, [])
  return (
    <div className="w-full min-h-[80vh] p-8 shadow-inner rounded-xl flex flex-wrap">
      {products.map(product => (
        <ProductItem key={product.id} data={product} types={productTypes} />
      ))}
      {products.length == 0 && (
        <div className="w-full min-h-[60vh] flex justify-center items-center">
          <span className="text-xl">--Нет доступных материалов--</span>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = withAuth(async context => {
  const { uid, client } = context
  const products = await getProductsByUid(uid)
  const productTypes = await getProductTypes()
  return {
    props: {
      client,
      products,
      productTypes
    }
  }
})

export default Main
