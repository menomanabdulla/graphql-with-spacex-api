import React from 'react';
import { useQuery,gql } from '@apollo/client';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery  {
        launches{
            flight_number
            name
            date_local
            success
            id
        }
    }
`;



const Launches = () => {
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error </p>;
    return (
        <>
            <h1 className="display-4 my-3">
                Launches
            </h1>
            <MissionKey/>
            <>
                {
                    data.launches.map( launch => (
                        <LaunchItem key={launch.flight_number} launch={launch} />
                    ))
                }
            </>
        </>
    )
}

export default Launches;