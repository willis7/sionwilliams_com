# Sion Williams Blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/be397dbd-26ba-4759-960e-753055ecb9a1/deploy-status)](https://app.netlify.com/sites/xenodochial-chandrasekhar-c71fcc/deploys)

My personal blog built with Victor Hugo and the Hugo Strata theme.

## Usage

### Prerequisites

You need to have the 
* [node](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm)
* [yarn](https://yarnpkg.com)

Next step, clone this repository and run:

```bash
make install
```

This will take some time and will install all packages necessary to run Victor Hugo and its tasks.

### Development

While developing your website, use:

```bash
make start
```

Then visit http://localhost:3000/ *- or a new browser windows popped-up already -* to preview your new website. BrowserSync will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

### Static build

To build a static version of the website inside the `/dist` folder, run:

```bash
make build
```

To get a preview of posts or articles not yet published, run:

```bash
make preview
```

See [package.json](package.json#L7) or the included gulp file for all tasks.

## Environment variables

To separate the development and production *- aka build -* stages, all gulp tasks run with a node environment variable named either `development` or `production`.

You can access the environment variable inside the theme files with `getenv "NODE_ENV"`. See the following example for a conditional statement:

    {{ if eq (getenv "NODE_ENV") "development" }}You're in development!{{ end }}

All tasks starting with *build* set the environment variable to `production` - the other will set it to `development`.

## Workflow

Create new post

    hugo new post/2019-01-01_my-first-post.md


## Enjoy!! 😸