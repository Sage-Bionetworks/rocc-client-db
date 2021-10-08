import { Command } from 'commander';
import { connectToDatabase, dropCollections, pingDatabase, seedDatabase } from './database';
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
      .action(() => this.ping())
      .hook('preAction', () => this.setConfig(this.program.opts()));

    this.program
      .command('seed')
      .description(
        'empty and seed the db with the JSON files from the directory specified'
      )
      .argument('<directory>')
      .action((directory: string) => this.seed(directory))
      .hook('preAction', () => this.setConfig(this.program.opts()));

    this.program
      .option('--uri <uri>', 'MongoDB uri', 'mongodb://localhost:27017/rocc')
      .option('--username <username>', 'MongoDB username', 'roccmongo')
      .option('--password <password>', 'MongoDB password', 'roccmongo');
  }

  private async ping(): Promise<void> {
    return connectToDatabase()
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

  private async seed(directory: string): Promise<void> {
    return connectToDatabase()
      .then(() => seedDatabase(directory))
      .then(() => process.exit(0))
      .catch((err: any) => {
        console.log(err);
        process.exit(-1);
      });
  }

  private setConfig(options: any): void {
    config.mongo.uri = options.uri;
    config.mongo.options.user = options.username;
    config.mongo.options.pass = options.password;
  }

  public async run(): Promise<void> {
    await this.program.parseAsync(process.argv);
  }
}
