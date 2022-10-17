import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Clauses = () => {
    const clauses = useSelector((state: RootState) => state.app.clauses);
    return (
        <div className="font-bold flex flex-wrap gap-x-6">
            {clauses.map((clause, i) => (
                <Fragment key={i}>
                    {i !== 0 && <span>+</span>}
                    <span>{clause}</span>
                </Fragment>
            ))}
        </div>
    );
};

export default Clauses;
