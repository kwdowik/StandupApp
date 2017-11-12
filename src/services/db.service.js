var mongodb = require('mongodb').MongoClient;

exports.create = function (url, collectionName, item) {
    return new Promise(
        function (resolve, reject) {
            mongodb.connect(url, function (err, db) {
                if (err) throw err;
                db.collection(collectionName)
                    .insert(item, function (err, result) {
                        if(err) reject(err);
                        resolve(result);
                        db.close();
                    })
            })
        }
    );
};

exports.read = function (url, collectionName, query) {
    return new Promise(
        function (resolve, reject) {
            mongodb.connect(url, function (err, db) {
               if(err) throw err;
               if(query === undefined) {
                   db.collection(collectionName).find({}).toArray((err, results)  => {
                       if(err) reject(err);
                       resolve(results);
                   });
               } else {
                   db.collection(collectionName).find(query).toArray((err, results) => {
                       if(err) reject(err);
                       resolve(results);
                   })
               }
               db.close();
            });
        }
    )
};

exports.count = function (url, collectionName, query) {
  return new Promise(
      function (resolve, reject) {
          mongodb.connect(url, function (err, db) {
             if(err) throw err;
             db.collection(collectionName).count(query, (err, count) => {
                 if(err) reject(err);
                 resolve(count);
             });
             db.close();
          });
      }
  )
};

exports.readAndModifyBehaviour = function (url, collectionName, sortQuery, filterQuery, skipCount, limitCount) {
    return new Promise(
        function (resolve, reject) {
            mongodb.connect(url, function (err, db) {
                if(err) throw err;
                   db.collection(collectionName)
                       .find(filterQuery)
                       .sort(sortQuery)
                       .skip(skipCount)
                       .limit(limitCount)
                       .toArray((err, results) => {
                           if(err) reject(err);
                           resolve(results);
                   });
                db.close();
            });
        }
    )
};

exports.update = function (url, collectionName, item, searchQuery, updateQuery) {
  return new Promise(
      function (resolve, reject) {
          mongodb.connect(url, function (err, db) {
             if(err) throw err;
             db.collection(collectionName)
                 .update(searchQuery, updateQuery,
                     (err, result) => {
                         if(err) reject(err);
                         resolve(`${result.result.nModified} document(s) updated`);
                 });
             db.close();
          });
      }
  )
};

exports.delete = function (url, collectionName, query) {
    return new Promise(
      function (resolve, reject) {
          mongodb.connect(url, function (err, db) {
              if(err) throw err;
              db.collection(collectionName)
                  .remove(query, function (err, result) {
                      if(err) reject(err);
                      resolve(`${result.result.n} document(s) deleted`);
                      db.close();
                  })
          })
      }
  )
};