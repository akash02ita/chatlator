import { Link } from "react-router-dom";
import SignIn from "./SignIn";
export default function Welcome() {
    return (
        // <div>
        //     <h2>
        //         <Link to="signup">Click to view sign up</Link>
        //     </h2>
        //     <h2>
        //         <Link to="signin">Click to view sign in</Link>
        //     </h2>
        // </div>
        <SignIn />
    );
}