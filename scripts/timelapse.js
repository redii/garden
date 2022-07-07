require("dotenv").config({ path: "../.env" })
const CronJob = require("cron").CronJob
const FormData = require("form-data")
const fetch = require("node-fetch")
const fs = require("fs")

const PiCamera = require("pi-camera")
const cam = new PiCamera({
    mode: "photo",
    width: 1920,
    height: 1080,
    output: "latest.jpg",
    nopreview: true,
})

var job = new CronJob(
    "0 0,30 * * * *",
    async function () {
        cam.snap().then(() => {})
    },
    null,
    true,
    false
)

job.start()

async function test() {
    const date = new Date()
    const timestamp = date
        .toLocaleString("de-DE")
        .replace(",", "_")
        .replace(" ", "")

    const form = new FormData()
    form.append("title", timestamp)
    form.append("album", process.env.IMGUR_ALBUM)
    form.append("image", fs.createReadStream("latest.jpg"))

    await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        body: form,
        headers: {
            Authorization: `Bearer ${process.env.IMGUR_ACCESS_TOKEN}`,
        },
    })

    fs.rename("latest.jpg", `../timelapse/${timestamp}.jpg`, (err) => {
        if (err) throw err
        console.log(`Image saved - ${timestamp}`)
    })
}

test()

// NOTE when using sqlite database instead of imgur use the following code
// const db = require("./database")
// const insert = db.prepare("INSERT INTO images (timestamp) VALUES (@timestamp)")

// const date = new Date()
// const result = insert.run({ timestamp: date.toISOString() })
// fs.rename(
//     `${__dirname}/latest.jpg`,
//     ${__dirname}/../www/static/timelapse/image_${result.lastInsertRowid}.jpg,
//     (err) => {
//         if (err) throw err
//         console.log(`Image saved - ${date.toISOString()}`)
//     }
// )
