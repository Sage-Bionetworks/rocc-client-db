# ROCC DB Client

[![GitHub Release](https://img.shields.io/github/release/Sage-Bionetworks/rocc-client-db.svg?include_prereleases&color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/rocc-client-db/releases)
[![GitHub CI](https://img.shields.io/github/workflow/status/Sage-Bionetworks/rocc-client-db/CI.svg?color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/rocc-client-db)
[![GitHub License](https://img.shields.io/github/license/Sage-Bionetworks/rocc-client-db.svg?color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/rocc-client-db)

Command-line interface (CLI) for managing a ROCC DB instance.

## Usage

Install the dependencies:

    npm ci

Build and package the client:

    npm run build
    npm run package

Run the client:

    ./dist/rocc-client-db help
    Usage: rocc-client [global options] command

    Client for managing a ROCC DB instance.

    Options:
      -v, --version          output the current version
      --uri <uri>            MongoDB uri (default: "mongodb://localhost:27017/rocc")
      --username <username>  MongoDB username (default: "roccmongo")
      --password <password>  MongoDB password (default: "roccmongo")
      -h, --help             display help for command

    Commands:
      ping                   ping the MongoDB instance
      seed <directory>       seed the db with the JSON files from the directory specified
      help [command]         display help for command

## License

[Apache License 2.0]

<!-- Links -->

[Apache License 2.0]: https://github.com/Sage-Bionetworks/rocc-client-db/blob/develop/LICENSE
