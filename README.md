# react-admin-firebase

<!-- [START badges] -->
[![NPM Version](https://img.shields.io/npm/v/react-admin-firebase.svg)](https://www.npmjs.com/package/react-admin-firebase) 
[![License](https://img.shields.io/npm/l/react-admin-firebase.svg)](https://github.com/benwinding/react-admin-firebase/blob/master/LICENSE) 
[![Downloads/week](https://img.shields.io/npm/dm/react-admin-firebase.svg)](https://www.npmjs.com/package/react-admin-firebase) 
[![Github Issues](https://img.shields.io/github/issues/benwinding/react-admin-firebase.svg)](https://github.com/benwinding/react-admin-firebase)
<!-- [END badges] -->

A firebase data provider for the [React-Admin](https://github.com/marmelab/react-admin) framework. It maps collections from the Firebase database (Firestore) to your react-admin application. It's an [npm package](https://www.npmjs.com/package/react-admin-firebase)!

## Features
- [x] Firebase Authenticated Login (email, password)
- [x] Dynamic caching of resources
- [x] All methods implemented; `(GET, POST, GET_LIST ect...)`
- [x] Filtering, sorting etc...
- [x] Realtime updates, using ra-realtime
    - Implicitly watches all GET_LIST routes using observables with the firebase sdk
    - Optional watch collection array or dontwatch collection array

## Get Started
`yarn add react-admin-firebase` 

or

`npm install --save react-admin-firebase`

## Demo Basic
A simple example based on the [React Admin Tutorial](https://marmelab.com/react-admin/Tutorial.html).

### Prerequisits
- Create a `posts` collection in the firebase firestore database
- Get config credentials using the dashboard

### Code

``` javascript
import * as React from 'react';
import { Admin, Resource } from 'react-admin';

import { PostList, PostShow, PostCreate, PostEdit } from "./posts";
import { FirebaseDataProvider } from 'react-admin-firebase';

const config = {
  apiKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  authDomain: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  databaseURL: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  projectId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  storageBucket: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  messagingSenderId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
};

const dataProvider = FirebaseDataProvider(config);

class App extends React.Component {
  public render() {
    return (
      <Admin 
        dataProvider={dataProvider} 
      >
        <Resource name="posts" list={PostList} show={PostShow} create={PostCreate} edit={PostEdit}/>
      </Admin>
    );
  }
}

export default App;
```

## (Optional) Realtime Updates!
Get realtime updates from the firebase server instantly on your tables, with minimal overheads, using rxjs observables!

``` javascript
...
import {
  FirebaseRealTimeSaga,
  FirebaseDataProvider
} from 'react-admin-firebase';
...
const dataProvider = FirebaseDataProvider(config);
const firebaseRealtime = FirebaseRealTimeSaga(dataProvider);

class App extends React.Component {
  public render() {
    return (
      <Admin 
        dataProvider={dataProvider} 
        customSagas={[firebaseRealtime]}
      >
        <Resource name="posts" list={PostList} show={PostShow} create={PostCreate} edit={PostEdit}/>
      </Admin>
    );
  }
}

export default App;
```

## (Optional) Realtime Options
Trigger realtime on only some routes using the options object.

``` javascript
...
const dataProvider = FirebaseDataProvider(config);
const options = {
  watch: ['posts', 'comments'],
  dontwatch: ['users']
}
const firebaseRealtime = FirebaseRealTimeSaga(dataProvider, options);
...
```
[Full Demo Project](https://github.com/benwinding/demo-react-admin-firebase)
