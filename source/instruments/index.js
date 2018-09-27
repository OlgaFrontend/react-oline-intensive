export const sum = (operand1, operand2) => {
    if (typeof operand1 !== 'number') {
        throw new Error('Operand 1 should be a number.');
    } else if (typeof operand2 !== 'number') {
        throw new Error('Operand 2 should be a number.');
    }

    return operand1 + operand2;
};

export const delay = (duration = 1000) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export const getUniqueID = (length = 15) => {
    if (typeof length !== 'number') {
        throw new Error('The function argument should be a number!');
    }

    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getFullApiUrl = (api, GROUP_ID) => {
    if (typeof api !== 'string' || typeof GROUP_ID !== 'string') {
        throw new Error(
            "'api' and 'GROUP_ID' arguments passed should be a string!",
        );
    }

    return `${api}/${GROUP_ID}`;
};
