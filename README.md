# CUMT Appoint Miniapp
[![Taro version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2FOpenCUMT%2Fappoint-miniapp%2Fraw%2Fmain%2Fpackage.json&query=%24.dependencies.%40tarojs%2Ftaro&style=flat-square&label=Taro)](https://taro.zone/)
[![Solid.js version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2FOpenCUMT%2Fappoint-miniapp%2Fraw%2Fmain%2Fpackage.json&query=%24.dependencies.solid-js&style=flat-square&label=Solid.js)](https://solidjs.com/)
[![Tailwind version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2FOpenCUMT%2Fappoint-miniapp%2Fraw%2Fmain%2Fpackage.json&query=%24.devDependencies.tailwindcss&style=flat-square&label=Tailwind)](https://tailwindcss.com/)

[![Version](https://img.shields.io/github/package-json/v/OpenCUMT/appoint-miniapp?style=flat-square)](?tab=readme-ov-file)
[![WeChat](https://img.shields.io/badge/WeChat%20App-07C160?style=flat-square&logo=wechat&logoColor=white)](?tab=readme-ov-file)
[![Tencent QQ](https://img.shields.io/badge/QQ%20MiniApp-12B7F5?style=flat-square&logo=qq&logoColor=white)](?tab=readme-ov-file)

## Structure

This project uses [Taro](https://taro.zone/) as the main framework for building the miniapp, with [Solid.js](https://solidjs.com/) for the UI components and [Tailwind CSS](https://tailwindcss.com/) for styling.

Thanks to [weapp-tailwindcss](https://tw.icebreaker.top/) for supporting easily-configurable Tailwind CSS styles in such frameworks.

## Getting Started

Clone this repository and install the dependencies:

```bash
pnpm install
```

We prefer using [pnpm](https://pnpm.js.org/) as the package manager for this project to minimize disk space usage and speed up installations.

To build the project to specific platforms, you can use the following commands:

```bash
pnpm build:weapp # for WeChat mini program for example
```

## Contributing

> [!NOTE]
> The project of this repository is a universal program, not for any specific organization. Please do not upload some specific organization-related code or assets, especially for our own deployment in campus. These assets can be maintained on the server which holds the back-end and retrieved by the front-end. Mostly, you can use mock data or generic assets for development and testing purposes.

Before committing, please format the code first via `pnpm format`. If you find formatting changes that are not related to this change, you can commit your code first and then create a commit which only does formatting.

Please follow the commit message conventions when contributing to this project. You can reference to [Gitmoji](https://gitmoji.dev/) for a list of emojis and their meanings. Note that use `:sparkles:` instead of the emoji character itself.

## License

Copyright (c) CUMT Open Source Association. All rights reserved.

Licensed under the [LGPL 3.0](LICENSE).
