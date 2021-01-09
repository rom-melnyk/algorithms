import * as readline from 'readline';


/**
 * String --> Number according to the task limitations
 */
function toNumber(str: string) {
  return +str.trim() || 0;
}


function readStdin(): Promise<number[]> {
  const rl = readline.createInterface({ input: process.stdin });
  let N: number | null = null; // amount of numbers to read
  let lineNo = 1;
  let data: number[] = [];
  return new Promise((resolve, reject) => {
    rl.on('line', (input) => {
      const num = toNumber(input);

      if (N === null) { // very first line; read "N"
        if (num < 1 || num > 2e5) {
          reject(`Bad N at first line: is "${ input }" but expected (1 <= {number} <= 2e5).`);
          return;
        }

        N = num;
        return;
      }

      if (num < 1 || num > 1e6) {
        reject(`Bad input at line ${ lineNo++ }: is "${ input }" but expected (1 <= {number} <= 1e6).`);
        return;
      }

      if (lineNo++ <= N) {
        data.push(toNumber(input));
      } else {
        resolve(data);
      }
    }).on('close', () => {
      if (lineNo < N!) {
        reject(`Input terminated unxpectedly: ${ lineNo } lines were read but expected ${ N }`);
      } else {
        resolve(data);
      }
    });
  });
}


/**
 * The payload
 */
function sort(data: number[]): number[] {
  // ------------ phase 1: calculating frequencies of every item ------------
  const frequencies: { [item: number]: number /* frequency */ } = {};
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (!frequencies[item]) {
      frequencies[item] = 0;
    }
    frequencies[item]++;
  }


  // ------------ phase 2: sort frequencies and values by (freq ascending) ------------
  // taking into accounting that there might be > 1 item sharing same frequency
  const frequenciesSorted: Array<{ frequency: number, values: number[] }> = [];
  for (const itemStr in frequencies) {
    const frequency = frequencies[itemStr];
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
    const itemNum = +itemStr; // String key --> Number
    i = 0;
    while (i < values.length && values[i] < itemNum) {
      i++;
    }
    values.splice(i, 0, itemNum);
  }


  // ------------ phase 3: expand sorted frequencies ------------
  return frequenciesSorted.reduce(
    (result, { frequency, values }) => values.reduce(
      (_res, value) => {
        for (let i = 0; i < frequency; i++) {
          _res.push(value);
        }
        return _res;
      },
      result
    ),
    [] as number[]
  );
}


// ------------------ here be dragons ------------------
readStdin()
  .then(sort)
  .then(arr => arr.forEach(el => console.log(el)))        // print result
  .catch(console.error)                                   // intercept possible errors
  .then(() => process.exit(0));                     // gracefully exit
