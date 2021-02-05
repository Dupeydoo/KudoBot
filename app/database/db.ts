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

export const ListFromDb = (searchObj) => { 
    return new Promise(function(resolve, reject) {
        Db.find(searchObj, function(err, docs) {
            if(err) {
                return reject(err);
            }
            resolve(docs);
        })
    })
};
