const CollapsedReducer = (preState = {
    isCollapsed: false
}, action) => {
    switch (action.type) {
        case "change_collapsed":
            let newState = { ...preState }
            newState.isCollapsed = !newState.isCollapsed
            return newState
        default:
            return preState
    }

}

export default CollapsedReducer