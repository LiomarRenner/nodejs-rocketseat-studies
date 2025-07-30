// Readable streams are used to read data from a source in chunks, 
// rather than loading the entire data into memory at once.

// Writable streams are used to write data to a destination in chunks,
// allowing for efficient data processing without needing to hold the entire data in memory.

// Duplex streams can read and write data, allowing for bidirectional communication.

// process.stdin.pipe(process.stdout)

import { Readable } from 'node:stream'

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

new OneToHundredStream().pipe(process.stdout) // Pipe the stream to stdout
// This will print numbers from 1 to 100 to the console, each as a separate chunk.