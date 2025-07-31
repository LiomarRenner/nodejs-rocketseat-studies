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
const server = http.createServer(async (req, res) => {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStream = Buffer.concat(buffers).toString()
    console.log(`Received data: ${fullStream}`)

    return res.end(fullStream)
})

server.listen(3334)