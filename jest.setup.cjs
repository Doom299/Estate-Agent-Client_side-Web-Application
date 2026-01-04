require('@testing-library/jest-dom');

// Polyfill TextEncoder / TextDecoder for libraries (like react-router)
// that expect them to exist in the test environment.
const { TextEncoder, TextDecoder } = require('node:util');

if (!global.TextEncoder) {
	global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
	global.TextDecoder = TextDecoder;
}