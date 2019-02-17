# README

(minimal for the moment)

Install [node](https://nodejs.com) (and npm comes with node) and [yarn](https://yarnpkg.com/en/) to install.

```
yarn install
npm run build
npm start
```

To test:

```
curl -X POST http://localhost:3000/api -d'{"url":"http://example.com"}' -H'content-type:application/json'
```

By default the server runs on port 3000, unless specified with the `PORT` environment value.

## Development

Development is split over three tiers:

1. Server side development (for API requests)
2. Client side application (the WorldWideWeb browser)
3. Content (using 11ty)

### Server side build

Run via `npm run start` and connects to port 3000 by default.

- `PORT` - configure the port for the server

#### Notes on allowed URLs

- All ipv6 urls are blocked
- Only whitelisted IP addresses are allowed - otherwise blocked
- Only whitelisted .cern.ch and .cern domains allowed
- All other hostnames allowed

### Client side build

The client is built using [parceljs](https://parceljs.org) and is generated into the `/app` directory. The build is expecting at least **one** important environment values:

- `HOST` - the origin (proto + hostname) of the URL hosting the client code - this is important as it is used during the build to point to the correct origin during API requests

Optionally `API` can be included if developing against a different local endpoint (typically `localhost:3000`).

Run using `npm run client`

## Client side supplemental content

Static supplemental site for WorldWideWeb rebuild project. Screen shots, process data, etc… lives in `./content`.

Site built with [Eleventy](https://11ty.io) static site framework.

To run a local 11ty server, run `npm run content` and follow directions in the console.
