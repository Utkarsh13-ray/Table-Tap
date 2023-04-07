import * as types from "./actionTypes"

export const setLoading = (value) => ({
    type: types.SET_LOADING,
    payload: value,
})
export const setShowOTP = (value) => ({
    type: types.SET_SHOW_OTP,
    payload: value,
})
export const setOTP = (otp) => ({
    type: types.SET_OTP,
    payload: otp,
})
export const setCurrentUser = (user) => ({
    type: types.SET_CURRENT_USER,
    payload: user,
})
export const setPh = (ph) => ({
    type: types.SET_PH,
    payload: ph,
})

