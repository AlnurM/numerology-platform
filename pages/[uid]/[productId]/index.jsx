import { withAuth } from '@/entities/client'
import { getProductDetails } from '@/entities/product'

const ProductDetailed = () => {
  return (
    <>
    </>
  )
}

export const getServerSideProps = withAuth(async context => {
  const { uid, productId } = context.query
  const { type } = await getProductDetails(productId)
  return {
    redirect: {
      destination: `/${uid}/${productId}/${type.content[0].slug}`,
    }
  }
})

export default ProductDetailed
