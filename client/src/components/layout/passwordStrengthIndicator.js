const hasNum = (value) => {
    return new RegExp(/[0-9]/).test(value);
}

const hasSpecialChars = (value) => {
    return new RegExp(/[!@#$%^&*)(-+=,_)]/).test(value);
}

const hasMixed = (value) => {
    return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
}

export const strengthColour = (value) => {
    if (value >= 5) {
        return 'green'
    }
    if (value === 4) {
        return 'yellow'
    }
    if (value <= 3) {
        return 'red'
    }
}

export const strengthIndicator = (value) => {
    const match = [];

    if (value.length > 4) {
        match.push('greater-than-4')
    }

    if (value.length > 6) {
        match.push('greater-than-6')
    }

    if (hasNum(value)) {
        match.push('has-numbers')
    }
    if (hasSpecialChars(value)) {
        match.push('has-special')
    }
    if (hasMixed(value)) {
        match.push('has-mixed')
    }

    return match.length
}