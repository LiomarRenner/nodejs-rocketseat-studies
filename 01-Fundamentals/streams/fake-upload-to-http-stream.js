import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
	index = 1

	_read() {
		const i = this.index++

		setTimeout(() => {
			if (i > 10) {
				this.push(null) // End the stream
			} else {
				const buf = Buffer.from(String(i))
				this.push(buf) // Push data to the stream
			}
		}, 200) // Simulating a delay for each chunk
	}
}

fetch('http://localhost:3334', {
	method: 'POST',
	body: new OneToHundredStream(),
	duplex: 'half',
}).then((res) => {
	return res.text()
}).then((data) => {
	console.log(`Response from server: ${data}`)
})
