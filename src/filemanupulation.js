const { dialog } = require('electron');
const fs = require('fs');

function openAndWrite() {
    dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            const selectedFolderPath = result.filePaths[0];
            const file = fs.createWriteStream(selectedFolderPath + '/myfile.txt');
            file.write('This is my data');
            file.close();
            console.log("Working");
        } else {
            console.log('No folder selected.');
        }
    }).catch(err => {
        console.log(err);
    });
}

module.exports = openAndWrite;
