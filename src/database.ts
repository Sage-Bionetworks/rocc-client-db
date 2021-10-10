import { connect, connection, Model, Mongoose } from 'mongoose';
import { config } from './config';
import { glob } from 'glob';
import * as path from 'path';
import { promises } from 'fs';
import { UserModel, OrganizationModel, OrgMembershipModel } from './models';
import { ChallengePlatformModel } from './models/challenge-platform';

interface SeedFiles {
  [key: string]: string;
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  const mongooseConnection = connect(config.mongo.uri, config.mongo.options);
  connection.on('connected', function () {
    console.log(`Mongoose connected to ${config.mongo.uri}`);
  });
  connection.on('error', (err: any) => {
    console.error(`Mongoose connection error: ${err}`);
  });
  connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });
  return mongooseConnection;
};

export const removeCollections = async (): Promise<boolean> => {
  const db: any = connection.db;
  const collections = await db.listCollections().toArray();
  const promises: Promise<any>[] = collections.map((collection: any) => {
    return db
      .dropCollection(collection.name)
      .then(() => console.log(`Collection ${collection.name} removed`))
      .catch((err: any) => console.error('Unable to remove collection', err));
  });
  await Promise.all(promises);
  return true;
};

export const pingDatabase = async (): Promise<boolean> => {
  const res = await connection.db.admin().ping();
  return !!res && res?.ok === 1;
};

export const seedDatabase = async (directory: string): Promise<boolean> => {
  await removeCollections();
  const seedFiles = await listSeedFiles(directory);
  if (seedFiles['users']) {
    await seedCollection(seedFiles['users'], 'users', UserModel);
  }
  if (seedFiles['organizations']) {
    await seedCollection(
      seedFiles['organizations'],
      'organizations',
      OrganizationModel
    );
  }
  if (seedFiles['org-memberships']) {
    await seedCollection(
      seedFiles['org-memberships'],
      'orgMemberships',
      OrgMembershipModel
    );
  }
  if (seedFiles['challenge-platforms']) {
    await seedCollection(
      seedFiles['challenge-platforms'],
      'challengePlatforms',
      ChallengePlatformModel
    );
  }
  return Promise.resolve(true);
};

const readSeedFile = async (seedFile: string): Promise<any> => {
  return promises
    .readFile(seedFile, 'utf8')
    .then((data) => JSON.parse(data))
    .catch((err: any) => console.error('Unable to read seed file', err));
};

const seedCollection = async <T>(
  seedFile: string,
  name: string,
  model: Model<T>
): Promise<any> => {
  return readSeedFile(seedFile)
    .then((data) => model.create(data[name]))
    .then(() => console.log(`🌱 ${name} seeding completed`))
    .catch((err: any) => console.error(`Unable to seed ${name}`, err));
};

const listSeedFiles = async (directory: string): Promise<SeedFiles> => {
  return new Promise((resolve, reject) => {
    glob(directory + '/*.json', { ignore: 'nodir' }, function (err, files) {
      if (err) {
        reject(err);
      } else {
        // TODO consider throwing an error if an unexpected json file is found
        // in the directory specified, e.g. when a key is not in the interface
        // SeedFiles
        let seedFiles: SeedFiles = {};
        files.forEach((file) => {
          let key = path.basename(file, '.json');
          seedFiles[key] = file;
        });
        resolve(seedFiles);
      }
    });
  });
};
