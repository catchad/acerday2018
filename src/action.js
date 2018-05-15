export const SET_CONFIG = "SET_CONFIG";

export function setConfig(country) {
    return { type: SET_CONFIG, payload: country };
}

export const SET_USERDATA = "SET_USERDATA";

export function setUserData(data) {
    return { type: SET_USERDATA, payload: { name: data.name, point: data.point } };
}

export const SET_SCROLLBAR = "SET_SCROLLBAR";

export function setScrollbar(boolean) {
    return { type: SET_SCROLLBAR, payload: { scrollbar: boolean } };
}

export const TOGGLE_TASK = "TOGGLE_TASK";

export function toggleTask(boolean) {
    return { type: TOGGLE_TASK, payload: { toggle: boolean } };
}
