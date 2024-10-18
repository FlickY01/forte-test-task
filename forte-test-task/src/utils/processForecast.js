export const processForecast = (forecastData) => {
    const dailyForecast = [];
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
  
    const groupedByDate = forecastData.list.reduce((acc, current) => {
      const date = new Date(current.dt * 1000).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(current);
      return acc;
    }, {});
  
    for (const date in groupedByDate) {
      if (groupedByDate.hasOwnProperty(date) && date > todayString) {
        const dailyData = groupedByDate[date][0];
        dailyForecast.push(dailyData);
      }
    }
  
    return dailyForecast;
  };