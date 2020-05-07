const { toggleConnectInstance } = require('./classes/toggle.js');
const { jiraConnectInctance } = require('./classes/jiraConnect');
const { Worklogs } = require('./classes/worklogs')

const { dates: customDates, linkToTimesheet } = require('./.config');
const { today, startFromCommandLine } = require('./utils');

async function transferEntries (mode) {
  let dates;
  if (mode === 'today') {
    dates = today;
  } else if (mode === 'dates' ) {
    dates = customDates;
  } else { return; }

  const entries = await toggleConnectInstance.getEntries(dates);
  const worklogs = new Worklogs(entries);
  const validWorklogs = worklogs.getValidWorklogs();
  console.log(validWorklogs);
  console.log(linkToTimesheet)
  validWorklogs.map(async worklog => await jiraConnectInctance.createWorklog(worklog));
};


startFromCommandLine(transferEntries);
