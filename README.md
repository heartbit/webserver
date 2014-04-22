https://www.codeship.io/projects/52bbf060-ac81-0131-039a-424b8261493a/status

# Insightful trader - webserver

> Webserver, webSockets, proxy

## Installation

If you haven't already done so, install [nodejs][], [gruntjs][] and [bowerjs][].

```
npm install -g grunt
npm install -g grunt-cli
npm install -g bower
```

### Server dependencies

```
npm install
```

### Client dependencies

```
bower install
```

## Usage

### Developement environment (Distant API)

```
grunt local
```

### Offline mode (mocks)

```
grunt offline
```

### Build

```
grunt build
```
> See ./frontend/build

### Deploy on dev

```
grunt dev
```

### Compil documentation

```
grunt documentation
```
> See ./frontend/doc

### Analyze source code using [platojs][]

```
grunt analyze
```

> See ./frontend/reports

_(This documentation is a WIP)_

[d3js]: http://d3js.org
[nodejs]: http://nodejs.org
[gruntjs]: http://gruntjs.com
[bowerjs]: https://github.com/bower/bower
[platojs]: https://github.com/es-analysis/plato


