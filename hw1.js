const fs = require("fs");
const path = require("path");

const base = "./icons";

const readDir = (base, level) => {
    if (!fs.existsSync("./newIcons")) {
        fs.mkdir("./newIcons", (err, data) => {
            if (err) {
                console.log("err1: ", err);
            }
        })
    }
    const files = fs.readdir(base, (err, data) => {
        if (err) return;
        data.forEach(item => {
            let localBase = path.join(base, item);
            fs.stat(localBase, (err, data) => {
                if (err) {
                    console.log('error: ', err);
                };
                if (data.isDirectory()) {
                    readDir(localBase, level + 1);
                } else {
                    const firstLetter = item.toString()[0];
                    console.log('first letter: ', firstLetter);
                    const letterDir = path.join("./newIcons", firstLetter);
                    const newBase = path.join(letterDir, item);
                    if (!fs.existsSync(letterDir)) {
                        fs.mkdir(letterDir, (err, data) => {
                            if (err) {
                                console.log("err2: ", err);
                            }
                            fs.copyFile(localBase, newBase, err => {
                                if (err) {
                                    console.log("copyFile error: ", err);
                                }
                            });
                        });
                    } else {
                        fs.copyFile(localBase, newBase, err => {
                            if (err) {
                                console.log("copyFile error: ", err);
                            }
                        });
                    }
                }
            });
        });
    });
};
readDir(base, 0);