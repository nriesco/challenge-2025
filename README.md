# Challenge 2025

## Setup

1. Install CDK
2. Setup you account
3. `cdk deploy`
4. Use the endopoints to get / update the data

## Remove / destroy / delete

1. `cdk destroy`

## Endpoints

### GET

Get the resulting html. If no data is set a default message will be provided.

```js
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: '{{base_url}}',
  headers: { }
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();
```

### POST

Update the string

```js
const axios = require('axios');
let data = 'some plain text';

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: '{{base_url}}',
  headers: { 
    'Content-Type': 'text/plain'
  },
  data : data
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();
```

### GET / update data

Update the data via GET, using the params (`string`)

```js
const axios = require('axios');
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: '{{base_url}}?string=some text in the url',
  headers: { },
  data : data
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();
```
