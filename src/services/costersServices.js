import Client from './api'

export const GetRollerCoaster = async () => {
  try {
    const res = await Client.get('/rollerCoaster')
    return res.data
  } catch (error) {
    throw error
  }
}