const fs = require('fs');
const path = require('path');

const modifyData = (array, filename) => {

    let contaString = JSON.stringify(array);

    let contasPath = path.join('src', 'Data', filename);

    fs.writeFileSync(contasPath, 'module.exports = ');
    fs.appendFileSync(contasPath, contaString);
}
module.exports = modifyData;