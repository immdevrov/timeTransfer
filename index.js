import transferEntries from './src/transferEntries.js'

import { startFromCommandLine, RL } from './src/utils.js'

(async () => {
  const line = await startFromCommandLine()
    .catch(e => { console.error(e) })
  await transferEntries(line)
    .catch(e => console.error(e))
    RL.close()
})()
