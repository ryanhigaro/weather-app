export function getOpenWeatherService(city: string, country: string): any {
    return `${process.env.REACT_APP_BASE_URL}weather?q=${city},${country}&appid=${process.env.REACT_APP_API_KEYS}`
}