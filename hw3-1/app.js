var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var cursor = db.collection('students').find({});
    var count = 0

    cursor.each ( function(err, docs) {
        if(err) 
            console.log(err.message); 

        if (docs == null) {
            db.close();
            return;
        }

        else {
            count++;
        }

        var record = docs["scores"];
        console.log(record);
        var index, minimalScore = 101;

        for (var i = 0; i < record.length ; i++) {
            if (record[i]["type"] == "homework")  {               
                    if( record[i]["score"] < minimalScore) {
                        minimalScore = record[i]["score"];
                        index = i;
                    }
            }

        }
        console.log(record[index]);
        record.splice(index,1);

        db.collection('students').update( {'_id':docs['_id']}, {"scores" : record}, function(res, err) {
            if(err) 
                console.log(err.message);
        });
        //console.log(docs);            
    });

});
