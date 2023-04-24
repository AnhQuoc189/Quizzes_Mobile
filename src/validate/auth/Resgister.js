export const RegisterValid = (name, value, formData, setErrorUser) => {
    switch (name) {
        case 'userName':
            if ((value.length < 5 && value.length > 0) || value.length > 15) {
                var l = value.length;
                setErrorUser((preState) => {
                    var newState = {
                        ...preState,
                        requestQuantity: true,
                        userNameError: true,
                        textQuantity:
                            l < 5
                                ? 'Enter at least 5 characters !'
                                : 'Enter at most 15 characters !',
                    };
                    return newState;
                });
            } else {
                setErrorUser((preState) => {
                    var newState = {
                        ...preState,
                        requestQuantity: false,
                        userNameError: false,
                    };
                    return newState;
                });
            }
            break;

        case 'email':
            var email =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (email.test(value) || value === '') {
                setErrorUser((preState) => {
                    var newState = {
                        ...preState,
                        emailError: false,
                    };
                    return newState;
                });
            } else {
                setErrorUser((preState) => {
                    var newState = {
                        ...preState,
                        emailError: true,
                    };
                    return newState;
                });
            }

            break;

        case 'password':
            var password =
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
            if (password.test(value) || value === '') {
                setErrorUser((preState) => {
                    var newState = {
                        ...preState,
                        passwordError: false,
                    };
                    return newState;
                });
            } else {
                setErrorUser((preState) => {
                    var newState = {
                        ...preState,
                        passwordError: true,
                    };
                    return newState;
                });
            }
            break;

        case 'confirmPassword':
            if (value !== formData.password) {
                if (value === '') {
                    setErrorUser((preState) => {
                        var newState = {
                            ...preState,
                            confirmPasswordError: false,
                        };
                        return newState;
                    });
                } else {
                    setErrorUser((preState) => {
                        var newState = {
                            ...preState,
                            confirmPasswordError: true,
                        };
                        return newState;
                    });
                }
            } else {
                setErrorUser((preState) => {
                    var newState = {
                        ...preState,
                        confirmPasswordError: false,
                    };
                    return newState;
                });
            }
            break;

        default:
            break;
    }
};

export const EmailReset = (value, setEmailFormaError) => {
    var email =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.test(value) || value === '') {
        setEmailFormaError(false);
    } else {
        setEmailFormaError(true);
    }
};

export const RequirePassword = (value, setRequirePasswordError) => {
    var password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (password.test(value) || value === '') {
        setRequirePasswordError(false);
    } else {
        setRequirePasswordError(true);
    }
};
