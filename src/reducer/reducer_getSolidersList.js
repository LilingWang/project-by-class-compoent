const initState = {isFetching: false, soliders:[], error:null};

const reducer_getSoliders = (state = initState, action) => {

    // console.log(action)
  switch (action.type) {
    case 'SOLIDERS_FETCH_START':
      return {
        ...state,
        isFetching: true
      };
    case 'SOLIDERS_FETCH_FAIL':
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case 'SOLIDERS_FETCH_SUCCESS':
      return {
        isFetching: false,
        error: null,
        soliders: action.solidersList
      };
      case 'SUPERIOR_FETCH_START':
      return {
        ...state,
        isFetching: true
      };
    case 'SUPERIOR_FETCH_FAIL':
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
      case 'SUPERIOR_FETCH_SUCCESS':
      return {
        isFetching: false,
        error: null,
        soliders: action.superiorInfo
      };
      case 'SOLIDERS_EDIT_START':
        return {
          ...state,
          isFetching: true
        };
      case 'SOLIDERS_EDIT_FAIL':
        return {
          ...state,
          error: action.error,
          isFetching: false
        };
      case 'SOLIDERS_EDIT_SUCCESS':
        return {
          isFetching: false,
          error: null,
          soliders: action.solidersList
        };
      
    default:
      return state;
  }

}

export default reducer_getSoliders;