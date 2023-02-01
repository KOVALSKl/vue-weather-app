<template>
  <v-app>
        <div class="d-flex flex-column align-center justify-center" elevation="0" style="height: 100vh">
            <v-form @submit.prevent="getWeatherForecast">
                <v-text-field v-model="cityName" solo label="City Name"/>
                <weather-forecast :weatherForecast="this.weather" :loading="this.loading"/>
            </v-form>


            <day-forecast
                    class="mt-2"
                    v-for="item in forecast?.list"
                    :key="item.dt"
                    :day-forecast="item"
                    :loading="loading"
            />

        </div>
  </v-app>
</template>

<script>


    import WeatherForecast from "@/components/WeatherForecast";
    import DayForecast from "@/components/DayForecast/DayForecast";
    import dateMixins from './mixins/dateMixins.js';

export default {
  name: 'App',
    mixins: [dateMixins],

  components: {
    WeatherForecast,
      DayForecast,
  },

    methods: {
      getWeatherForecast() {
          if(this.cityName) {
              this.makeGetRequest({
                  link: `${process.env.VUE_APP_WEATHER_API_LINK}/weather`,
                  params: {
                      q: this.cityName,
                      appid: `${process.env.VUE_APP_WEATHER_API_KEY}`,
                      units: 'metric',
                  },
                  successCallback: (value) => this.weather = value,
                  errorCallback: (error) => console.warn(error),
              })
              this.makeGetRequest({
                  link: `${process.env.VUE_APP_WEATHER_API_LINK}/forecast`,
                  params: {
                      q: this.cityName,
                      appid: `${process.env.VUE_APP_WEATHER_API_KEY}`,
                      units: 'metric',
                  },
                  successCallback: (value) => {
                    let nextDaysWeatherList = value.list.filter((item) => {
                        let currentDate = this.getDate({
                            time: value.list[0].dt,
                        });
                        let nextDate = this.getDate({
                            time: item.dt,
                        });

                        if(this.getDay({date: nextDate, weekday: 'long'}) !== this.getDay({date: currentDate, weekday: 'long'})) {
                            if(nextDate.getHours() === 12)
                                return item;
                        }
                    })
                      this.forecast = {...value, list: nextDaysWeatherList};
                  },
                  errorCallback: (error) => console.warn(error),
              })
              this.clearForm()
          }
      },

        getCurrentGeoposition() {
          navigator.geolocation.getCurrentPosition(
              (pos) => this.coords = pos.coords,
              (error) => console.warn(`Error(${error.code}): ${error.message}`))
        },

        clearForm() {
          this.cityName = '';
        },

        makeGetRequest({link, params, successCallback, errorCallback}) {
          this.loading = true;
          fetch(`${link}?` + new URLSearchParams(params))
            .then((response) => response.json())
            .then((value) => successCallback(value))
            .catch((error) => errorCallback(error))
            .finally(() => this.loading = false)
        },
    },

    mounted() {
      this.getCurrentGeoposition();
      this.getWeatherForecast();
    },

    data: () => ({
      cityName: 'Moscow',
        coords: null,
      loading: false,
      weather: null,
        forecast: null,
        nextDaysForecast: null,
  }),
};
</script>
