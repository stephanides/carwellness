"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const port = 4040;
const app = App_1.default;
app.listen(port, (err) => {
    if (err)
        return console.log(err);
    else
        return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=carwellness-index.js.map