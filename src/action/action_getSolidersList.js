import axios from "axios";

function getSolidersListStart() {
    return {
      type: 'SOLIDERS_FETCH_START'
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

function getSolidersList() {
    return (dispatch) =>{
        dispatch(getSolidersListStart())
        axios
           .get('/ArmyData/getAllSolider')
           .then(response => {
               console.log("test action",response.data);
               dispatch(getSolidersListSuccess(response.data));
           })
           .catch(err => {
               dispatch(getSolidersListFail(err));
           });
    };
}

export default getSolidersList;