// Readable streams are used to read data from a source in chunks, 
// rather than loading the entire data into memory at once.

// Writable streams are used to write data to a destination in chunks,
// allowing for efficient data processing without needing to hold the entire data in memory.

// Duplex streams can read and write data, allowing for bidirectional communication.
// Transform streams are a type of duplex stream that can modify the data as it is read or written.

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
	index = 1

	_read() {
		const i = this.index++

		setTimeout(() => {
			if (i > 100) {
				this.push(null) // End the stream
			}
	
			const buf = Buffer.from(String(i))
			this.push(buf) // Push data to the stream
		}, 300) // Simulating a delay for each chunk

	}
}

class InverseNumbersStream extends Transform {
	_transform(chunk, encoding, callback) {
		const transformed = Number(chunk.toString()) * -1
		callback(null, Buffer.from(String(transformed)))
	}
}
class MultiplyByTenStream extends Writable {
	_write(chunk, encoding, callback) {
		console.log(`Received chunk: ${chunk.toString() * 10}`)
		callback() // Signal that the chunk has been processed
	}
}

new OneToHundredStream()
	.pipe(new InverseNumbersStream())
	.pipe(new MultiplyByTenStream())
