export const validateRequest = (schema, property, viewToRender) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property]);
        if (error) {
            return res.render(viewToRender, { error: error.message });
        }
        req[property] = value;
        next();
    };
};