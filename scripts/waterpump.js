var CronJob = require("cron").CronJob
const Gpio = require("onoff").Gpio
const relais = new Gpio(17, "out")

var job = new CronJob(
    "0 0 8,19 * * *",
    function () {
        relais.writeSync(1)
        setTimeout(() => {
            relais.writeSync(0)
        }, 1000)
    },
    null,
    true,
    false
)

job.start()
