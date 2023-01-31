<template>
        <v-card elevation="2" width="350px" class="mx-auto" :loading="loading">
            <v-list-item two-line class="d-flex justify-space-between align-center">
                <v-list-item-content>
                    <v-list-item-title class="text-h5">
                        {{weatherForecast?.name}}
                        <sup>
                            {{weatherForecast?.sys.country}}
                        </sup>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{(new Date((weatherForecast?.dt + weatherForecast?.timezone - 10800) * 1000)
                            .toLocaleDateString('en-US', {
                                weekday:'long',
                                hour12:false,
                                hour:'2-digit',
                                minute:'2-digit'
                            }
                        ))}}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-text>
                <v-row align="center">
                    <v-col
                            cols="8"
                            class="d-flex align-center text-h3"
                    >
                                 {{Math.round(weatherForecast?.main.temp)}}&deg;
                                <v-list-item three-line>
                                    <v-list-item-content >
                                        <v-list-item-subtitle>Feels like:{{Math.round(weatherForecast?.main.feels_like)}}&deg;</v-list-item-subtitle>
                                        <v-list-item-subtitle>Max:{{Math.round(weatherForecast?.main.temp_max)}}&deg;</v-list-item-subtitle>
                                        <v-list-item-subtitle>Min:{{Math.round(weatherForecast?.main.temp_min)}}&deg;</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                    </v-col>
                    <v-col cols="4">

                        <v-img
                                :src='`http://openweathermap.org/img/wn/${weatherForecast?.weather[0].icon}@2x.png`'
                                :alt="weatherForecast?.weather[0].description"
                                width="92"
                        />
                    </v-col>
                </v-row>
                <v-list-item class="pl-1">
                    <v-list-item-icon>
                        <v-icon :style="`transform: rotate(${weatherForecast?.wind.deg}deg)`">mdi-send</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle class="text-h6">{{Math.round(weatherForecast?.wind.speed)}} km/h</v-list-item-subtitle>
                </v-list-item>
                <v-list-item class="pl-1">
                    <v-list-item-icon>
                        <v-icon>mdi-cloud-download</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle class="text-h6">{{Math.round(weatherForecast?.main.humidity)}}%</v-list-item-subtitle>
                </v-list-item>
            </v-card-text>
        </v-card>
</template>

<script>
    export default {
        name: 'WeatherForecastItem',
        props:['weatherForecast', 'loading'],
        methods: {

        },
        mounted() {
            console.log(this.weatherForecast)
        }
    };
</script>
