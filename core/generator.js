/* External modules. */
const fs = require('fs');
const fsExtra = require('fs-extra');

/* Internal dependencies. */
const config = require('./settings.json');

/* Initial data. */
const configData = {
    version: new Date().getTime(),
    versionKey: config.versionKey
};
const targetDir = "../" + config.buildDirName + "/";
const newConfigPath = targetDir + config.configName;
const newMainFilePath = targetDir + config.mainFilePath;
let data = fs.readFileSync(config.mainFilePath, {encoding: 'utf8'});
let dataUpdated = data.replace(/_CFG_PATH_/g, newConfigPath);

writeJSON(newConfigPath, JSON.stringify(configData));
fsExtra.outputFileSync(newMainFilePath, dataUpdated, function(err){
    if (err) return console.log(err);
    /*config.copyTo.forEach(function(dirPath){
        copyDir(targetDir, dirPath);
    });*/
});

/* Functionality */
function writeJSON(file, data){
    fsExtra.outputJson(file, data, function (err) {
        if (err) return console.log(err);
    });
}

function copyFile(fileSrc, targetFile){
    fsExtra.copy(fileSrc, targetFile, function(err){
        if (err) return console.log(err);
    });
}

function copyDir(srcDir, targetDir) {
    if (!fs.existsSync(srcDir)) {
        console.log('Directory "'+ srcDir +'" does not exist.');
        return false;
    }
    fsExtra.ensureDir(targetDir, function (err) {
        if (err) return console.log(err);
        const targetDirUpdated = targetDir + settings.buildDirName;
        fsExtra.copy(srcDir, targetDirUpdated, function (err) {
            if (err) return console.log(err);
            console.log("*".repeat(25));
            console.log('Successfully copied to: ', targetDir);
            console.log("*".repeat(25));
        })
    });
}
