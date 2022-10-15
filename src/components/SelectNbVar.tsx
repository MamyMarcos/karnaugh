import { useState } from "react";
import { useDispatch } from "react-redux";
import { appActions, StepEnum } from "../utils/appStore";
import { karnaugh } from "../utils/models";

const SelectNbVar = () => {
    const dispatch = useDispatch();
    const [nbVar, setNbVar] = useState<number>(karnaugh.nbVar);
    const onClickValider = () => {
        dispatch(appActions.setNbVar(nbVar));
        dispatch(appActions.setStep(StepEnum.AddClauses));
    };
    return (
        <div className="flex flex-col gap-y-2 items-center">
            <p className="font-bold">Select the number of variable</p>
            <div className="flex gap-x-4">
                <input
                    type="number"
                    min={2}
                    max={6}
                    className="px-4 py-1 rounded border shadow text-center font-bold"
                    placeholder="4"
                    value={nbVar}
                    onInput={(e) => {
                        if (/^[2-6]$/.test(e.currentTarget.value)) {
                            setNbVar(Number(e.currentTarget.value));
                        }
                    }}
                />
                <button
                    className="bg-blue-600 text-white py-1 rounded px-4 font-bold"
                    onClick={onClickValider}
                >
                    Valider
                </button>
            </div>
        </div>
    );
};

export default SelectNbVar;
