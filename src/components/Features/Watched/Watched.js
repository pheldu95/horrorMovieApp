import React, {useState, useEffect} from "react";
import { connect, useSelector, useDispatch} from 'react-redux';
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { useHistory } from "react-router-dom";
import { Button, ButtonContent, Icon } from 'semantic-ui-react';
import { watchedListChecker } from "../../App/Common/watchedListChecker";

const Watched = ({movieId}) => {
    const history = useHistory();
    const [onWatchedList, setOnWatchedList] = useState(false);
    const watchedList = useSelector((state) => state.watchedList)
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        watchedListCheck();
    }, [watchedList, watchedListCheck]);

    function watchedListCheck() {
        let response = watchedListChecker(movieId, watchedList)
        setOnWatchedList(response);
    }

    const addToWatchedList = () => {
        dispatch({
            type: 'ADD_TO_WATCHED_LIST',
            payload: { movieId: movieId, userId: user.id }
        });
        setOnWatchedList(true);
    }
    const deleteFromWatchedList = () => {
        dispatch({
            type: 'DELETE_FROM_WATCHED_LIST',
            payload: { movieId: movieId, userId: user.id }
        });
        setOnWatchedList(false);
    }

    return (
       <>
            {onWatchedList

                ? <Button animated='fade' onClick={() => deleteFromWatchedList()}>
                    <Button.Content hidden>Remove</Button.Content>
                    <ButtonContent visible>
                        <Icon name='check circle outline' />
                    </ButtonContent>
                </Button>

                : <Button animated='fade' onClick={() => addToWatchedList()}>
                    <Button.Content hidden>Add</Button.Content>
                    <ButtonContent visible>
                        <Icon name='eye' />
                    </ButtonContent>
                </Button>
            }
       </> 
    );
}
export default connect(mapStoreToProps)(Watched);