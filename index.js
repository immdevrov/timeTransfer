const { ToggleConnect } = require('./classes/toggle.js');
const { JiraConnect } = require('./classes/jiraConnect');
const { Worklogs } = require('./classes/worklogs')

const { user, jiraConnectOptions, toggleConnectAuth, dates } = require('./.config');

async function transferEntries () {
  const toggleConnect = new ToggleConnect(toggleConnectAuth);
  const entries = await toggleConnect.getEntries(dates);
  const worklogs = new Worklogs(entries);
  const validWorklogs = worklogs.getValidWorklogs();
  const jira = new JiraConnect({ user, jiraConnectOptions });
  console.log(validWorklogs);
  // validWorklogs.map(worklog => jira.createWorklog(worklog));
}

transferEntries();
