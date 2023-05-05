import {useLocation, useNavigate, useParams, /* ...other hooks */} from 'react-router-dom';

const withRouter = WrappedComponent => props => {
    // const params = useParams();

    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
        <WrappedComponent
            {...props}
            router={{ location, navigate, params }}
        />
    );
    // return (
    //     <WrappedComponent
    //         {...props}
    //         {...{ params, /* other hook props */ }}
    //     />
    // );
};

export default withRouter;