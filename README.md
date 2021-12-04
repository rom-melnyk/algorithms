# Algorithms

Some interesting algorithms realized in JS.
Every algorithm/version-of-realization has separate branch. So perform `git branch` and then check out what you are interested in.

## TOC

1. **Sort by frequency:** branches started with `sort-by-freq`.
2. **Pub calculator:** `pub-calculator`.
3. **Parse archived string** `parse-archive-string`.

## Dependencies

Just a bare minimum to run Typescript (`typescript`, `ts-node`) + Mocha as test engine + appropriate `@types/*`.  
No third party libs used.

## Typescript

For the sake of convenience following commands can run the file;

- `npm run ts -- path/to/the/file.ts`
- `node -r ts-node/register/transpile-only path/to/the/file.ts`
- `npm run test` to run Mocha tests (any `**/*.spec.ts` are checked)
- `npm run test:file -- path/to/the/file.spec.ts` to run Mocha against given file(s)
