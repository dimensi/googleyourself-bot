import * as bitly from './bitly'
import uuidv4 from 'uuid/v4'

const engines = {
  gikTeam: 'https://google.gik-team.com/?q=',
  lmgtfy: 'https://lmgtfy.com/?q=',
  lmgtfyDuckDuck: 'http://lmgtfy.com/?s=d&q=',
  createSearchURL (text, type) {
    if (!this[type]) {
      throw new Error('Wrong Type Search Engine')
    }

    return `${this[type]}${encodeURIComponent(text)}`
  }
}

const icons = {
  gikTeam: 'https://i.imgur.com/xt2WlPo.png',
  lmgtfy: 'https://i.imgur.com/lzB0zgy.png',
  lmgtfyDuckDuck: 'https://i.imgur.com/lzB0zgy.png'
}

const descriptions = {
  gikTeam: 'Поиск через gikTeam (google)',
  lmgtfy: 'Поиск через lmgtfy (google)',
  lmgtfyDuckDuck: 'Поиск через lmgtfy (duck duck go)'
}

const generateURL = async (text, type) => {
  const searchURL = engines.createSearchURL(text, type)
  console.log('Тип', type)
  const url = bitly.getShortURLFromObj(await bitly.createURL(searchURL, [type]))
  return url
}

const createAnswer = (query, link, typeEngine) => ({
  type: 'article',
  title: query,
  id: uuidv4(),
  input_message_content: {
    message_text: link,
    disable_web_page_preview: true
  },
  description: descriptions[typeEngine],
  thumb_url: icons[typeEngine],
  thumb_width: 24,
  thumb_height: 24
})

const generateAnswers = async (query) => {
  const arrEngines = Object.keys(engines).filter(key => key !== 'createSearchURL')
  const urls = await Promise.all(arrEngines.map(type => generateURL(query, type)))

  return urls.map((url, index) => createAnswer(query, url, arrEngines[index]))
}

export default generateAnswers
