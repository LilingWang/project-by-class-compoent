import axios from "axios";

function getSuperiorInfoStart() {
    return {
      type: 'SUPERIOR_FETCH_START'
    };
  }
function getSuperiorInfoSuccess(response) {
    return {
        type: 'SUPERIOR_FETCH_SUCCESS',
        superiorInfo: response
    };
}
function getSuperiorInfoFail(error) {
    return {
        type: 'SUPERIOR_FETCH_FAIL',
        error
    };
}

function getSolidersList(id) {
    console.log("test action get solider list", id)
    //id = ""
    return (dispatch) =>{
        dispatch(getSuperiorInfoStart())
        axios({
            method:"get",
            url:'/ArmyData/getSuperiorInfo',
            params:{id:id}
                  
        })
           .then(response => {
               console.log("test action",response.data);
               dispatch(getSuperiorInfoSuccess(response.data));
           })
           .catch(err => {
               dispatch(getSuperiorInfoFail(err));
           });
    };
}

export default getSolidersList;