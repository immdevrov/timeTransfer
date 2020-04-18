const JiraApi = require('jira-client');

class JiraConnect {
  constructor ({ user, jiraConnectOptions }) {
    if (!user || !jiraConnectOptions) { throw Error('wrong user data') };
    this.jira = this.initiateConnection({ user, jiraConnectOptions });
  }

  initiateConnection ({ user, jiraConnectOptions }) {
    return new JiraApi({
      ...jiraConnectOptions,
      ...user
    });
  }

  createWorklog ({ key, timeSpent, started }) {
    if (!key || !timeSpent || !started) { throw Error('wrong worklog') };
    this.jira.addWorklog(key, { timeSpent, started });
    return this;
  }

}

module.exports = { JiraConnect };
