import algoliasearch from 'algoliasearch'
import uuidv4 from 'uuid/v4'

const vueLogo = 'https://vuejs.org/images/logo.png'

const createAnswer = (title, description, link) => ({
  type: 'article',
  title,
  id: uuidv4(),
  input_message_content: {
    message_text: link
  },
  description,
  thumb_url: vueLogo,
  thumb_width: 36,
  thumb_height: 36
})

const removeLvl = text => Number(text.replace('lvl', ''))

const cleanAndSortHierarchy = (hierarchy) => {
  return Object.keys(hierarchy)
    .sort((a, b) => removeLvl(a) - removeLvl(b))
    .reduce((acc, key) => {
      if (hierarchy[key] === null) return acc
      acc.push(hierarchy[key])
      return acc
    }, [])
}

class VueSearch {
  constructor (appID, apiKey, index) {
    this.client = algoliasearch(appID, apiKey)
    this.index = this.client.initIndex(index)
  }

  async search (query) {
    return this.index.search({
      query,
      hitsPerPage: 10,
      facetFilters: [
        'version:v2'
      ]
    })
  }

  prepareHits (hits) {
    return hits.map(item => {
      const hierarchy = cleanAndSortHierarchy(item.hierarchy)
      return {
        title: hierarchy.pop(),
        desc: hierarchy.join('\n'),
        url: item.url
      }
    })
  }

  async generateAnswers (query) {
    const { hits } = await this.search(query)
    const processedHits = this.prepareHits(hits)
    return processedHits.map(item => createAnswer(item.title, item.desc, item.url))
  }
}

export const vueEn = new VueSearch(process.env.VUE_EN_APP_ID,
  process.env.VUE_EN_API_KEY,
  process.env.VUE_EN_INDEX)

export const vueRu = new VueSearch(process.env.VUE_RU_APP_ID,
  process.env.VUE_RU_API_KEY,
  process.env.VUE_RU_INDEX)
