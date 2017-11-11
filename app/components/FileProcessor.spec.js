import FileProcessor from './FileProcessor';


describe('FileProcessor.processFile', () => {
    const svgdir = `${__dirname}/../test`;
    const spritePath = `${svgdir}/sprite.svg`;
    const headphonesPath = `${svgdir}/headphones.svg`;
    const homePath = `${svgdir}/home.svg`;
    const pencilPath = `${svgdir}/pencil.svg`;

    it('Should handle svg sprite sheets', () => {
        let sprites = FileProcessor.processFile(spritePath);
        expect(sprites.length).toBe(3);
    });

    it('Should handle svg files', () => {
        let sprites = FileProcessor.processFile(headphonesPath);
        console.log('# of sprites: ' + sprites.length);
    });
});
