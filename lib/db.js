// import { stat, writeFile } from "fs"
const {Task, Either} = require("./types")
// import path from "path"
const I = require("immutable-ext")

// strategy...reader...

// // File (transformers?)
// const rootPath = x => path.resolve('db', x)

// const findOrCreateFile = (path) =>
//     stat(path) // Task(dir)
//     .fold(() => touch(path), () => Task.of(path))

// const loadTable = tableName =>
//     findOrCreateFile(rootPath(tableName))
//     .chain(readFile)
//     .chain(parse)
//     .fold(() => Task.of([]))

// const store = (tableName, table) =>
//     stringify(table)
//     .chain(table => writeFile(rootPath(tableName), table))
//     .map(() => table)

// const genId = table =>
//     last(table).fold(() => 0, x => x.id + 1)

// const addRecord = (table, record) =>
//     table.concat(record)
 
// const findAll = (table) =>
//     Task.of(table.values())

// const find = (table, query) =>
//     Task.of(table.filter((v, k) => query[k] === v))

// Array
const STORE = new Map()

const loadTable = tableName =>
    Task.of(STORE.get(tableName) || I.List())

const store = (tableName, table) =>
    Task.of(STORE.set(tableName, table))

const genId = table =>
    table.count()

const addRecord = (table, record) =>
    Task.of(table.push(record))
 
const getAll = (table) =>
    Task.of(table.toJS())

const queryAll = (table, query) =>
    Task.of(table.filter((v, k) => query[k] === v))


// db
const addId = (obj, table) =>
  Object.assign({id: genId(table)}, obj)

const save = (tableName, obj) =>
    loadTable(tableName)
    .chain(table => addRecord(table, addId(obj, table)))
    .chain(newTable => store(tableName, newTable))

const all = tableName =>
    loadTable(tableName)
    .chain(table => getAll(table))

const find = (tableName, query) =>
    loadTable(tableName)
    .chain(table => queryAll(table, query))

module.exports = {save, find, all, STORE}