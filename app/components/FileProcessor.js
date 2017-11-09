import fs from 'fs';
import { DOMParser } from 'xmldom';


export default {

    processFile(filepath) {
        console.log(`Reading file from ${filepath}`);
        const data = fs.readFileSync(filepath, 'utf-8');
        const parser = new DOMParser();
        const document = parser.parseFromString(data, 'image/svg+xml');

        let sprites = document.getElementsByTagName('symbol');

        

        return sprites;
    }

};
