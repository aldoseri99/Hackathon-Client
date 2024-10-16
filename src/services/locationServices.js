import Client from './api'

export const GetLocation = async () => {
  try {
    const res = await Client.get('/location')
    return res.data
  } catch (error) {
    throw error
  }
}
