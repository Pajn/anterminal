# React Typescript boilerplate

## Commands
- `npm start` - Starts a dev server on <http://localhost:8080> with hot loading
- `npm run build` - Does a production build in dist
- `npm run lint` - Runs the linter to check for style issues
- `npm run typescript` - Runs typescript to check for typing issues
- `npm run build_dev` - Does a development build but outputs to dist

## Included packages
- React 0.14
- React Router 1.0

## Build steps
### Development
1. Compiles with Typescript to ES6
1. Compiles with Babel to ES5
1. Adds react-hot for hot loading of components

### Production
1. Compiles with Typescript to ES6
1. Compiles with Babel to ES5
1. Minifies with UglifyJS