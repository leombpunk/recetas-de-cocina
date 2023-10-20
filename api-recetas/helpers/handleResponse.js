const handleResponse = (response, status, message, data, errors) => {
    response.status(status)
    response.send({
        status,
        message,
        data,
        errors
    })
    return
}

export { handleResponse }