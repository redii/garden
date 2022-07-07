import ky from "ky"

const options = {
    credentials: "include",
    headers: {},
    hooks: {},
}

const http = ky.extend(options)

export { http }
