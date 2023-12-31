import baseAxios from "@/api/BaseAxios";

const ENDPOINT = "accumulate-point"

export const getAll = async () => {
  return await baseAxios.get(`${ENDPOINT}/list`)
}

export const updateStatus = async (params) => {
  return await baseAxios.put(`${ENDPOINT}`, params)
}

export const create = async (param) => {
  return await baseAxios.post(`${ENDPOINT}/create`, param)
}

export const getHistoryPointsDetailUser = async (userId) => {
  return await baseAxios.get(`${ENDPOINT}/history-accumulate-point?userId=` + userId)
}

export default {
  getAll,
  updateStatus,
  create,
  getHistoryPointsDetailUser
}