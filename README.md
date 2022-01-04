# ROCC DB Client

[![GitHub Release](https://img.shields.io/github/release/Sage-Bionetworks/rocc-db-client.svg?include_prereleases&color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/rocc-db-client/releases)
[![GitHub CI](https://img.shields.io/github/workflow/status/Sage-Bionetworks/rocc-db-client/CI.svg?color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/rocc-db-client)
[![GitHub License](https://img.shields.io/github/license/Sage-Bionetworks/rocc-db-client.svg?color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/rocc-db-client)

Command-line interface (CLI) for managing a ROCC DB instance.

## Usage

Install the dependencies.

    npm ci

Build the client.

    npm run build

If this happens, the next step (running the client), will not work.  If you
are interested in seeding the database, refer to [Using node to Seed the DB].

Run the client.

    node ./dist/src/index.js

For example:

```console
$ node ./dist/src/index.js help
Usage: rocc-db-client [global options] command

Client for managing a ROCC DB instance.

Options:
  -v, --version          output the current version
  -d, --debug            output extra debugging
  --uri <uri>            MongoDB uri (default: "mongodb://localhost:27017/rocc")
  --username <username>  MongoDB username (default: "roccmongo")
  --password <password>  MongoDB password (default: "roccmongo")
  -h, --help             display help for command

Commands:
  ping                   ping the MongoDB instance
  remove-collections     remove all collections
  seed <directory>       empty and seed the db with the JSON files from the directory specified
  help [command]         display help for command
```

### Using node to Seed the DB

If your local machine was unable to package the binary files with `npm run
package`, you can alternatively seed the database with:

    npm run seed:prod

Seeding is successful if you get something like the following:

```console
$ npm run seed:prod

> @sage-bionetworks/rocc-db-client@0.1.0 build .../rocc-db-client
> tsc -p .

2021-12-31 00:00:00 info: Collection challenge removed
2021-12-31 00:00:00 info: Collection account removed
2021-12-31 00:00:00 info: 🌱 Seeding users completed
2021-12-31 00:00:00 info: 🌱 Seeding organizations completed
2021-12-31 00:00:00 info: 🌱 Seeding orgMemberships completed
2021-12-31 00:00:00 info: 🌱 Seeding challengePlatforms completed
2021-12-31 00:00:01 info: 🌱 Seeding challenges completed
2021-12-31 00:00:01 info: 🌱 Seeding challengeReadmes completed
2021-12-31 00:00:02 info: 🌱 Seeding challengeOrganizers completed
2021-12-31 00:00:02 info: 🌱 Seeding challengeSponsors completed
```

If you receive a `ECONNREFUSED` error, ensure that a MongoDB instance is up and
running. Refer to the [ROCC API service] for more information.

## License

[Apache License 2.0]

<!-- Links -->

[Using node to Seed the DB]: #using-node-to-seed-the-db
[Apache License 2.0]: https://github.com/Sage-Bionetworks/rocc-db-client/blob/develop/LICENSE
[ROCC API service]: https://github.com/Sage-Bionetworks/rocc-service#running-with-docker
