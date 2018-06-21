import url from 'url'
import fetch from 'node-fetch'

const createURL = (text) => {
  const newURL = new url.URL('https://api-ssl.bitly.com/v3/shorten')
  newURL.search = new url.URLSearchParams({
    format: 'json',
    login: 'gikteam',
    apiKey: 'R_b845734d6720ee83be40b09dd6608985',
    longUrl: `https://google.gik-team.com/?q=${text}`
  }).toString()

  return newURL
}

const getURL = async (text) => {
  const requestURL = createURL(text)
  const response = await fetch(requestURL.toString())
  const json = await response.json()
  return json.data.url
}

export default getURL
