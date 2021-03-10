import toggleConnectInstance from './classes/toggle.js'
import jiraConnectInstance from './classes/jiraConnect.js'
import { dates as customDates, linkToTimesheet } from '../.config.js'
import Worklogs from './classes/worklogs.js'

import { today } from './utils.js'

const datesMap = {
  today: today,
  dates: customDates,
}

export default async function transferEntries(mode) {
  const dates = datesMap[mode]

  if (!dates) {
    throw new Error('Неверно определен mode')
  }

  const entries = await toggleConnectInstance.getEntries(dates)
  const worklogs = new Worklogs(entries)
  const validWorklogs = worklogs.getValidWorklogs()
  console.log(validWorklogs)
  console.log(linkToTimesheet)
  validWorklogs.map(
    async (worklog) => await jiraConnectInstance.createWorklog(worklog)
  )
}
