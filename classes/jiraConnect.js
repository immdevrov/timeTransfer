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

  async createWorklog ({ key, timeSpent, started }) {
    if (!key || !timeSpent || !started) { throw Error('wrong worklog') };
    await this.jira.addWorklog(key, { timeSpent, started });
    return this;
  }

}

const { user, jiraConnectOptions } = require('../.config');
const jiraConnectInctance = new JiraConnect({ user, jiraConnectOptions });
module.exports = { jiraConnectInctance };
