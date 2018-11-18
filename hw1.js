const fs = require('fs');
const path = require('path');

const base = './icons';

const readDir = (base, level) => {
    const files = fs.readdir(base, (err, data) => {
        if (err) return;
        data
            .forEach(item => {
                let localBase = path.join(base, item);
                fs.stat(localBase, (err, data) => {
                    if (err) return;
                    if (data.isDirectory()) {
                        readDir(localBase, level + 1);
                    } else {
                        const firstLetter = item.toString()[0];
                        const letterDir = path.join('./newIcons', firstLetter);
                        const newBase = path.join(letterDir, item);
                        fs.access('./newIcons', (err, data) => {
                            if (err) {
                                fs.mkdir('./newIcons', (err, data) => {
                                    if (err) {
                                        console.log('err1: ', err)
                                    };
                                })
                            }
                        })

                        fs.access(letterDir, (err, data) => {
                            if (err) {
                                fs.mkdir(letterDir, (err, data) => {
                                    if (err) {
                                        console.log('err2: ', err)
                                    };
                                });
                            }
                        });

                        fs.copyFile(localBase, newBase, err => {
                            if (err) {
                                console.log('copyFile error: ', err);
                                // return;
                            }
                        });
                    }
                });
            })
    });
}
readDir(base, 0);