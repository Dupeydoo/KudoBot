const Datastore = require('nedb');

export const Db = new Datastore({filename: './database/kudodb', autoload: true});

export const InsertIntoDb = (doc) => { 
    return new Promise(function(resolve, reject) {
        Db.insert(doc, function(err, newDoc) {
            if(err) {
                return reject(err);
            }
            resolve(newDoc);
        })
    })
};

export const ListFromDb = (searchObj, colSort, pageSize, pageNum) => { 
    return new Promise(function(resolve, reject) {
        Db.find(searchObj).sort({ colSort: 1 })
            .skip(pageNum * pageSize).limit(pageSize)
            .exec(function(err, docs) {
                if(err) {
                    return reject(err);
                }
                resolve(docs);
            });
    });
};

export const CountKudosInDb = (searchObj) => {
    return new Promise(function(resolve, reject) {
        Db.count(searchObj, function(err, count) {
            if(err) {
                return reject(err);
            }
            resolve(count);
        });
    });
}
