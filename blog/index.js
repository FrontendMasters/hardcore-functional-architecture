const { save, all } = require("../lib/db");
const { Task } = require("../lib/types");
const { last } = require("rambda");
/* original import */

const AuthorTable = "Authors";
const PostTable = "Post";
const Author = (name) => ({ name });
const Post = (title, body) => ({ title, body });

/* original code */

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getInput = (q) =>
  Task((rej, res) => readline.question(q, (i) => res(i.trim())));

const menu = () =>
  getInput(
    "Where do you want to go today?(createAuthor, write, latest, all)"
  ).map((route) => router[route]);

const formatPost = (post) => `${post.title}: \n${post.body}`;

const print = (s) => Task((rej, res) => res(console.log(s)));

const latest = () =>
  all(PostTable)
    .map((posts) => last(posts))
    .map(formatPost)
    .chain(print)
    .map(() => menu);

const write = () =>
  getInput("Title: ")
    .chain((title) => getInput("Body: ").map((body) => Post(title, body)))
    .chain((post) => save(PostTable, post))
    .map(() => latest);

const createAuthor = () =>
  getInput("Name?")
    .map((name) => Author(name))
    .chain((author) => save(AuthorTable, author))
    .map(() => menu);

const start = () =>
  all(AuthorTable).map((authors) => (authors.length ? menu : createAuthor));

const router = { menu, createAuthor, write, all, latest };

const runApp = (f) => f().fork(console.error, runApp);

runApp(start);

/* ======================= */

// const Console = taggedSum("Console", { Question: ["q"], Print: ["s"] });
// const Db = taggedSum("Db", {
//   Save: ["table", "record"],
//   All: ["table", "query"]
// });

// const AuthorTable = "Authors";
// const PostTable = "Post";

// const Author = name => ({ name });
// const Post = (title, body) => ({ title, body });

// // Thanks flavio!
// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const writeOutput = s => Task((_rej, res) => res(console.log(s)));
// const getInput = q =>
//   Task((rej, res) => readline.question(q, i => res(i.trim())));

// const formatPost = post => `${post.title}:\n${post.body}`;

// const print = s => liftF(Console.Print(s));
// const question = s => liftF(Console.Question(s));

// const dbAll = (table, query) => liftF(Db.All(table, query));
// const dbSave = (table, record) => liftF(Db.Save(table, record));

// const questions = {
//   whereTo:
//     "Where do you want to go today? (createAuthor, write, latest, all, end)",
//   title: "Title? ",
//   body: "Body? ",
//   name: "Name? "
// };

// const menu = () => question(questions.whereTo).map(route => router[route]());

// const latest = () =>
//   dbAll(PostTable)
//     .map(posts => last(posts))
//     .map(formatPost)
//     .chain(print)
//     .map(() => menu());

// const write = () =>
//   question(questions.title)
//     .chain(title => question(questions.body).map(body => Post(title, body)))
//     .chain(post => dbSave(PostTable, post))
//     .map(() => latest());

// const createAuthor = () =>
//   question(questions.name)
//     .map(name => Author(name))
//     .chain(author => dbSave(AuthorTable, author))
//     .map(() => menu());

// const start = () =>
//   dbAll(AuthorTable).map(authors => (authors.length ? menu() : createAuthor()));

// const end = () => Pure(Console.Print("fin"));

// const router = { menu, createAuthor, write, latest, end };

// const answers = {
//   [questions.whereTo]: "end",
//   [questions.title]: "A title",
//   [questions.body]: "A body",
//   [questions.name]: "Some name"
// };

// const dbToTask = x => x.cata({ Save: save, All: all });

// const consoleToTask = x => x.cata({ Question: getInput, Print: writeOutput });

// const consoleToId = x =>
//   x.cata({
//     Question: q => Id.of(answers[q]),
//     Print: s => Id.of(`writing the string ${s}`)
//   });

// const dbToId = x =>
//   x.cata({
//     Save: (table, r) => Id.of(`saving to ${r} ${table}`),
//     All: (table, q) => Id.of([])
//   });

// const interpretTest = free =>
//   Task.of(
//     free.foldMap(x => (x.table ? dbToId(x) : consoleToId(x)), Id.of).extract()
//   );

// const interpretReal = free =>
//   free.foldMap(x => (x.table ? dbToTask(x) : consoleToTask(x)), Task.of);

// const runApp = (free, interpreter, log = []) =>
//   free.cata({
//     Pure: x => log.concat([x]),
//     Impure: x =>
//       interpreter(free).fork(console.error, g =>
//         runApp(g, interpreter, log.concat([x]))
//       )
//   });

// const result = runApp(start(), interpretTest);
// console.log(result);
