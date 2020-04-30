const { TimeEntries } = require('./classes/timeEntries');
const { JiraConnect } = require('./classes/jiraConnect');
const { Worklogs } = require('./classes/worklogs')

const { fileName, user, jiraConnectOptions} = require('./.config');

const timeEntries = new TimeEntries(fileName);
const entries = timeEntries.getRecords();

const worklogs = new Worklogs(entries);
const validWorklogs = worklogs.getValidWorklogs();


const jira = new JiraConnect({ user, jiraConnectOptions });
validWorklogs.map(worklog => jira.createWorklog(worklog));
