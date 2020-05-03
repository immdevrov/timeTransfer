const user = {
  username: 'Jira email', // change
  password: 'apiToken'  // change
}

const jiraConnectOptions = {
  protocol: 'https',
  host: 'studio256.atlassian.net',
  apiVersion: '2',
  strictSSL: true,
}

const toggleApiToken = 'toggle api token'; // change
const toggleConnectAuth = {
  username: toggleApiToken,
  password: 'api_token' // leave as it is
};

const dates = {
  start_date: '2020-04-29T15:42:46+02:00',
  end_date: '2020-05-01T15:42:46+02:00'
}

module.exports = { user, jiraConnectOptions, toggleConnectAuth, dates };
