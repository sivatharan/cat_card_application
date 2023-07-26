import mergeImg from "merge-img";
import minimist from "minimist";
import util from 'util'
import { BASE_URL } from "./config.js";
import { get } from "./api/index.js";
import { writeFile } from "./common/util.js";
const processArg = minimist(process.argv.slice(2));


const {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = processArg;
// Using object destructuring to extract properties from argv directly with default values

const getCatImage = async (text) => {
  const encodedText = encodeURIComponent(text);
  // Ensuring proper URL encoding of text to avoid issues with special characters
  const url = `${BASE_URL}/${encodedText}?width=${width}&height=${height}&color=${color}&s=${size}`;
  try {
    const data = await get(url, { responseType: "arraybuffer" });
    return data;
  } catch (error) {
    console.log("Error:", error.message);
    throw error;
  }
};


const createCatCard = async () => {
  try {
    const [firstBody, secondBody] = await Promise.all([
      getCatImage(greeting),
      getCatImage(who),
    ]);
    const catImages = [
      { src: Buffer.from(firstBody, "binary"), x: 0, y: 0 },
      { src: Buffer.from(secondBody, "binary"), x: width, y: 0 },
    ];

    const mergedImage = await mergeImg(catImages);
    const getBufferPromise = util.promisify(mergedImage.getBuffer.bind(mergedImage));
    const buffer  = await getBufferPromise("image/jpeg");
    await writeFile(buffer, `/cat-card.jpg`);

    console.log("The file was saved!");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

createCatCard();
