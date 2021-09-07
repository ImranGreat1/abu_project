module.exports = (data, ...allowedFields) => {
    // Create new object for the accepted fields we want to return
    const acceptedFields = {};
    
    // Filter the object based on the allowedFields passed
    Object.keys(data).map((el) => {
        if (allowedFields.includes(el)) {
            acceptedFields[el] = data[el];
        }
    });

    return acceptedFields;
};
