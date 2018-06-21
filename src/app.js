import Telegraf from 'telegraf'
import uuidv4 from 'uuid/v4'
import getURL from './getURL'

const bot = new Telegraf(process.env.BOT_TOKEN)

const createAnswer = (query, link) => ({
  type: 'article',
  title: query,
  id: uuidv4(),
  input_message_content: {
    message_text: link,
    disable_web_page_preview: true
  }
})

bot.on('inline_query', async ctx => {
  console.log(ctx.inlineQuery)
  if (!ctx.inlineQuery.query) return
  const link = await getURL(ctx.inlineQuery.query)
  ctx.answerInlineQuery([
    createAnswer(ctx.inlineQuery.query, link)
  ])
})

bot.on('callback_query', (ctx) => {
  console.log('callback', ctx)
})

bot.startPolling()
