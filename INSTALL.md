# Installation Instructions

## Server

### Install dependencies

`cd server`  
`npm install -d`

### Run

`node app`

To display all loggers, set environment variable `DEBUG=*`,
or simple run:

`DEBUG=* node app`

(Available also as `npm start`)

## Client

### Install dependencies

`cd ui`  
`npm install -d`  
`bower install -d`  

### Compile LESS styles

`grunt less`

(Make sure `grunt-cli` is globally installed)
