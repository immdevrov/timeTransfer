
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

const today = () => {
  const todayDate = dayjs();
  return {
    start_date: todayDate.hour(0).minute(0).second(0).format('YYYY-MM-DDTHH:mm:ssZ'),
    end_date: todayDate.hour(23).minute(59).second(59).format('YYYY-MM-DDTHH:mm:ssZ')
  };
}

const startFromCommandLine = (callback) => {
  const {createInterface} = require('readline');
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`
choose mode:
dates   -    based on start-end dates in config
today   -    just for today (00:00:00 - 23:59:59 timezone: +3h)
  `);

  rl.on('line', line => {
    console.log(`started in ${line} mode`);
    callback(line);
  });
}

module.exports = { formatDuration, formatStartDate, today: today(), startFromCommandLine };
