import axios from 'axios'
import { formatDuration, formatStartDate } from '../utils.js'

export default class ToggleConnect {
  constructor(auth) {
    this.axiosConfig = {
      method: 'get',
      url: 'https://www.toggl.com/api/v8/time_entries',
      auth: { ...auth },
    }
  }

  async getDataFromApi(params) {
    const config = { ...this.axiosConfig, params }
    const { data } = await axios(config)
    const entries = data.map(({ start, duration, description }) => ({
      start,
      duration,
      description,
    }))
    return this.formatTimeEntries(entries)
  }

  formatTimeEntries(entries) {
    return entries.map((e) => ({
      start: formatStartDate(e.start),
      duration: formatDuration(e.duration),
      description: e.description,
    }))
  }

  async getEntries(params) {
    return await this.getDataFromApi(params)
  }
}
