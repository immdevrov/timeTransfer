const { toggleConnectInstance } = require('./classes/toggle.js');
const { jiraConnectInctance } = require('./classes/jiraConnect');
const { Worklogs } = require('./classes/worklogs')

const { dates } = require('./.config');

(
  async function transferEntries () {
    const entries = await toggleConnectInstance.getEntries(dates);
    const worklogs = new Worklogs(entries);
    const validWorklogs = worklogs.getValidWorklogs();
    console.log(validWorklogs);
    validWorklogs.map(worklog => jiraConnectInctance.createWorklog(worklog));
  }
)();
