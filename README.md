# conFusion_frontend
A front-end application create using Angular 6 to showcase basic functionality of the framework


#### Installing dependency

To install all the necessary dependency for the application, go to the installation folder and execute:

```
npm install
```

#### Running the application

To run application, go to the installation folder and execute:

```
ng serve
```

#### To mimic the server interaction, 

In order to minic server, a static demo server is included in the project. To access it, install json-server using

```
npm install -g json-server
```

once json-server is install, traverse to the json-server folder and execute

```
json-server --watch db.json -d 2000
```

This command use db.json as a static db file to get and return appropriate data.

**the `-d 2000` is an optional parameter, which introduces latency for 2 sec to mimic an online web-server**
