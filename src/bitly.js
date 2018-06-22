import fetch from 'node-fetch'

const BITLY_URL = 'https://api-ssl.bitly.com/v4/bitlinks'

const generateHeaders = () => ({
  Authorization: `Bearer ${process.env.BITLY_TOKEN}`,
  'Content-Type': 'application/json'
})

export const createURL = (link, tags = []) => fetch(BITLY_URL, {
  headers: generateHeaders(),
  method: 'POST',
  body: JSON.stringify({
    group_guid: process.env.BITLY_GROUP_GUID,
    long_url: link,
    tags
  })
})
  .then(response => response.json())

export const getShortURLFromObj = (obj) => obj.link
