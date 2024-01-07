import { Link } from "react-router-dom"
const EnterPage = () => {
    return (
        <><div style={{ textAlign: "center" }}>
            <Link to={'/Login'} >  כניסה </Link> <p />
            <Link to={'/Signin'}>  הרשמה  </Link>
        </div>  </>
    );
}
export default EnterPage;
