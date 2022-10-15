import { useSelector } from "react-redux";
import AddClause from "./components/AddClause";
import SelectNbVar from "./components/SelectNbVar";
import { RootState } from "./store";
import Table from "./components/Table";
import { StepEnum } from "./utils/appStore";
import Clauses from "./components/Clauses";

const App = () => {
    const step = useSelector((state: RootState) => state.app.step);
    const clauses = useSelector((state: RootState) => state.app.clauses);
    return (
        <div className="App">
            <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col gap-y-4 items-center">
                <h1 className="text-center text-2xl font-bold">
                    Simplification de Karnaugh
                </h1>
                {step === StepEnum.SelectNbVar && (
                    <div>
                        <SelectNbVar />
                    </div>
                )}
                {step !== StepEnum.SelectNbVar && (
                    <>
                        <div>
                            <AddClause />
                        </div>
                        <div>
                            <Table />
                        </div>
                        <div>{clauses.length > 0 && <Clauses />}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
