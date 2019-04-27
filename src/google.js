import { createBot } from './createBot'
import generateAnswers from './yourselfSearch'

async function init () {
  const bot = createBot('google', process.env.GOOGLE_BOT_TOKEN, [generateAnswers])
  const success = await bot.telegram.setWebhook(process.env.ALIAS + process.env.WEBHOOK_PATH)
  if (success) {
    console.log('SUCCESS SAVE WEBHOOK', success)
  } else {
    console.log('FAIL', success)
  }
  bot.startWebhook(process.env.WEBHOOK_PATH)
  console.log('START BOT ON PATH', process.env.WEBHOOK_PATH)
}

init()
