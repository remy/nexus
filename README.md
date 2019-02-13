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

## Notes on allowed URLs

- All ipv6 urls are blocked
- Only whitelisted IP addresses are allowed - otherwise blocked
- Only whitelisted .cern.ch and .cern domains allowed
- All other hostnames allowed
