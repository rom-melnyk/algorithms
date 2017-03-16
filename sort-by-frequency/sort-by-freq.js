const readline = require('readline');


/**
 * String --> Number according to the task limitaions
 * @param {String} str 
 * @returns {Number}
 */
function toNumber(str) {
    return +str.trim() || 0;
}


/**
 * @returns {Number[]}
 */
function readStdin() {
    const rl = readline.createInterface({ input: process.stdin });
    let N = null; // amount of numbers to read
    let lineNo = 1;
    let data  = [];
    return new Promise((resolve, reject) => {
        rl.on('line', (input) => {
            const num = toNumber(input);

            if (N === null) { // very first line; read "N"
                if (num < 1 || num > 2e5) {
                    reject(`Bad N at first line: is "${input}" but expected (1 <= {number} <= 2e5).`);
                    return;
                }

                N = num;
                return;
            }

            if (num < 1 || num > 1e6) {
                reject(`Bad input at line ${lineNo++}: is "${input}" but expected (1 <= {number} <= 1e6).`);
                return;
            }

            if (lineNo++ <= N) {
                data.push( toNumber(input) );
            } else {
                resolve(data);
            }
        }).on('close', () => {
            if (lineNo < N) {
                reject(`Input terminated unxpectedly: ${lineNo} lines were read but expected ${N}`);
            } else {
                resolve(data);
            }
        });
    });
}


/**
 * The payload
 * @param {Number[]} data 
 * @returns {Number[]} 
 */
function sort(data) {
        // 1) sorting descending
    return data.sort((a, b) => a - b)
        // 2) splitting by series => [ [a, a, a,...], [b, b,...],... ]
        .reduce(
            (series, n) => {
                let chunk = series[ series.length - 1 ];
                if (!chunk || n !== chunk[0]) {
                    chunk = [];
                    series.push(chunk);
                }
                chunk.push(n);
                return series;
            },
            [])
        // 3) sorting series by length
        .sort((a, b) => a.length - b.length)
        // 4) expanding the series
        .reduce((result, serie) => result.concat(serie), []);
}


// ------------------ here be dragons ------------------
readStdin()
    .then(sort)
    .then(arr => arr.forEach(el => console.log(el)))        // print result
    .catch(console.error)                                   // intercept possible errors
    .then(() => { process.exit(0); });                      // gracefully exit
