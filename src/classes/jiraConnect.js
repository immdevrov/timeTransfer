import axios from 'axios'

export default class JiraConnect {
  constructor(user, jiraConnectOptions) {
    this.user = user
    this.jiraConnectOptions = jiraConnectOptions
  }

  async createWorklog({ key, timeSpent, started }) {
    if (!key || !timeSpent || !started) {
      throw Error('wrong worklog')
    }
    await this.sendWorklog({ key, timeSpent, started })
    return this
  }

  async sendWorklog({ key, timeSpent, started }) {
    await axios.request({
      url: `/rest/api/${this.jiraConnectOptions.apiVersion}/issue/${key}/worklog`,
      baseURL: 'https://' + this.jiraConnectOptions.host,
      method: 'post',
      auth: {
        username: this.user.username,
        password: this.user.password,
      },
      data: {
        timeSpent,
        started,
      },
    })
  }
}
