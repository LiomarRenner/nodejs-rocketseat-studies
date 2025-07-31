import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        console.log(`Transformed chunk: ${transformed}`)
        callback(null, Buffer.from(String(transformed)))
    }
}
// req => Readable stream
// res => Writable stream
const server = http.createServer((req, res) => {
    return req
        .pipe(new InverseNumbersStream())
        .pipe(res)
})

server.listen(3334)