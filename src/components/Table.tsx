import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { RootState } from "../store";
import { appActions } from "../utils/appStore";
import { Karnaugh, karnaugh } from "../utils/models";

const n0 = (n: number) => {
    let res = "";
    for (let i = 0; i < n; i++) {
        res += "0";
    }
    return res;
};

const Table = () => {
    const dispatch = useDispatch();
    const table = useSelector((state: RootState) => state.app.table);
    const onClickTd = (i: number, j: number) => {
        karnaugh.updateCell(i, j, 0);
        dispatch(appActions.setTable(karnaugh.table));
        dispatch(appActions.setClauses(karnaugh.getStringClause()));
    };
    const headLeftRight = () => {
        let res = "";
        for (let i = 0; i < karnaugh.nbVar; i++) {
            if (i !== Math.log2(karnaugh.height())) {
                res += String.fromCharCode("a".charCodeAt(0) + i);
            } else {
                res += "\\" + String.fromCharCode("a".charCodeAt(0) + i);
            }
        }
        return res;
    };
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td className="bg-gray-100 text-base">
                            {headLeftRight()}
                        </td>
                        {new Array(karnaugh.width()).fill(0).map((_, i) => (
                            <td key={v4()} className="bg-gray-100">
                                {(
                                    n0(karnaugh.nbVar) +
                                    Karnaugh.getGrayCode(karnaugh.width())[
                                        i
                                    ].toString(2)
                                ).slice(
                                    -1 *
                                        (Math.floor(karnaugh.nbVar / 2) +
                                            (karnaugh.nbVar % 2))
                                )}
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
                                        <td className="bg-gray-100">
                                            {(
                                                n0(karnaugh.nbVar) +
                                                Karnaugh.getGrayCode(
                                                    row.length
                                                )[i].toString(2)
                                            ).slice(
                                                -1 * Math.log2(karnaugh.height())
                                            )}
                                        </td>
                                    )}
                                    <td
                                        className="text-gray-600 cursor-cell"
                                        onClick={() => onClickTd(i, j)}
                                    >
                                        {val !== 0 && val}
                                    </td>
                                </Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="font-bold text-lg mt-2 text-center">
                Click to delete !
            </p>
        </>
    );
};

export default Table;
