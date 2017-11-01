var mongodb = require('mongodb').MongoClient;

exports.getAll = function (url, collectionName) {
    return new Promise(
        function (resolve, reject) {
            mongodb.connect(url, function (err, db) {
                if (err) throw err;
                db.collection(collectionName).find({}).toArray(function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                    db.close();
                });
            });
        }
    );
};

exports.get = function (url, collectionName, item) {
    return new Promise(
        function (resolve, reject) {
            mongodb.connect(url, function (err, db) {
               if(err) throw err;
               db.collection(collectionName).findOne({item: item.toString()},
                   function (err, results) {
                    if(err) reject(err);
                    resolve(results);
                    db.close();
                })
            });
        }
    )
};

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
