/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
const navigate = useNavigate()
    const { loading, isLoggedIn } = useSelector(state => state.auth);

    return (
        <>
            {loading === false && (
                isLoggedIn === false ? navigate("/") : children
            )}
        </>
    );
};

export default PrivateRoute;
