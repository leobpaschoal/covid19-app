import axios from 'axios';
import moment from 'moment';

const xRapidApiKey = '606f9dbf57mshf6682943f3bc128p18bc3ajsnffab36b4b8b9';

export const monitor = () => {
  const api = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus';
  return axios.create({
    baseURL: api,
    headers: {
      'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
      'x-rapidapi-key': xRapidApiKey
    }
  });
};

export const news = () => {
  const dateFrom = moment()
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  const dateTo = moment().format('YYYY-MM-DD');

  console.log(dateFrom, dateTo);
  const api = `https://newsapi.org/v2/everything?q=covid19&from=${dateFrom}&to=${dateTo}&sortBy=popularity&apiKey=a126f00f72124e758e38dbab92d31aa3`;
  console.log(api);
  return axios.create({
    baseURL: api
  });
};
