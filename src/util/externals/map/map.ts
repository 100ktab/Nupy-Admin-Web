export const searchAddress = async (address, countryCode) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&country=${countryCode}&proximity=ip&types=address&access_token=${process.env.MAPBOX_TOKEN}`)
      .then(response => response.json())
      .then(data => {
        const {features} = data;
        console.log(features.length)
        resolve(features[0].geometry.coordinates)
      })
      .catch(error => {
        reject(error)
      })
  })
}