import { Fragment } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { RootState } from "./store";
import { karnaugh } from "./utils/models";

const n0 = (n: number) => {
    let res = "";
    for (let i = 0; i < n; i++) {
        res += "0";
    }
    return res;
};

const Table = () => {
    const table = useSelector((state: RootState) => state.app.table);
    return (
        <table>
            <thead>
                <tr>
                    <td></td>
                    {new Array(karnaugh.width()).fill(0).map((_, i) => (
                        <td key={v4()}>
                            {(
                                n0(karnaugh.nbVar) +
                                karnaugh
                                    .getGrayCode(karnaugh.width())
                                    [i].toString(2)
                            ).slice(-1 * (karnaugh.width() / 2))}
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {table.map((row, i) => (
                    <tr key={v4()}>
                        {row.map((val, j) => (
                            <Fragment key={v4()}>
                                {j === 0 && (
                                    <td>
                                        {(
                                            n0(karnaugh.nbVar) +
                                            karnaugh
                                                .getGrayCode(row.length)
                                                [i].toString(2)
                                        ).slice((-1 * karnaugh.height()) / 2)}
                                    </td>
                                )}
                                <td>{val}</td>
                            </Fragment>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
