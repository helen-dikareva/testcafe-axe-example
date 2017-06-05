import fs from 'fs';
import { ClientFunction } from 'testcafe';

const AXE_SCRIPT = fs.readFileSync('./axe.min.js').toString();

class AxeError extends Error {
    constructor (message) {
        super(message);

        this.name = this.constructor.name;

        if (typeof Error.captureStackTrace === 'function')
            Error.captureStackTrace(this, this.constructor);
        else
            this.stack = (new Error(message)).stack;
    }
}

const injectFunction = ClientFunction(() => {
    if (!window.axe || !window.axe.run)
        eval(AXE_SCRIPT);
}, { dependencies: { AXE_SCRIPT } });

const runFunction = ClientFunction((context, options) => {
    var axeError = '';

    return axe.run(context || document, options || {})
        .catch(err => {
            axeError = err.message;
        })
        .then(results => {
            if (!axeError && results.violations.length !== 0) {
                for (var violation of results.violations) {
                    axeError += `${violation.help}\n\tnodes:\n`;

                    for (var node of violation.nodes) {
                        var targetNodes = node.target.map(target => {
                            return `"${target}"`;
                        }).join(', ');

                        axeError += `\t\t${targetNodes}\n`;
                    }
                }
            }

            return axeError;
        });
});

export default async function axeCheck (context, options) {
    await injectFunction();

    var error = await runFunction(context, options);

    if (error)
        throw new AxeError(`\n${error}`);
}
