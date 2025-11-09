const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

// client.connect()
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB', err);

//   })
//   .finally(() => {
//     client.close();
//   });
async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('university');
    //your code here to insert a document
    const students = db.collection('students');
    const result = await students.insertOne({ name: 'Geedi', age: 25, department: 'Networking', year: 3 });
    console.log('Inserted student with _id:', result.insertedId);
    

    //update a document
    const updateResult = await students.updateOne({ name: 'osman' }, { $set: { age: 26 } });
    console.log('Updated documents count:', updateResult.modifiedCount);

    //update many documents
    const updateManyResult = await students.updateMany({ department: 'Networking' }, { $set: { year: 1 } });
    console.log('Updated many documents count:', updateManyResult.modifiedCount);

    //update status many documents
    const updateStatusResult = await students.updateMany({ year: 1 }, { $set: { status: 'active' } });
    console.log('Updated status for many documents count:', updateStatusResult.modifiedCount);

    //update status one document no active
    const updateStatusOneResult = await students.updateOne({ name: 'Fatima' }, { $set: { status: 'inactive' } });
    console.log('Updated status for one document count:', updateStatusOneResult.modifiedCount);


    //delete one document
    const deleteResult = await students.deleteOne({ name: 'Hassan' });
    console.log('Deleted documents count:', deleteResult.deletedCount);

    //delete many documents name starts with G
    const deleteManyResult = await students.deleteMany({ name: { $regex: '^G' } });
    console.log('Deleted many documents count:', deleteManyResult.deletedCount);

    //delete many documents year 1
    const deleteYearResult = await students.deleteMany({ studyYear: 4 });
    console.log('Deleted many documents with year 1 count:', deleteYearResult.deletedCount);



  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  } finally {
    await client.close();
  }
}

run();



