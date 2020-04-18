const { TimeEntries } = require('./timeEntries');
const { JiraConnect } = require('./jiraConnect');
const { Worklogs } = require('./worklogs')

const { fileName, user, jiraConnectOptions} = require('./.config');

const timeEntries = new TimeEntries(fileName);
const entries = timeEntries.getRecords();

const worklogs = new Worklogs(entries);
const validWorklogs = worklogs.getValidWorklogs();

console.log(validWorklogs);

// const jira = new JiraConnect({ user, jiraConnectOptions });
// jira.createWorklog(testWorklog);
