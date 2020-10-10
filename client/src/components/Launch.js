import React from 'react'
import { useQuery,gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Moment from 'react-moment';

const LAUNCHE_QUERY = gql`
    query LaunchQuery($id: String!){
        launch(id: $id){
            flight_number
            name
            details
            success
        }
    }
`;

const Launch = (props) => {
    
    let { id } = props.match.params;
    console.log(id)
    const { loading, error, data } = useQuery(LAUNCHE_QUERY,
        {
            variables: { id }  
        });
    
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error </p>;
    console.log(data)
    const {
        success,
        name,
        details,
        date_local
    } = data.launch;
    return (
        <>
            <div className="card card-body">
                <h4>Mission: <span className={classNames({
                    'text-success' : success,
                    'text-danger' : !success
                })}> {name} </span></h4>
                <p>
                    Details: {details}
                </p>
                <p>
                   Launch Date: <Moment format="YYYY-MM-DD hh:mm">{date_local}</Moment>
                </p>
                <Link to="/" className="btn btn-secondary" style={{ width: 100 }}>Back</Link>
            </div>
        </>
    )
}

export default Launch;