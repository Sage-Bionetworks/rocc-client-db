import { connection } from 'mongoose';

export const dropCollections = async (): Promise<boolean[]> => {
  const db: any = connection.db;
  return db
    .listCollections()
    .toArray()
    .then((collections: any[]) =>
      collections.map((collection) => db.dropCollection(collection.name))
    )
    .then((promises: Promise<boolean>[]) => Promise.all(promises));
};

export const pingDatabase = async (): Promise<boolean> => {
  const db: any = connection.db;
  return db.admin().ping()
    .then((res: any) => !!res && res?.ok === 1);

}

// const seedDatabase = async (): Promise<any> => {
//   console.log(`Initializing db with seed: ${config.dbSeedName}`);

//   let promises = [];
//   let promise;

//   promise = UserModel.create({})  // seeds.users
//     .then(() => console.log('Finished populating users'))
//     .catch(err => console.log('Error populating users', err));
//   promises.push(promise);

//   // .then(() => (seeds.apps ? App.create(seeds.apps).then(() => console.log('finished populating apps')) : null))
//   // .catch(err => console.log('error populating apps', err));
//   // promises.push(promise);

//   return Promise.all(promises);
// }