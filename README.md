# README

(minimal for the moment)

Install [node](https://nodejs.com) (and npm comes with node)

```
npm install
npm start
```

To test:

```
curl -X POST http://localhost:3000/api -d'{"url":"http://example.com"}' -H'content-type:application/json'
```

By default the server runs on port 3000, unless specified with the `PORT` environment value.

## Client side build

The client is built using [parceljs](https://parceljs.org) and is generated into the `/app` directory. The build is expecting **two** important environment values:

- `HOST` - the origin (proto + hostname) of the URL hosting the client code
- `API` - the origin of the API, though in production, this should match the `HOST`

## Notes on allowed URLs

- All ipv6 urls are blocked
- Only whitelisted IP addresses are allowed - otherwise blocked
- Only whitelisted .cern.ch and .cern domains allowed
- All other hostnames allowed
