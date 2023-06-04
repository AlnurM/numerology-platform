import dynamic from 'next/dynamic'
import { useIsMobile } from '@/shared/hooks'
// * Components
const JoLPlayer = dynamic(() => import('jol-player'), { ssr: false })

const Player = ({ width, src = "" }) => {
  const isMobile = useIsMobile()
  return (
    <div style={{ width: isMobile ? width : 800, height: isMobile ? 200 : 450, }}>
      <JoLPlayer
        option={{
          videoSrc: src,
          width: isMobile ? width : 800,
          height: isMobile ? 200 : 450,
          language: 'en',
          pausePlacement: "center",
          isShowScreenshot: false,
          isShowPicture: false,
          isShowMultiple: false
        }}
      />
    </div>
  )
}

export default Player
