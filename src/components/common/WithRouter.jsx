import { useParams, /* ...other hooks */ } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // ...other hooks

    return (
        <WrappedComponent
            {...props}
            {...{ params, /* other hook props */ }}
        />
    );
};

export default withRouter;