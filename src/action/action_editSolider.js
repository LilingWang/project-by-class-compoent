import axios from "axios";

function editSoliderStart() {
    return {
        type: 'SOLIDER_EDIT_START'
    };
}
function editSoliderSuccess(response) {
    return {
        type: 'SOLIDER_EDIT_SUCCESS',
        solidersList: response
    };
}
function editSoliderFail(error) {
    return {
        type: 'SOLIDER_EDIT_FAIL',
        error
    };
}

function editSolider(index, newSolider, NumberOfDS, history) {
   
    console.log("test.......edit solider", NumberOfDS);
    
    return (dispatch) => {
        dispatch(editSoliderStart())
        axios({
            method: "post",
            url: '/ArmyData/editSolider',
            params:{id:index, editSolider:newSolider, numberOfDS:NumberOfDS}

        })
            .then(response => {
                console.log("test action add solider", response.data);
                dispatch(editSoliderSuccess(response.data));
            })
            .then(response => {
                //this.props.history.push('/');
                history.push('/')
            }

            )
            .catch(err => {
                dispatch(editSoliderFail(err));
            });
    };
}

export default editSolider;

