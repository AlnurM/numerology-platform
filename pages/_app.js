import { Header } from '@/widgets/header'
import { MainLayout } from '@/shared/ui'
import '@/shared/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <MainLayout
      header={<Header />}
      content={<Component {...pageProps} />}
    />
  )
}
