import axios from 'axios'

const baseUrl = '/api'


// * Send Image to Cloudinary
export const imageUpload = (uploadUrl, data) => {
  return axios.post(uploadUrl, data)
}

//* Post URL to backend

export const postURL = url => {
  return axios.post(`${baseUrl}/images/`, { url: url })
}

//* get Single Image
export const getSingleImage = imageId => {
  return axios.get(`${baseUrl}/images/${imageId}`)
}

