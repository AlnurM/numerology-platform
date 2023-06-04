import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/shared/api'

export const getProductsByUid = async (uid) => {
  const productsRef = collection(db, 'product')
  const q = query(productsRef, where('clientId', '==', uid))
  const querySnapshot = await getDocs(q)
  const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return products
}

export const getProductTypes = async () => {
  const productTypesRef = collection(db, 'productType')
  const querySnapshot = await getDocs(productTypesRef)
  const productTypes = querySnapshot.docs.reduce((acc, doc) => ({ ...acc, [doc.id]: doc.data() }), {})
  return productTypes
}

export const getProductTypeDetails = async (id) => {
  const docRef = doc(db, 'productType', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id, ...docSnap.data() }
  } else {
    return {}
  }
}

export const getProductDetails = async (id) => {
  const docRef = doc(db, 'product', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const data = docSnap.data()
    const type = await getProductTypeDetails(data.typeId)
    return { id, ...data, type }
  } else {
    return {}
  }
}

export const updateProductForm = async (id, form) => {
  const productRef = doc(db, 'product', id)
  await updateDoc(productRef, {
    form: form.map(item => !!item ? item : '')
  })
}