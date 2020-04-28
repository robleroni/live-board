# Live Kanban Board
Real-Time synchronizing and offlince capable Kanban Board in Vanilla JavaScript.

## Live
The application is accessible via the following link:  
[http://ip6-frontend-pitc-fringebenefit-eg.ocp.puzzle.ch/](http://ip6-frontend-pitc-fringebenefit-eg.ocp.puzzle.ch/)

## Local Development
The following steps are recommended for local usage.

### Install
The application does not require any external [NPM](https://www.npmjs.com/) packages to run. However, some development dependencies can be installed for convenience reasons.

```
npm install
```

### Server
The server of the kanban board is written in [Node.js](https://nodejs.org/) and uses no additional framework or library. It can be started as follows:

```
npm run server
``` 

### Client
The frontend must be served from a HTTP server and not directly from the file system. It uses  the ES module system in the browser, which means that the frontend code does not need to be bundled. The client can be started as follows: 

```
npm run client
```

### Folder Structure
The `packages/` directory is structured into the following folder.
```
|---core    // Modules used by both the front-end and the server 
│   |---...
|---example // Specific implementation of the kanban board
│   |---...
|---server  // Generalizations used on the server side
│   |---...
|---web     // Generalizations used on the front-end side
│   |---...
```

## Testing 
To test the application the testing framework [jest](https://jestjs.io/) is used. All tests can be found next to the source files in the `__tests__` folders. They are run using the npm script `npm run test:coverage` or `npm run test` to enable live reloads.

## Production
To run the application in a production mode, the server can be started with `node packages/example/src/server.js` and the client side files served with any HTTP server (e.g. [Nginx](https://www.nginx.com/)).