const LoadingReducer = (preState = {
    isLoading: false
}, action) => {
    switch (action.type) {
        case "change_loading":
            let newState = { ...preState }
            newState.isLoading = action.payload
            return newState
        default:
            return preState
    }

}

export default LoadingReducer