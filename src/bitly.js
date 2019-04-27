import axios from 'axios'

const BITLY_URL = 'https://api-ssl.bitly.com/v4/bitlinks'

const generateHeaders = () => ({
  Authorization: `Bearer ${process.env.BITLY_TOKEN}`,
  'Content-Type': 'application/json'
})

export const createURL = (link, tags = []) => axios.post(BITLY_URL, {
  group_guid: process.env.BITLY_GROUP_GUID,
  long_url: link,
  tags
}, {
  headers: generateHeaders()
})
  .then(res => res.data)

export const getShortURLFromObj = (obj) => obj.link
