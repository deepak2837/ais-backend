const fs = require('fs');
const axios = require('axios');

// Define the zoom levels and tile coordinates
const zoomLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const maxTileCoordinate = Math.pow(2, 19) - 1;

// Define the URL pattern for the tiles
const tileUrl = 'https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=fXmTwJM642uPLZiwzhA1';

// Define the directory to save the tiles
const saveDirectory = './tiles';

// Function to create a directory recursively
function createDirectory(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

// Create the save directory if it doesn't exist
createDirectory(saveDirectory);

// Function to download a tile image
async function downloadTileImage(url, savePath) {
  const response = await axios({
    url,
    responseType: 'stream',
  });

  response.data.pipe(fs.createWriteStream(savePath));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    });

    response.data.on('error', (err) => {
      reject(err);
    });
  });
}

// Function to download tiles for a specific zoom level
async function downloadTilesForZoomLevel(zoom) {
  const numTiles = Math.pow(2, zoom);

  for (let x = 0; x < numTiles; x++) {
    for (let y = 0; y < numTiles; y++) {
      const tileUrlWithParams = tileUrl.replace('{z}', zoom).replace('{x}', x).replace('{y}', y);
      const savePath = `${saveDirectory}/${zoom}/${x}/${y}.png`;

      createDirectory(`${saveDirectory}/${zoom}/${x}`);
      await downloadTileImage(tileUrlWithParams, savePath);
      console.log(`Downloaded tile: ${savePath}`);
    }
  }
}

// Function to download tiles for all zoom levels
async function downloadAllTiles() {
  for (const zoom of zoomLevels) {
    await downloadTilesForZoomLevel(zoom);
  }
}

// Start downloading the tiles
downloadAllTiles()
  .then(() => {
    console.log('All tiles downloaded successfully!');
  })
  .catch((error) => {
    console.error('Error downloading tiles:', error);
  });

