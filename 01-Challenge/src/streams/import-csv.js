import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvFilePath = new URL('./tasks.csv', import.meta.url);
const stream = fs.createReadStream(csvFilePath);

const csvParse = parse({
	delimiter: ',',
	skip_empty_lines: true,
	fromLine: 2
});

async function importCSV() {
	const linesParse = stream.pipe(csvParse);

	for await (const line of linesParse) {
		const [title, description] = line;

		try {
			await fetch('http://localhost:3334/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					description
				})
			});
			console.log(`Task "${title}" imported successfully.`);
		} catch (error) {
			console.error(`Error importing task "${title}":`, error);
		}
	}
}

if (process.env.IMPORT_CSV !== 'false') {
  importCSV()
		.then(() => {
			console.log('CSV import completed successfully.');
	});
}
