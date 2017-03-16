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
    // ------------ phase 1: calculating frequencies of every item ------------
    const frequencies = {
        // {key} is the data[] item;
        // {value} is the frequency of that item
    };
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (!frequencies[item]) {
            frequencies[item] = 0;
        }
        frequencies[item]++;
    }


    // ------------ phase 2: sort frequencies and values by (freq ascending) ------------
    // taking into accounting that there might be > 1 item sharing same frequency
    const frequenciesSorted = [
        // {
        //      frequency,
        //      values: [] // items that have same frequency; sorted in asc
        // }
    ];
    for (let item in frequencies) {
        const frequency = frequencies[item];
        // pick proper `frequenciesSorted` value or create a new one that is dedicated to current `frequency`
        let i = 0;
        while (i < frequenciesSorted.length && frequenciesSorted[i].frequency < frequency) {
            i++;
        }
        if (!frequenciesSorted[i] || frequenciesSorted[i].frequency > frequency) {
            frequenciesSorted.splice(i, 0, { frequency, values: [] });
        }

        const values = frequenciesSorted[i].values; // now `frequenciesSorted[i]` corresponds to current `frequency`

        // go ahead with placing `item` into `values[]` at proper place
        item = +item; // String key --> Number
        i = 0;
        while (i < values.length && values[i] < item) {
            i++;
        }
        values.splice(i, 0, item);
    }


    // ------------ phase 3: expand sorted frequencies ------------
    return frequenciesSorted.reduce(
        (result, {frequency, values}) => values.reduce(
            (_res, value) => {
                for (let i = 0; i < frequency; i++) { _res.push(value); }
                return _res;
            },
            result
        ),
        []
    );
}


// ------------------ here be dragons ------------------
readStdin()
    .then(sort)
    .then(arr => arr.forEach(el => console.log(el)))        // print result
    .catch(console.error)                                   // intercept possible errors
    .then(() => { process.exit(0); });                      // gracefully exit
