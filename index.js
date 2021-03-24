import transferEntries from './src/transferEntries.js'
import { startFromCommandLine, RL } from './src/utils.js'
import * as config from './.config.js'


;(async () => {
  const line = await startFromCommandLine().catch((e) => {
    console.error(e)
  })
  await transferEntries(line, config).catch((e) => console.error(e))
  RL.close()
})()
