# Seed ROCC database during development

## Usage

Install the dependencies

```console
npm ci
```

Export the configuration to environment variables

```console
export $(grep -v '^#' .env | xargs)
```

Build and start the program (development mode)

```console
npm run start
```

Press `Ctrl+C` to exit the program.
