import axios from 'axios';

const xRapidApiKey = '606f9dbf57mshf6682943f3bc128p18bc3ajsnffab36b4b8b9';

export const statistics = () => {
  const api = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1';
  return axios.create({
    baseURL: api,
    headers: {
      'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
      'x-rapidapi-key': xRapidApiKey
    }
  });
}

export const monitor = () => {
  const api = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus';
  return axios.create({
    baseURL: api,
    headers: {
      'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
      'x-rapidapi-key': xRapidApiKey
    }
  })
}
