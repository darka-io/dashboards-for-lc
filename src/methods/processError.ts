export default function processError(e: any) {
    let error: any = e;
    if (e.response?.data) {
        error = {
            error_message: e.message,
            response: e.response?.data,
            request: e.request?.body,
        }
    }
    else if (e.message) {
        error = {
            error_message: e.message,
            // stack: e.stack
        }
    }
    else if (typeof e === 'string') {
        error = {
            error_message: e
        }
    }
    else {
        error = {
            error_message: "Could not process error",
        }
    }
    return error;
}