import Telegraf from 'telegraf'

/**
 *
 * @param {string} name
 * @param {string} token
 * @param {function[]} answersFn
 */
export function createBot (name, token, answersFn) {
  const bot = new Telegraf(token)

  bot.on('inline_query', async ctx => {
    console.log(name, ctx.inlineQuery)
    if (!ctx.inlineQuery.query) return
    try {
      const answers = (await Promise.all(answersFn.map(fn => fn(ctx.inlineQuery.query)))).reduce(
        (acc, result) => acc.concat(result),
        []
      )
      ctx.answerInlineQuery(answers)
    } catch (err) {
      ctx.answerInlineQuery([
        {
          type: 'article',
          title: 'Произошла ошибка',
          id: Math.random().toString(16),
          input_message_content: {
            message_text: 'Произошла ошибка',
            disable_web_page_preview: true
          },
          description: 'Не получилось сгенерировать ссылки'
        }
      ])
      console.error('ERROR FROM SEARCH BOT', err)
    }
  })

  return bot
}
