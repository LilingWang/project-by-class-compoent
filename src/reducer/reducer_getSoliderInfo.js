const initState = {isFetching: false, soliders:[], error:null};

const reducer_getSoliderInfo = (state = initState, action) => {

    // console.log(action)
  switch (action.type) {
    case 'SOLIDERINFO_FETCH_START':
      return {
        ...state,
        isFetching: true
      };
    case 'SOLIDERINFO_FETCH_FAIL':
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case 'SOLIDERINFO_FETCH_SUCCESS':
      return {
        isFetching: false,
        error: null,
        soliderInfo: action.soliderInfo
      };
    default:
      return state;
  }

}

export default reducer_getSoliderInfo;