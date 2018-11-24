const fs = require("fs");
const path = require("path");

const base = "./icons";

const sortIcons = async function (from) {
    const createFinalDir = function () {
        return new Promise(resolve => {
            if (!fs.existsSync("./newIcons")) {
                fs.mkdir("./newIcons", (err, data) => {
                    if (err) {
                        console.log("err1: ", err);
                    }
                })
            }
            resolve();
        })
    }
    await createFinalDir();

    return new Promise((resolve, reject) => {
        function readDir(base, level) {
            const files = fs.readdirSync(base);
            files.forEach(item => {
                let localBase = path.join(base, item);
                let state = fs.statSync(localBase);
                if (state.isDirectory()) {
                    readDir(localBase, level + 1);
                } else {
                    const firstLetter = item.toString()[0];
                    const letterDir = path.join("./newIcons", firstLetter);
                    const newBase = path.join(letterDir, item);
                    const createAlbhabetDir = function () {
                        return new Promise(resolve => {
                            if (!fs.existsSync(letterDir)) {
                                fs.mkdir(letterDir, (err, data) => {
                                    if (err) {
                                        console.log("err2: ", err);
                                    }
                                })
                            }
                            resolve();
                        })
                    }
                    const copyFile = async function () {
                        await createAlbhabetDir();
                        fs.copyFile(localBase, newBase, err => {
                            if (err) {
                                console.log("copyFile error: ", err);
                            }
                        });
                    }
                    copyFile();
                }
            })
        };
        readDir(base, 0);
    })
}
sortIcons(base).then(function () {
    console.log("Success");
});