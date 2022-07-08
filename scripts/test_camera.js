require("dotenv").config({ path: "../.env" })
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

async function main() {
    cam.snap().then(() => {
        const date = new Date()
        const timestamp = date.toLocaleString("de-DE").replace(", ", "_")

        const form = new FormData()
        form.append("title", timestamp)
        form.append("description", `${timestamp.replace("_", " ")}`)
        form.append("album", process.env.IMGUR_ALBUM)
        form.append("image", fs.createReadStream("latest.jpg"))

        const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.IMGUR_ACCESS_TOKEN}`,
            },
            body: form,
        })

        console.log("Image taken", response)

        fs.unlink("latest.jpg", (err) => {
            if (err) console.log(err)
        })
    })
}

main()
