const { Fn, FnT, TaskT, Task, Either, EitherT, Id, IdT } = require("../lib/types");

const EitherId = EitherT(Id)
const App = FnT(EitherId)

App
.of(2)
.chain(two => App.lift(EitherId.of(two + two)))
.chain(four => App.lift(EitherId.lift(Id.of(four))))
.map(four => four + 1)
.run()
.fold(console.error, fx => console.log(fx.extract()))