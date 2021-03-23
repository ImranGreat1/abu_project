module.exports = (data, ...allowedFields) => {
    const acceptedFields = {};
    Object.keys(data).map((el) => {
        if (allowedFields.includes(el)) {
            acceptedFields[el] = data[el];
        }
    });

    return acceptedFields;
};
