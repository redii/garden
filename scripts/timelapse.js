const PiCamera = require("pi-camera")
const cam = new PiCamera({
    mode: "photo",
    width: 640,
    height: 480,
    nopreview: true,
})

setInterval(() => {
    cam.snap({
        output: "./test.jpg",
    })
}, 10000)
