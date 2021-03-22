const extractKeyFromDescription = (description) => {
  const trueKey = new RegExp(/[A-Z1-9]+-\d+/g)

  const matches = description.match(trueKey)

  if (!matches) {
    throw new TypeError('Invalid worklog description')
  }

  if (matches.length > 1) {
    throw new TypeError('Found more than one key in description')
  }

  return matches[0]
}

const isTimeSpentValid = (ts) => {
  const trueTimeSpent = new RegExp(/(\dh \d\d?m)|(\dh)|(\d\d?m)/)
  const matches = ts.match(trueTimeSpent)
  if (!matches) {
    return false
  }
  return matches[0].length === ts.length
}

const validateWorklog = ({ key, timeSpent, started }) => {
  if (!key || !timeSpent || !started) {
    return false
  }

  return isTimeSpentValid(timeSpent)
}

export default class Worklogs {
  constructor(entries) {
    this.worklogs = entries.map(({ start, duration, description }) => {
      let isKeyValid = true
      let key = description

      try {
        key = extractKeyFromDescription(description)
      } catch {
        isKeyValid = false
      }

      const worklog = { key, timeSpent: duration, started: start }
      const isValid = validateWorklog(worklog)

      return { ...worklog, isValid: isValid && isKeyValid }
    })
  }

  getValidWorklogs() {
    return this.worklogs.filter((w) => w.isValid)
  }

  getInvalidWorklogs() {
    return this.worklogs.filter((w) => !w.isValid)
  }
}
