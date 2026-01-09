export interface WeatherData {
  temp: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  location: string;
  fetchedAt: string;
}

export interface WeatherBitResponse {
  data: Array<{
    temp: number;
    weather: {
      icon: string;
      code: number;
      description: string;
    };
    rh: number; // relative humidity
    wind_spd: number;
    city_name: string;
  }>;
}
