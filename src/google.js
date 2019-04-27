import { createBot } from './createBot'
import generateAnswers from './yourselfSearch'

const bot = createBot('google', process.env.GOOGLE_BOT_TOKEN, [generateAnswers])
bot.startWebhook(process.env.WEBHOOK_PATH)
