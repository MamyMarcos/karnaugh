export enum ModeEnum {
    DEC,
    BIN,
}

export class Karnaugh {
    nbVar: number;
    table: number[][];
    mode: ModeEnum;

    constructor(nbVar: number) {
        if (nbVar < 2 || nbVar > 6) {
            throw new Error("nbVar");
        }
        this.nbVar = nbVar;
        this.table = [];
        this.initTable();
        this.mode = ModeEnum.DEC;
    }

    width() {
        return (Math.floor(this.nbVar / 2) + (this.nbVar % 2)) * 2;
    }

    height() {
        return Math.floor(this.nbVar / 2) * 2;
    }

    initTable() {
        const res: number[][] = [];

        for (let i = 0; i < this.height(); i++) {
            res.push([]);
            for (let j = 0; j < this.width(); j++) {
                res[i].push(0);
            }
        }
        this.table = res;
    }

    getGrayCode(nbVar: number): number[] {
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

    setCell(value: number): boolean {
        if (this.mode === ModeEnum.DEC) {
            if (value < 0 || value >= 0b1 << this.nbVar) {
                return false;
            }
            const isBits: boolean[] = [];
            for (let i = 0; i < this.nbVar; i++) {
                isBits.push((value & (0b1 << (this.nbVar - i))) !== 0);
            }
            let posVertical = 0; // positon vertical
            let posHorizontal = 0; // position horizontal

            const bitsVertical = isBits.slice(0, this.height() / 2);
            const bitsHorizontal = isBits.slice(this.height() / 2);

            console.log(bitsVertical)
            console.log(bitsHorizontal)

            // if (!isBit1 && !isBit2) {
            //     x = 0;
            // } else if (!isBit1 && isBit2) {
            //     x = 1;
            // } else if (isBit1 && isBit2) {
            //     x = 2;
            // } else if (isBit1 && !isBit2) {
            //     x = 3;
            // }
            // if (!isBit3 && !isBit4) {
            //     y = 0;
            // } else if (!isBit3 && isBit4) {
            //     y = 1;
            // } else if (isBit3 && isBit4) {
            //     y = 2;
            // } else if (isBit3 && !isBit4) {
            //     y = 3;
            // }
            // this.table[x][y] = value;
            this.renderTable();
        }
        return true;
    }

    renderTable() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const td = document.getElementsByClassName(
                    `${i}-${j}`
                )[0] as HTMLTableCellElement;
                if (this.table[i][j] !== 0) {
                    td.innerHTML = String(this.table[i][j]);
                }
            }
        }
    }
}

export const karnaugh = new Karnaugh(2);
