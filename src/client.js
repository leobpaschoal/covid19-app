import axios from 'axios';

export const monitor = () => {
  const api = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus';
  return axios.create({
    baseURL: api,
    headers: {
      'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
      'x-rapidapi-key': '606f9dbf57mshf6682943f3bc128p18bc3ajsnffab36b4b8b9',
    },
  });
};

export const news = () => {
  const api = 'https://newsapi.org/v2';
  return axios.create({
    baseURL: api
  });
};
