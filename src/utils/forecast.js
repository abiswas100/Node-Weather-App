const request = require('request');
const geocode = require('./geocode');



const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/daf209502913da48c0fb5338b5fdf0d9/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si';
    request({ url,json:true },(error,{body}) =>{   //body was destructured from response
        // const data = JSON.parse(response.body);
        // console.log(data.currently);
        // challenge
        // console.log(error)
        if(error){                    // we are handling lower level OS error here
        callback('Cannot connect to weather forecast',undefined);
        }
        else if(body.error){
            callback('Unable to find location',undefined);
        }
        else{
            callback(undefined,body.daily.data[0].summary + " It is currently "+body.currently.temperature+" degrees out.The highest today is "+body.daily.data[0].temperatureMax+" degrees.The lowest today is "+body.daily.data[0].temperatureMin+" degrees. There is "+body.currently.precipProbability+" % chances of rain."); 
           }
    })

}

module.exports = forecast;
