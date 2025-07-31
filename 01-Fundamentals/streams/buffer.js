const buf = Buffer.from("OK")
console.log(buf) // Output: <Buffer 4f 4b>
console.log(buf.toString()) // Output: OK
console.log(buf.toJSON()) // Output: { type: 'Buffer', data: [ 79, 75 ] }

// Buffer is a global object in Node.js that provides a way to work with binary data.
// It is used to handle raw binary data, such as file contents, network packets, or any other binary data.
// Buffers are particularly useful when dealing with streams, file I/O, and network communication.

// Buffer.from() creates a new Buffer instance from a string or an array of bytes.
// It allows you to convert strings into binary data and vice versa.

// why hexadecimal representation?
// Hexadecimal representation is often used in computing to represent binary data in a more human-readable format.
// Each byte is represented by two hexadecimal digits, making it easier to visualize and debug binary data.