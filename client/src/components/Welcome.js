import { Link } from "react-router-dom";
import SignIn from "./SignIn";
export default function Welcome() {
    return (
        // <div>
        //     <h2>
        //         <Link to="SignUp">Click to view sign up</Link>
        //     </h2>
        //     <h2>
        //         <Link to="SignIn">Click to view sign in</Link>
        //     </h2>
        // </div>
        <SignIn />
    );
}