import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getClientByUid } from '@/entities/client'
import { useHeader } from './hooks'
// * Components
import Head from 'next/head'
import { ClientProfile } from '@/entities/client'

const Header = () => {
  const router = useRouter()
  const title = useHeader(state => state.title)
  const [client, setClient] = useState({})
  useEffect(() => {
    const { uid } = router.query
    getClientByUid(uid)
      .then(client => setClient(client))
  }, [])
  if (!client.uid) {
    return null
  }
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="py-8 px-6 sm:py-12 sm:px-12 background-white flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-medium leading-snug text-gray-900">{title}</h1>
        <ClientProfile data={client} />
      </div>
    </>
  )
}

export default Header
