export const isObjectEmpty = (value: string | number | object): boolean => {
    if (value === null) {
        return true;
    } else if (typeof value !== 'number' && value === '') {
        return true;
    } else if (typeof value === 'undefined' || value === undefined) {
        return true;
    } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    } else {
        return false;
    }
};

export const stringValuesToPrimitives = (object: { [key: string]: any }) => {
    return Object.keys(object).reduce((newObj, key) => {
        const value = object[key];

        // if value is not string, skip it
        if (typeof value !== 'string') {
            newObj[key] = value;
            return newObj;
        }

        if (value === 'true' || value === 'false') {
            newObj[key] = value === 'false' ? false : true;
        } else if (value === 'undefined') {
            newObj[key] = undefined;
        } else if (value === 'null') {
            newObj[key] = null;
        } else if (!isNaN(+value)) {
            newObj[key] = Number(value);
        } else {
            newObj[key] = value;
        }

        return newObj;
    }, {} as { [key: string]: any });
};
