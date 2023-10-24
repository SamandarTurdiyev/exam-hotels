export const createError = (status , message) => {
    const err = new Error()
    err.message= status
    err.message = message
    return err
}