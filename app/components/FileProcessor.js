import fs from 'fs';
import cheerio from 'cheerio';
import moment from 'moment';
import uuidv1 from 'uuid/v1';


export default {

    getSymbolObject(symbolElement) {
        console.log('Looking for symbol in: ' + symbolElement);
        const $ = cheerio.load(symbolElement, {
            ignoreWhitespace: true,
            xmlMode: true,
            lowerCaseTags: true
        });

        let title = $('title').text();
        let id = $('svg').attr('id');
        if (!id) {
            id = $('symbol').attr('id');
        }

        if (!id && title) {
            id = title.replace(/\s/g,'');
        }
        else if (!id){
            let uuid = uuidv1().replace(/-/g,'');
            id = uuid.substr(uuid.length - 6);
        }

        if (!title) {
            title = id;
        }

        let description = $('desc').text();
        if (!description) {
            description = `Description for symbol ${title}`;
        }

        return {
            id: id,
            title: title,
            description: description,
            content: symbolElement
        };
    },

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
            results.push(this.getSymbolObject($.html(sprite)));
        });
        //console.log('Found symbols: ' + JSON.stringify(results));

        // convert the svg file into a symbol if it has data
        // remove any defs
        $('symbol').remove();
        $('defs').remove()

        const children = $('svg').children();
        if (children.length > 0) {

            const { id } = this.getSymbolObject($('svg').html());

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

            //results.push(doc('symbol').parent().html());
            results.push(this.getSymbolObject(doc('symbol').parent().html()));
        }

        const endTime = moment();
        const diff = endTime.diff(startTime);
        console.log(`Processed ${filepath} into ${results.length} symbols in ${diff}ms`);

        return results;
    }

};
