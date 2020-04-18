
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const getTime = (time) => {
  const t = dayjs(time, 'HH:mm:ss');
  return {
    hours: t.hour(),
    minutes: t.minute()
  }
}

const formatDuration = (duration) => {
  const { hours, minutes } = getTime(duration);
  if (!hours && !minutes) return 'spent time < 1m';
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const formatStartDate = (date, time) => {
  const startDate = dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss');
  return startDate.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
}

module.exports = { formatDuration, formatStartDate };
