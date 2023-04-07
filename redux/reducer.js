import * as types from "./actionTypes"

const initialState = {
    otp: "",
    ph: "",
    showOTP: false,
    loading : false,
    currentUser: null,
    error: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        case types.SET_OTP:
            return {
                ...state,
                otp: action.payload,
            }
        case types.SET_SHOW_OTP:
            return {
                ...state,
                showOTP: action.payload,
            }
        case types.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case types.SET_PH:
            return {
                ...state,
                ph: action.payload,
            }
        default:
            return state;
    }
};

export default userReducer;