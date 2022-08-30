import axios from "axios";

function addSoliderStart() {
    return {
        type: 'SOLIDER_ADD_START'
    };
}
function addSoliderSuccess(response) {
    return {
        type: 'SOLIDER_ADD_SUCCESS',
        solidersList: response
    };
}
function addSoliderFail(error) {
    return {
        type: 'SOLIDER_ADD_FAIL',
        error
    };
}

function addSolider(newSolider, history) {
   
    console.log("test.......", newSolider)
    return (dispatch) => {
        dispatch(addSoliderStart())
        axios({
            method: "post",
            url: '/ArmyData/addNewSolider',
            data: newSolider

        })
            .then(response => {
                console.log("test action add solider", response.data);
                dispatch(addSoliderSuccess(response.data));
            })
            .then(response => {
                //this.props.history.push('/');
                history.push('/')
            }

            )
            .catch(err => {
                dispatch(addSoliderFail(err));
            });
    };
}

export default addSolider;