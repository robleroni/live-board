import http from 'http';

const options = {
  hostname: 'localhost',
  port    : 4321,
  method  : 'POST',
}

const send = data => {
  http.request(options).end(JSON.stringify(data));
}

export default send;