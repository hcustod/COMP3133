const fs = require('fs');
const csv = require('csv-parser');

function deleteFileIfExists(filePath) {
  try {
    fs.unlinkSync(filePath);
    console.log(`Deleted existing file: ${filePath}`);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.log(`Could not delete ${filePath}: ${err.message}`);
    }
  }
}

deleteFileIfExists('canada.txt');
deleteFileIfExists('usa.txt');

fs.writeFileSync('canada.txt', 'country, year, population\n');
fs.writeFileSync('usa.txt', 'country, year, population\n');

const canadaStream = fs.createWriteStream('canada.txt', { flags: 'a' });
const usStream = fs.createWriteStream('usa.txt', { flags: 'a' });
console.log(`Created: canada.txt`);
console.log(`Created: usa.txt`);

let canadaCount = 0;
let usCount = 0;

fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
    const country = (row.country || '').trim();
    const year = row.year;
    const population = row.population;

    const line = `${country}, ${year}, ${population}\n`;

    if (country === 'Canada') {
      canadaStream.write(line);
      canadaCount++;
    } else if (country === 'United States') {
      usStream.write(line);
      usCount++;
    }
  })
  .on('end', () => {
    canadaStream.end();
    usStream.end();
    console.log('Finished. Success!');
    console.log(`Canada records: ${canadaCount}`);
    console.log(`USA records: ${usCount}`);
  })
  .on('error', (err) => {
    console.log(`Error code: ${err.code}`);
    console.log(`Error message: ${err.message}`);
  });
