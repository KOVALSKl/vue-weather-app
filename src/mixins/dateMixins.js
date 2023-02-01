export default {
    methods: {
        getDate({time, timezone = 0}) {
            return new Date((time + timezone - 10800) * 1000);
        },

        getDay({date, weekday, encoding = 'en-US'}) {
            if(date instanceof Date) {
                return date.toLocaleDateString(encoding, {weekday});
            } else {
                return new Date(date).toLocaleDateString(encoding, {weekday});
            }
        }
    }
}