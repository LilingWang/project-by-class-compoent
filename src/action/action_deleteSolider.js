import axios from "axios";
import {useHistory} from "react-router-dom";
import getSolidersList from "./action_getSolidersList";

function deleteSoliderStart() {
    return {
        type: 'SOLIDER_DELETE_START'
    };
}
function deleteSoliderSuccess(response) {
    return {
        type: 'SOLIDER_DELETE_SUCCESS',
        solidersList: response
    };
}
function deleteSoliderFail(error) {
    return {
        type: 'SOLIDER_DELETE_FAIL',
        error
    };
}

function getSolidersListSuccess(response) {
    return {
        type: 'SOLIDERS_FETCH_SUCCESS',
        solidersList: response
    };
}
function getSolidersListFail(error) {
    return {
        type: 'SOLIDERS_FETCH_FAIL',
        error
    };
}

function deleteSolider(id, numberOfDS, superiorid) {
   
    console.log("test.......", id, numberOfDS, superiorid)
    return (dispatch) => {
        dispatch(deleteSoliderStart())
        axios({
            method: "post",
            url: '/ArmyData/deleteSolider',
            params: { id: id, numberOfDS: numberOfDS, superiorId: superiorid }

        })
            .then(response => {
                console.log("test action", response.data);
                dispatch(deleteSoliderSuccess(response.data));
            })
            .then(response => {
               // this.props.history.push('/');
               // history.push('/')
               axios
               .get('/ArmyData/getAllSolider')
               .then(response => {
                   console.log("test action",response.data);
                   dispatch(getSolidersListSuccess(response.data));
               })
               .catch(err => {
                   dispatch(getSolidersListFail(err));
               });
            }

            )
            .catch(err => {
                dispatch(deleteSoliderFail(err));
                getSolidersList()
                //window.location.href('/')
            });
    };
}

export default deleteSolider;