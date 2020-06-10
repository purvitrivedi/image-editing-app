import axios from 'axios'

const baseUrl = '/api'


// * Send Image to Cloudinary
export const imageUpload = (uploadUrl, data) => {
  return axios.post(uploadUrl, data)
}

//* Post URL to backend

export const postURL = ({ url, height, width }) => {
  return axios.post(`${baseUrl}/images/`, { url, width, height })
}

//* get Single Image
export const getSingleImage = imageId => {
  return axios.get(`${baseUrl}/images/${imageId}`)
}

//* get thumbnails

export const getThumbnails = data => {
  return axios.post(`${baseUrl}/images/thumbnails/`, data)
}

//* send preview filter request

export const previewFilter = data => {
  return axios.post(`${baseUrl}/images/`, data)
}