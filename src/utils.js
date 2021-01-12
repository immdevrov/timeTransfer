import { createInterface } from 'readline';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat);

export const RL = createInterface({
  input: process.stdin,
  output: process.stdout
});

export const formatDuration = (seconds) => {
  if (seconds < 60) { return; }
  const minutes = parseInt(seconds / 60);
  const hours = parseInt(minutes / 60);
  return hours ? `${hours}h ${minutes % 60}m` : `${minutes % 60}m`;
};

export const formatStartDate = (dateISOString) => {
  const startDate = dayjs(dateISOString, 'YYYY-MM-DDTHH:mm:ssZ');
  return startDate.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
}

const getToday = () => {
  const todayDate = dayjs();
  return {
    start_date: todayDate.hour(0).minute(0).second(0).format('YYYY-MM-DDTHH:mm:ssZ'),
    end_date: todayDate.hour(23).minute(59).second(59).format('YYYY-MM-DDTHH:mm:ssZ')
  };
}
export const today = getToday()

const CONSOLE_MODES_MESSAGE = `
choose mode:
dates   -    based on start-end dates in config
today   -    just for today (00:00:00 - 23:59:59 timezone: +3h)
`

export const startFromCommandLine = () => {
  return new Promise((resolve, reject) =>{
    const [, , mode] = process.argv;

    if (mode) {
      if (!['today', 'dates'].includes(mode)) { reject(new Error('Неверное значение mode')) }
      console.log(`started in ${mode} mode`);
      resolve(mode)
    } else {
      console.log(CONSOLE_MODES_MESSAGE);
      RL.on('line', line => {
        console.log(`started in ${line} mode`);
        resolve(line);
      });
    }
  })

}
