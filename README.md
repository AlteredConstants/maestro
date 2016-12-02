# Maestro

Early prototype of what may someday be a fencing bout committee suite
(like [Fencing Time](https://www.fencingtime.com/) only freer).

## Development Environment

You'll need the following for your development environment:

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (version 7.1.0 or newer recommended)

Clone this repo:

```
git clone https://github.com/AlteredConstants/maestro.git
```

Then, from the root of the repo:

```
npm install
```

You should now be able to build and run the client and server:

```
npm run serve
```

> File watching, [HMR](https://webpack.github.io/docs/hot-module-replacement.html),
and server debugging on port 5858 (e.g. with [node-inspector](https://github.com/node-inspector/node-inspector))
are all enabled.

Alternatively, you can run the client and server separately:

```
npm run server serve
# and in another terminal:
npm run client serve
```

And finally, open the app in your default browser:

```
npm run client open
```

Enjoy!
