import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/shared/api'

export const getClientByUid = async (uid) => {
  const docRef = doc(db, 'client', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return {
      uid,
      ...docSnap.data()
    }
  }
  return {}
}
