<template>
  <v-app>
        <div class="d-flex align-center justify-center" elevation="0" style="height: 100vh">
            <v-form @submit.prevent="getWeatherForecast">
                <v-text-field v-model="cityName" solo label="City Name"/>
                <weather-forecast-item :weatherForecast="this.weatherForecast" :loading="this.loading"/>
            </v-form>
        </div>
  </v-app>
</template>

<script>


    import WeatherForecastItem from "@/components/WeatherForecastItem";

export default {
  name: 'App',

  components: {
      // eslint-disable-next-line vue/no-unused-components
    WeatherForecastItem,
  },

    methods: {
      getWeatherForecast() {
          if(this.cityName) {
              this.loading = true;
              fetch(`${process.env.VUE_APP_WEATHER_API_LINK}/weather?` + new URLSearchParams({
                  q:this.cityName,
                  appid: process.env.VUE_APP_WEATHER_API_KEY,
                  units: 'metric'
              }))
              .then((response) => response.json())
              .then((forecast) => this.weatherForecast = forecast)
              .catch((error) => console.log(error))
              .finally(() => this.loading = false);
              this.clearForm();
          }
      },
        clearForm() {
          this.cityName = '';
        }
    },

    mounted() {
      this.getWeatherForecast();
    },

    data: () => ({
      cityName: 'Moscow',
      loading: false,
      weatherForecast: null,
  }),
};
</script>
