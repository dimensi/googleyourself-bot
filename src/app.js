import Telegraf from 'telegraf'
import generateYourselfAnswers from './yourselfSearch'

const botYourself = new Telegraf(process.env.BOT_YOURSELF_TOKEN)

botYourself.on('inline_query', async ctx => {
  console.log(ctx.inlineQuery)
  if (!ctx.inlineQuery.query) return
  try {
    const answers = await generateYourselfAnswers(ctx.inlineQuery.query)
    ctx.answerInlineQuery(answers)
  } catch (err) {
    ctx.answerInlineQuery([{
      type: 'article',
      title: 'Произошла ошибка',
      id: Math.random().toString(16),
      input_message_content: {
        message_text: 'Произошла ошибка',
        disable_web_page_preview: true
      },
      description: 'Не получилось сгенерировать ссылки'
    }])

    botYourself.telegram.sendMessage(process.env.ERROR_CHAT_ID, err.toString())
    console.error(err)
  }
})

botYourself.startPolling()
