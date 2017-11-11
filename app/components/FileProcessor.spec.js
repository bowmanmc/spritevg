import FileProcessor from './FileProcessor';


describe('FileProcessor.processFile', () => {
    const svgdir = `${__dirname}/../test`;
    const spritePath = `${svgdir}/sprite.svg`;
    const headphonesPath = `${svgdir}/headphones.svg`;
    const homePath = `${svgdir}/home.svg`;
    const pencilPath = `${svgdir}/pencil.svg`;

    it('handles svg sprite sheets', () => {
        let sprites = FileProcessor.processFile(spritePath);
        expect(sprites.length).toBe(3);
    });

    it('handles plain svg files', () => {
        let sprites = FileProcessor.processFile(homePath);
        expect(sprites.length).toBe(1);
    });

    it('handles combo svg files', () => {
        let sprites = FileProcessor.processFile(headphonesPath);
        expect(sprites.length).toBe(2);
    });
});
