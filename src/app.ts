import { connect, connection, Mongoose } from 'mongoose';
import { Command } from 'commander';
import { dropCollections, pingDatabase } from './database';
import { config } from './config';
import * as Pkg from '../package.json';

export class App {
  private program: any;

  constructor() {
    this.program = new Command();

    this.program
      .name('rocc-client')
      .usage('[global options] command')
      .version(Pkg.version, '-v, --version', 'output the current version')
      .description(Pkg.description);

    this.program
      .command('ping')
      .description('ping the MongoDB instance')
      .action(() => this.ping());

    this.program
      .command('seed')
      .description(
        'seed the db with the JSON files from the directory specified'
      )
      .argument('<directory>')
      .action((directory: string) => this.seed(directory));

    this.program
      .option('--uri <uri>', 'MongoDB uri', 'mongodb://localhost:27017/rocc')
      .option('--username <username>', 'MongoDB username', 'roccmongo')
      .option('--password <password>', 'MongoDB password', 'roccmongo');
  }

  private async seed(directory: string): Promise<void> {
    return this.connect()
      .then(dropCollections)
      .then((success) => {
        process.exit(success ? 0 : -1);
      })
      .catch((err: any) => {
        console.log(err);
        process.exit(-1);
      });
  }

  private async ping(): Promise<void> {
    return this.connect()
      .then(pingDatabase)
      .then((pong) => {
        console.log(pong ? 'pong' : 'No pong received');
        process.exit(pong ? 0 : -1);
      })
      .catch((err: any) => {
        console.log(err);
        process.exit(-1);
      });
  }

  private async connect(): Promise<Mongoose> {
    const options = this.program.opts();
    const connectOptions = {
      user: options.username,
      pass: options.password,
    };
    const mongooseConnection = connect(options.uri, connectOptions);
    connection.on('error', (err: any) => {
      console.error(`MongoDB connection error: ${err}`);
      process.exit(-1);
    });
    return mongooseConnection;
  }

  public async run(): Promise<void> {
    await this.program.parseAsync(process.argv);
  }
}
