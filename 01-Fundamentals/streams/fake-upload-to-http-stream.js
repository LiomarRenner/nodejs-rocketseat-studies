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

fetch('http://localhost:3334', {
	method: 'POST',
	body: new OneToHundredStream(),
	duplex: 'half',
})
