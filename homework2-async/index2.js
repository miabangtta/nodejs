const fs = require("fs");
const path = require("path");

const base = "./icons";

const sortIcons = async function (from) {
    const createFinalDir = function () {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync("./newIcons")) {
                try {
                    fs.mkdirSync("./newIcons")
                } catch (error) {
                    reject(error);
                }
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
                        return new Promise((resolve, reject) => {
                            if (!fs.existsSync(letterDir)) {
                                try {
                                    fs.mkdirSync(letterDir);
                                } catch (error) {
                                    reject(error);
                                }
                            }
                            resolve();
                        })
                    }
                    const copyFile = async function () {
                        await createAlbhabetDir();
                        try {
                            fs.copyFileSync(localBase, newBase)
                        } catch (error) {
                            console.log("copyFile error: ", error);
                        }
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