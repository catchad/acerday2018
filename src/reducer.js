import { SET_CONFIG, SET_USERDATA, SET_SCROLLBAR, TOGGLE_TASK } from "./action";
// redux
import { combineReducers } from "redux";
// lib
import setting from "./locale/setting.js";
// import us from "./locale/setting/us.js";

function userData(state = { name: "deafultName", point: 0 }, action) {
    switch (action.type) {
        case SET_USERDATA:
            return action.payload;
        default:
            return state;
    }
}

function config(state = {}, action) {
    switch (action.type) {
        case SET_CONFIG:
            return setting[action.payload];
        default:
            return state;
    }
}

function scrollbar(state = true, action) {
    switch (action.type) {
        case SET_SCROLLBAR:
            action.payload.scrollbar ? document.body.classList.remove("body--hideScrollbar") : document.body.classList.add("body--hideScrollbar");

            return action.payload.scrollbar;
        default:
            return state;
    }
}

function task(state = { toggle: false }, action) {
    switch (action.type) {
        case TOGGLE_TASK:
            return action.payload;
        default:
            return state;
    }
}

const reducer = combineReducers({
    userData,
    config,
    scrollbar,
    task
});

export default reducer;
