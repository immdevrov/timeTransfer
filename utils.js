
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const formatDuration = (seconds) => {
  if (seconds < 60) { return; }
  const minutes = parseInt(seconds / 60);
  const hours = parseInt(minutes / 60);
  return hours ? `${hours}h ${minutes % 60}m` : `${minutes % 60}m`;
};

const formatStartDate = (dateISOString) => {
  const startDate = dayjs(dateISOString, 'YYYY-MM-DDTHH:mm:ssZ');
  return startDate.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
}

module.exports = { formatDuration, formatStartDate };
