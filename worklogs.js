const { formatDuration, formatStartDate } = require('./utils');

const isKeyValid = (key) => {
  const trueKey = new RegExp(/\w+-\d\d?\d?\d?/);
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
  if (!key || !timeSpent || !started) { throw Error('wrong worklog') };

  return isKeyValid(key) && isTimeSpentValid(timeSpent);
}

class Worklogs {
  constructor (entries) {
    this.worlogs = entries.map((e) => {
      const key = `${e['Project']}-${e['Description']}`;
      const timeSpent = formatDuration(e['Duration']);
      const started = formatStartDate(e['Start date'], e['Start time']);
      const isValid = validateWorklog({ key, timeSpent, started });

      return { key, timeSpent, started, isValid };
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
