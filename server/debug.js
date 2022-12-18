let ln = -1 // line number

export function getln() {
    ln++;
    return `[${ln}]:`;
}

export function logmsg() {
    if (arguments.length == 1)
    {
        const msg = arguments[0];
        console.log(`${getln()} ${msg}`);
    }
    else if (arguments.length == 2) {
        const fromFile = arguments[0]
        const msg = arguments[1];
        console.log(`${getln()} ${fromFile}: ${msg}`);
    }
    else if (arguments.length == 3) {
        const fromFile = arguments[0]
        const fromFunction = arguments[1]
        const msg = arguments[2];
        console.log(`${getln()} ${fromFile}:${fromFunction}: ${msg}`);
    }
}