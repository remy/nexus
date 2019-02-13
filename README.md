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
