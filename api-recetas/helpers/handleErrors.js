const httpError = (response, error) => {
    console.log('/-------------------- Error ocurred -----------------------------------/')
    console.log(error)
    console.log('/----------------------------------------------------------------------/')    
    response.status(500)
    response.send({ error: error })
}

export { httpError }