const isKeyValid = (key) => {
  const trueKey = new RegExp(/\w+-\d{1,}/);
  const matches = key.match(trueKey);
  if (!matches) { return false; }
  return matches[0].length === key.length;
}

const isTimeSpentValid = (ts) => {
  const trueTimeSpent = new RegExp(/(\dh \d\d?m)|((\dh))|(\d\d?m)/);
  const matches = ts.match(trueTimeSpent);
  if (!matches) { return false; }
  return matches[0].length === ts.length;
}

const validateWorklog = ({ key, timeSpent, started }) => {
  if (!key || !timeSpent || !started) { return false };

  return isKeyValid(key) && isTimeSpentValid(timeSpent);
}

class Worklogs {
  constructor (entries) {
    this.worlogs = entries.map(({ start, duration, description }) => {
      const worklog = { key: description, timeSpent: duration, started: start };
      const isValid = validateWorklog({ ...worklog });

      return { ...worklog, isValid };
    });
  }

  getValidWorklogs () {
    return this.worlogs.filter(w => w.isValid);
  }

  getInvalidWorklogs () {
    return this.worlogs.filter(w => !w.isValid);
  }
}

module.exports = { Worklogs }
