import { useSelector } from "react-redux";
import { RootState } from "../store";

const Clauses = () => {
    const clauses = useSelector((state: RootState) => state.app.clauses);
    return <div className="font-bold">{clauses.reduce((p, n) => p + "  *  " + n)}</div>;
};

export default Clauses;
