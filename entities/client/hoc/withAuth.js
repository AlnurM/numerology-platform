import { getClientByUid } from '../api'

const withAuth = gssp => {
  return async context => {
    const { uid } = context.query
    const client = await getClientByUid(uid)
    if (!client.uid) {
      return {
        redirect: {
          destination: '/',
          statusCode: 302,
        },
      }
    }
    return await gssp({ ...context, client, uid })
  }
}

export default withAuth
