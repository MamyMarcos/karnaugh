export enum ModeEnum {
    DEC,
    BIN,
}

export class Karnaugh {
    nbVar: number;
    table: number[][];

    constructor(nbVar: number) {
        if (nbVar < 2 || nbVar > 6) {
            throw new Error("nbVar");
        }
        this.nbVar = nbVar;
        this.table = [];
        this.initTable();
    }

    width() {
        return 0b1 << (Math.floor(this.nbVar / 2) + (this.nbVar % 2));
    }

    height() {
        return 0b1 << Math.floor(this.nbVar / 2);
    }

    initTable() {
        this.table = [];
        for (let i = 0; i < this.height(); i++) {
            const row = [];
            for (let j = 0; j < this.width(); j++) {
                row.push(0);
            }
            this.table.push(row);
        }
    }

    static getGrayCode(nbVar: number): number[] {
        const getGrayCodeRec = (
            nbVar: number,
            res: number[] = [],
            nbTour: number = 0
        ): number[] => {
            if (nbTour === nbVar) {
                return res;
            }
            if (res.length === 0) {
                return getGrayCodeRec(nbVar, [0b0, 0b1], nbTour + 1);
            }
            const newRes = [
                ...res,
                ...res.reverse().map((val) => val | (0b1 << nbTour)),
            ];
            return getGrayCodeRec(nbVar, newRes, nbTour + 1);
        };
        return getGrayCodeRec(nbVar);
    }

    updateCell(
        posVertical: number,
        posHorizontal: number,
        value: number
    ): boolean {
        if (value < 0 || value >= 0b1 << this.nbVar) {
            return false;
        }
        const newTable = [];

        for (let i = 0; i < this.height(); i++) {
            const row = [];
            for (let j = 0; j < this.width(); j++) {
                if (i === posVertical && j === posHorizontal) {
                    row.push(value);
                } else {
                    row.push(this.table[i][j]);
                }
            }
            newTable.push(row);
        }

        this.table = [...newTable];
        return true;
    }

    addClause(value: number): boolean {
        if (value < 0 || value >= 0b1 << this.nbVar) {
            return false;
        }
        const isBits: number[] = [];
        for (let i = 0; i < this.nbVar; i++) {
            isBits.push(value & (0b1 << (this.nbVar - i - 1)));
        }

        const bitsVertical = isBits.slice(0, Math.log2(this.height()));
        const bitsHorizontal = isBits.slice(Math.log2(this.height()));

        console.log(bitsVertical, bitsHorizontal);

        const valVertical = bitsVertical.reduce(
            (p, n) => p + (n >> Math.log2(this.width())),
            0
        );

        const valHorizontal = bitsHorizontal.reduce((p, n) => p + n);
        const posVertical = Karnaugh.getGrayCode(
            Math.log2(this.height())
        ).indexOf(valVertical);
        const posHorizontal = Karnaugh.getGrayCode(
            Math.log2(this.width())
        ).indexOf(valHorizontal);
        this.updateCell(posVertical, posHorizontal, value);
        return true;
    }

    getStringClause(): string[] {
        const res: string[] = [];
        for (let i = 0; i < this.height(); i++) {
            for (let j = 0; j < this.width(); j++) {
                if (this.table[i][j] !== 0) {
                    let s = "";
                    for (let k = 0; k < this.nbVar; k++) {
                        if (
                            (this.table[i][j] &
                                (0b1 << (this.nbVar - k - 1))) !==
                            0
                        ) {
                            s += String.fromCharCode("a".charCodeAt(0) + k);
                        } else {
                            s +=
                                "-" +
                                String.fromCharCode("a".charCodeAt(0) + k);
                        }
                        s += " ";
                    }
                    res.push(s.slice(0, -1));
                }
            }
        }
        return res;
    }
}

export const karnaugh = new Karnaugh(2);
