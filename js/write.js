const fs = require("fs");
fs.writeFile(path.resolve(".") + '/param.txt', contxt, { flag: 'a' },  function(err) {
    if (err) {
        return console.error(err);
    }
});
