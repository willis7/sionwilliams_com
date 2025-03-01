# Sion Williams Blog

Welcome to Sion's (My) personal blog.

## Build Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/be397dbd-26ba-4759-960e-753055ecb9a1/deploy-status)](https://app.netlify.com/sites/xenodochial-chandrasekhar-c71fcc/deploys)

## Usage

### :exclamation: Prerequisites

* Git (for submodules)
* Hugo

### :construction_worker: Development

Create a new branch. Thanks to [this article](https://digitaldrummerj.me/blog-preview-with-netlify/) the project now has a preview mode that will run against a PR.

Pull the submodules

```bash
git submodule update --init
```

To update the submodules.

``` bash
git submodule update --remote --merge
```

Make sure my fork is up to date!

Add some content:

```bash
hugo new "posts/$(date +"%Y-%m-%d")-my-first-post.md"
```

Preview with live reloading:

```bash
hugo server -D -F
```

### :package: Static build

To build a static version of the website inside the `/public` folder, run:

```bash
hugo -D
```

## :raised_hands: Credits

* [https://github.com/rhazdon/hugo-theme-hello-friend-ng](https://github.com/rhazdon/hugo-theme-hello-friend-ng)
