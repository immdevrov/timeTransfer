import ToggleConnect from './classes/toggle.js'
import Worklogs from './classes/worklogs.js'
import JiraConnect from './classes/jiraConnect.js'
import { today } from './utils.js'
import {
  dates as customDates,
  linkToTimesheet,
  user,
  jiraConnectOptions,
  toggleConnectAuth,
} from '../.config.js'

const DATES_MAP = {
  today: today,
  dates: customDates,
}

export default async function transferEntries(mode) {
  const dates = DATES_MAP[mode]

  if (!dates) {
    throw new Error('Неверно определен mode')
  }

  const toggleConnectInstance = new ToggleConnect(toggleConnectAuth)
  const entries = await toggleConnectInstance.getEntries(dates)

  const worklogs = new Worklogs(entries)
  const validWorklogs = worklogs.getValidWorklogs()

  console.log(validWorklogs)
  console.log(linkToTimesheet)

  const jiraConnectInstance = new JiraConnect(user, jiraConnectOptions)

  validWorklogs.map(
    async (worklog) =>
      await jiraConnectInstance.createWorklog(worklog).catch((e) => {
        console.log(e)
      })
  )
}
