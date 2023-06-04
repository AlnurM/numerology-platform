import { useRouter } from 'next/router'
import { useState, useEffect, useRef, useMemo } from 'react'
import { getStorage, ref, getMetadata } from "firebase/storage"
import { useHeader } from '@/widgets/header'
import { withAuth } from '@/entities/client'
import { getProductDetails, updateProductForm } from '@/entities/product'
import { formatBytes } from '@/shared/lib'
// * Components
import { Player, Icon, TextField, Button } from '@/shared/ui'

const ProductDetailed = ({ data }) => {
  const router = useRouter()
  const { setTitle } = useHeader()
  const containerRef = useRef(null)
  const [isEditable, setIsEditable] = useState(false)
  const [metadata, setMetadata] = useState({})
  const [answers, setAnswers] = useState(data.form || [])

  const [prevContent, currentContent, nextContent] = useMemo(
    () => {
      const { slug } = router.query
      const currentIndex = data.type.content.findIndex(f => f.slug === slug)
      const _prevContent = data.type.content?.[currentIndex - 1] || null
      const _currentContent = data.type.content?.[currentIndex]
      const _nextContent = data.type.content?.[currentIndex + 1] || null
      setTitle(_currentContent.name)
      return [_prevContent, _currentContent, _nextContent]
    }, 
    [router.query]
  )

  const handleOpen = () => {
    window.open(data.file, '_blank').focus()
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    const cloned = [...answers]
    cloned[id] = value
    setAnswers(cloned)
  }

  const handleSave = async () => {
    await updateProductForm(router.query.productId, answers)
    setIsEditable(false)
    router.replace(router.asPath)
  }

  useEffect(() => {
    if (currentContent.file) {
      const storage = getStorage();
      const pdfRef = ref(storage, `documents/${data.name}.pdf`);
      getMetadata(pdfRef)
        .then((metadata) => {
          setMetadata(metadata)
        })
        .catch((error) => {
        });
    }
  }, [currentContent.file])
  return (
    <div ref={containerRef} className="m-auto w-full max-w-[800px] flex flex-col">
      <Player width={containerRef?.current?.clientWidth} src={currentContent.video} />
      <div className="mt-6 text-sm sm:text-base">
        {currentContent.text}
      </div>
      {currentContent.file && (
        <div className="flex cursor-pointer" onClick={handleOpen}>
          <Icon width={40} height={50} src="/assets/ic_pdf.png" />
          <div className="ml-3 flex flex-col">
            <div className="text-lg">{metadata.name}</div>
            <div>{formatBytes(metadata.size)}</div>
          </div>
        </div>
      )}
      {currentContent.form && (!data.form.some(f => f.length > 3) || isEditable) && (
        <>
          {currentContent.form.map((question, index) => (
            <TextField
              id={index}
              key={index}
              label={question}
              className="mt-6"
              value={answers[index]}
              onChange={handleChange}
            />
          ))}
          <Button className="mt-6" onClick={handleSave}>
            Отправить
          </Button>
        </>
      )}
      {(!isEditable && data.form.some(f => f.length > 3)) && (
        <div className="py-3 flex flex-col justify-center items-center bg-green-100 rounded-xl">
          <Icon width={128} height={128} src="/assets/ic_success.png" />
          <span className="mt-3 text-lg">Ваш ответ принят!</span>
          <span className="mt-2 text-blue-700 underline cursor-pointer" onClick={() => setIsEditable(prevState => !prevState)}>Редактировать</span>
        </div>
      )}
      <div className="flex justify-between items-center">
        {prevContent && (
          <div 
            className="my-3 sm:my-6 flex items-center text-lg cursor-pointer opacity-50 hover:opacity-100"
            onClick={() => router.push(`/${router.query.uid}/${router.query.productId}/${prevContent.slug}`)}
          >
            <Icon src="/assets/ic_arrow-left.svg" className="mr-2" />
            Назад
          </div>
        )}
        {nextContent && (
          <div 
            className="my-6 flex items-center text-lg cursor-pointer opacity-50 hover:opacity-100"
            onClick={() => router.push(`/${router.query.uid}/${router.query.productId}/${nextContent.slug}`)}
            style={{ marginLeft: prevContent ? 0 : 'auto' }}
          >
            {nextContent.name}
            <Icon src="/assets/ic_arrow-right.svg" className="ml-2" />
          </div>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = withAuth(async context => {
  const { productId } = context.query
  const data = await getProductDetails(productId)
  return {
    props: {
      data
    }
  }
})

export default ProductDetailed
