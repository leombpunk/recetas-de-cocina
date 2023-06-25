import { validationResult } from "express-validator";

const validateResult = (request, response, next) => {
    try {
        validationResult(request).throw()
        return next()
    } catch (error) {
        response.status(403)
        response.send({ errors: error.array() })
    }
}

export { validateResult }