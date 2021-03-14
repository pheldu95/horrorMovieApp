import React, { useState, useEffect, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import axios from 'axios';
import SubgenrePicker from './SubgenrePicker';
import { useHistory } from "react-router-dom";

const Subgenres = ({ movie }) => {
    const [currentMoviePickedSubgenres, setCurrentMoviePickedSubgenres] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/subgenres/${movie.id}`
        }).then((response) => {
            setCurrentMoviePickedSubgenres(response.data.rows);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }, []);

    const submit = (pickedSubgenres) => {
        let subgenresAlreadyInDb = [];
        let newSubgenres = []
        for (let i = 0; i < pickedSubgenres.length; i++) {
            let subgenreExists = false;
            for (let existingSubgenre of currentMoviePickedSubgenres) {
                if (pickedSubgenres[i] === existingSubgenre.id) {
                    subgenreExists = true;
                }
            }
            if (subgenreExists) {
                subgenresAlreadyInDb.push(pickedSubgenres[i]);
            } else {
                newSubgenres.push(pickedSubgenres[i]);
            }
        }
        if (subgenresAlreadyInDb.length > 0) {
            dispatch({
                type: 'UP_SUBGENRE_COUNTS',
                payload: { movieId: movie.id, subgenres: subgenresAlreadyInDb }
            })
        }
        if (newSubgenres.length > 0) {
            dispatch({
                type: 'POST_NEW_SUBGENRES',
                payload: { movieId: movie.id, subgenres: newSubgenres }
            })
        }
    }

    const subgenreSearch = (subgenreId) =>{
        history.push(`/subgenreSearch/${subgenreId}`);
    }
    return (
        <Fragment>
            {currentMoviePickedSubgenres &&
                currentMoviePickedSubgenres.map((subgenre) => {
                    return (
                        <div onClick={() => subgenreSearch(subgenre.id)}>{subgenre.name}</div>
                    )
                })
            }
            <br/>
            <SubgenrePicker submit={submit} />
        </Fragment>
    );
}
export default connect(mapStoreToProps)(Subgenres);
