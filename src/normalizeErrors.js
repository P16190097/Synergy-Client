const normalizeErrors = (errors) => errors.reduce((acc, cv) => {
    if (cv.path in acc) {
        acc[cv.path].push(cv.message);
    } else {
        acc[cv.path] = [cv.path];
    }
    return acc;
}, {});

export default normalizeErrors;
