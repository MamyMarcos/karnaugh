import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { karnaugh, Karnaugh } from "./models";

export enum StepEnum {
    SelectNbVar,
    AddClauses,
    Solving,
}

export interface AppState {
    nbVar: number;
    table: number[][];
    clauses: string[];
    step: StepEnum;
}

const initialState: AppState = {
    nbVar: 2,
    table: [],
    clauses: [],
    step: StepEnum.SelectNbVar,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setNbVar(state, action: PayloadAction<number>) {
            if (2 <= action.payload && action.payload <= 6) {
                state.nbVar = action.payload;
                karnaugh.nbVar = action.payload;
                karnaugh.initTable();
                state.table = [...karnaugh.table];
            }
        },
        setClauses(state, action: PayloadAction<string[]>) {
            state.clauses = action.payload;
        },
        setStep(state, action: PayloadAction<StepEnum>) {
            state.step = action.payload;
        },
        setTable(state, action: PayloadAction<number[][]>) {
            state.table = action.payload;
        },
    },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
