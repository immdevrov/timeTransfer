const fileName = 'pathTOcsv.csv';

const user = {
  username: 'Jira email',
  password: 'apiToken'
}

const jiraConnectOptions = {
  protocol: 'https',
  host: 'studio256.atlassian.net',
  apiVersion: '2',
  strictSSL: true,
}

module.exports = { fileName, user, jiraConnectOptions};
