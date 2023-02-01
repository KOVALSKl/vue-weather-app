<template>
    <v-card width="350px" :loading="loading">
        <v-list-item>
            <v-list-item-content>
                <v-row class="d-flex align-center justify-space-between">
                    <v-col cols="4">
                        <v-list-item-subtitle class="text-h4 d-flex justify-center">
                            {{
                            getDay({
                            date: getDate({time: dayForecast?.dt}),
                            weekday: 'short'
                            })
                            }}
                        </v-list-item-subtitle>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-center align-center">
                        <v-list-item-icon class="ma-0">
                            <v-icon :style="`transform: rotate(${dayForecast?.wind.deg}deg)`">
                                mdi-send
                            </v-icon>
                        </v-list-item-icon>
                    </v-col>
                    <v-col cols="4">
                        <v-list-item-subtitle class="text-h4 d-flex justify-center">
                            {{Math.round(dayForecast?.main.temp)}}&deg;
                        </v-list-item-subtitle>
                    </v-col>
                </v-row>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>

    import dateMixins from "@/mixins/dateMixins";

    export default {
        name: 'DayForecast',
        mixins: [dateMixins],
        props: ['dayForecast', 'loading']
    };
</script>
