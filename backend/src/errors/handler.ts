import { ErrorRequestHandler, response } from 'express';
import { ValidationError } from 'yup';

interface ValidationsErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {

    if (error instanceof ValidationError) {

        let errors: ValidationsErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        })

        console.log(error);

        return res.status(400).json({
            massage: 'Validations fail',
            errors
        });
    }

    console.log(error);

    return res.status(500).json({
        massage: 'Internal server error',
        error
    });
}

export default errorHandler;