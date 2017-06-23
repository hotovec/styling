# Simple SCSS & JS & HTML pipeline

- this is simple helper for quick html & styling

### Features:
-   Sass compiling
-   Foundation 6 base
-   Webpack TS compiling
-   Bundling third party JS & CSS
-   Local preview server (Express)
-   Twig template engine
-   Nodemon & Browser Sync
-   Only NPM dependency management


#### Instalation:
```
npm install
```

#### Run:
```
// compile, watch 
> gulp server
```

```
// prepare assets (CSS, JS) for dist
> gulp dist
```

```
// preview only
> gulp
```


### Configs for bundling & TS:
 
##### Library: (lib.js & lib.css)

```
/src/build/library.config.js 
```

##### Webpack & TS

```
/src/build/webpack.config.js
```

#### Notes:

- nothing ready for PROD version (gulp, server)

#### Known issues:

- errors not handled with extra care
- need restart to rebundle third party JS and CSS files
