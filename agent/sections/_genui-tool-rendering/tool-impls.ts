// Stub (genui-tool-rendering exception): the docs call `getWeatherImpl` but never define it.
// Returns the fields the docs' WeatherCard renderer reads.
export function getWeatherImpl(city: string) {
  return { city, temperature: 72, humidity: 50, wind_speed: 10, conditions: "Sunny" };
}
