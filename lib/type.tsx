interface ActionType {
    REQUEST: string;
    SUCCESS: string;
    ERROR: string;
}

export default function TYPE(target: string): ActionType {
    target = target.toUpperCase();
    const response: ActionType = {
        REQUEST: `${target}_REQUEST`,
        SUCCESS: `${target}_SUCCESS`,
        ERROR: `${target}_ERROR`,
    };
    // switch (target) {
    //     case "USER":
    //         response.REQUEST = "USER_REQUEST";
    //         response.SUCCESS = "USER_SUCCESS";
    //         response.ERROR = "USER_FAILURE";
    //         break;
    //     case "LOGOUT" :
    //         response.REQUEST ="LOGOUT_REQUEST";
    //         response.SUCCESS ="LOGOUT_SUCCESS";
    //         response.ERROR ="LOGOUT_ERROR";
    //         break;
    // }
    return response;
}
