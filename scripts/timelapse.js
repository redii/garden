require("dotenv").config({ path: "../.env" })
const CronJob = require("cron").CronJob
const FormData = require("form-data")
const fetch = require("node-fetch")
const fs = require("fs")

let access_token = process.env.IMGUR_ACCESS_TOKEN
let refresh_token = process.env.IMGUR_REFRESH_TOKEN

const PiCamera = require("pi-camera")
const cam = new PiCamera({
    mode: "photo",
    width: 1920,
    height: 1080,
    output: "latest.jpg",
    nopreview: true,
})

async function upload(form) {
    return new Promise(async (resolve) => {
        let response = await uploadImgur(form)

        if (response.status === 401) {
            await refreshToken()
            let response = await uploadImgur(form)
        }

        resolve(response)
    })
}

function uploadImgur(form) {
    return new Promise(async (resolve) => {
        const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            body: form,
        })

        resolve(response)
    })
}

function refreshToken() {
    return new Promise(async (resolve) => {
        console.log("Token refresh", new Date().toLocaleString("de-DE"))

        const form = new FormData()
        form.append("refresh_token", refresh_token)
        form.append("client_id", process.env.IMGUR_CLIENT_ID)
        form.append("client_secret", process.env.IMGUR_CLIENT_SECRET)
        form.append("grant_type", "refresh_token")

        const response = await fetch("https://api.imgur.com/oauth2/token", {
            method: "POST",
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            },
            body: form,
        })

        const data = await response.json()
        access_token = data.access_token
        refresh_token = data.refresh_token

        // update .env file
        fs.writeFile(
            "../.env",
            `IMGUR_CLIENT_ID=${process.env.IMGUR_CLIENT_ID}\nIMGUR_CLIENT_SECRET=${process.env.IMGUR_CLIENT_SECRET}\nIMGUR_ACCESS_TOKEN=${data.access_token}\nIMGUR_REFRESH_TOKEN=${data.refresh_token}\nIMGUR_ALBUM=${process.env.IMGUR_ALBUM}`,
            (err) => {
                if (err) console.log(err)
            }
        )

        resolve()
    })
}

const cronjob = new CronJob(
    "0 0,30 * * * *",
    async () => {
        cam.snap().then(() => {
            const date = new Date()
            const timestamp = date.toLocaleString("de-DE").replace(", ", "_")

            const form = new FormData()
            form.append("title", timestamp)
            form.append("description", `${timestamp.replace("_", " ")}`)
            form.append("album", process.env.IMGUR_ALBUM)
            form.append("image", fs.createReadStream("latest.jpg"))

            await upload(form)

            fs.rename("latest.jpg", `../timelapse/${timestamp}.jpg`, (err) => {
                if (err) console.log(err)
                console.log(`Image saved ${timestamp.replace("_", " ")}`)
            })
        })
    },
    null,
    true,
    false
)

cronjob.start()

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
