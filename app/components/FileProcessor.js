import fs from 'fs';
import cheerio from 'cheerio';
import moment from 'moment';


export default {

    processFile(filepath) {
        console.log(`Processing ${filepath}...`);
        const startTime = moment();
        const data = fs.readFileSync(filepath, 'utf-8');

        const $ = cheerio.load(data, {
            ignoreWhitespace: true,
            xmlMode: true,
            lowerCaseTags: true
        });

        let results = [];

        // Is this already a spritesheet?
        let sprites = $('svg').find('symbol');
        sprites.each((i, sprite) => {
            results.push($(sprite).parent().html());
        });

        // convert the svg file into a symbol if it has data
        // remove any defs
        $('symbol').remove();
        $('defs').remove()

        const children = $('svg').children();
        if (children.length > 0) {
            let id = $('svg').attr('id');
            if (!id) {
                let title = $('title').text();
                if (title) {
                    id = title.replace(/\s/g,'');
                }
                else {
                    id = '';
                }
            }

            const width = $('svg').attr('width');
            const height = $('svg').attr('height');
            let viewBox = $('svg').attr('viewBox');
            if (!viewBox) {
                viewBox = `0 0 ${width} ${height}`;
            }

            const doc = cheerio.load(`<symbol id=${id}></symbol>`);
            doc('symbol').attr('viewBox', viewBox);

            children.each((i, child) => {
                doc('symbol').append(child);
            });

            results.push(doc('symbol').parent().html());
        }

        const endTime = moment();
        const diff = endTime.diff(startTime);
        console.log(`Processed ${filepath} into ${results.length} symbols in ${diff}ms`);

        return results;
    }

};
