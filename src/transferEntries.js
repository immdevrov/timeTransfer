import ToggleConnect from './classes/toggle.js'
import Worklogs from './classes/worklogs.js'
import JiraConnect from './classes/jiraConnect.js'
import { today } from './utils.js'

function getDates (mode, todayDate, customDates) {
  if (mode === 'today') {
    return todayDate
  } else if (mode === 'dates') {
    return customDates
  }

  throw new Error('Неверно определен mode')
}


export default async function transferEntries(mode, config) {
  const {
    dates: CUSTOM_DATES,
    linkToTimesheet: LINK_TO_TIMESHEET,
    user: USER,
    jiraConnectOptions: JIRA_CONNECT_OPTIONS,
    toggleConnectAuth: TOGGLE_CONNECT_AUTH,
  } =  config

  const dates = getDates(mode, today, CUSTOM_DATES)

  const toggleConnectInstance = new ToggleConnect(TOGGLE_CONNECT_AUTH)
  const entries = await toggleConnectInstance.getEntries(dates)

  const worklogs = new Worklogs(entries)
  const validWorklogs = worklogs.getValidWorklogs()

  console.log(validWorklogs)
  console.log(LINK_TO_TIMESHEET)

  const jiraConnectInstance = new JiraConnect(USER, JIRA_CONNECT_OPTIONS)

  validWorklogs.map(
    async (worklog) =>
      await jiraConnectInstance.createWorklog(worklog).catch((e) => {
        console.log(e)
      })
  )
}
