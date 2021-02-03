import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import getUser from "../../graphql/queries/getUser";

function Overview() {
    const history = useHistory();
    const { data } = useQuery(getUser, {
        variables: { id: 1 },
    });

    const items = Array(10)
        .fill(null)
        .map((value, index) => index.toString());

    function expenseClick(id: string) {
        history.push(`/expenses/${id}`);
    }

    return (
        <>
            <h1>Expenses Overview Component</h1>
            {JSON.stringify(data)}
            <ul>
                {items &&
                    items.map((item) => (
                        <li key={item} onClick={() => expenseClick(item)}>
                            {item}
                        </li>
                    ))}
            </ul>
        </>
    );
}

export default Overview;
