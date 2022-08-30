import axios from "axios";

function getSoliderInfoStart() {
    return {
      type: 'SOLIDERINFO_FETCH_START'
    };
  }
function getSoliderInfoSuccess(response) {
    return {
        type: 'SOLIDERINFO_FETCH_SUCCESS',
        soliderInfo: response
    };
}
function getSoliderInfoFail(error) {
    return {
        type: 'SOLIDERINFO_FETCH_FAIL',
        error
    };
}

function getSoliderInfo(id) {
    console.log("test action get solider list", id)
    //id = ""
    return (dispatch) =>{
        dispatch(getSoliderInfoStart())
        axios({
            method:"get",
            url:'/ArmyData/getSuperiorInfo',
            params:{id:id}
                  
        })
           .then(response => {
               console.log("test action",response.data);
               dispatch(getSoliderInfoSuccess(response.data));
           })
           .catch(err => {
               dispatch(getSoliderInfoFail(err));
           });
    };
}

export default getSoliderInfo;