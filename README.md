# Typescript Express Starter

![GitHub package.json version](https://img.shields.io/github/package-json/v/theninza/typescript-expresss-boilerplate?style=for-the-badge)&nbsp;
![GitHub Repo stars](https://img.shields.io/github/stars/theninza/typescript-expresss-boilerplate?logo=github&style=for-the-badge)

This is a simple lightweight starter for a typescript express app. The code style feels a little bit like a functional style, but it's not really. It's just a way to keep the code clean and readable.

This starter is as minimal as possible. It doesn't include any database or authentication. It's just a simple express app with a few features.

## Features

### Consistent Response

The app uses a consistent response format. The response format is:

```json
{
    "status": "success" | "error",
    "statusCode": number,
    "payload": any,
}
```

A little bit of typescript template magic is used to make sure that the response is always in the correct format. You can find the code here:

https://github.com/TheNinza/typescript-expresss-boilerplate/blob/e5d3708563e084686d82c99f4e6c48095d233feb/src/types/ModifiedResponse.ts#L1-L11

### Logging

Includes a custom logger that logs to the console and to a file. The logger is a singleton, so you can import it anywhere in your code and use it. It's also a wrapper around the winston logger, so you can use all the winston features.

### Environment Safe

The app makes sure that all the environment variables are set. If any of the environment variables are missing, the app will throw an error.

### Docker

Includes a dockerfile creates a lightweight docker image with no dev dependencies.

## Configuration

### Environment Variables

There is a priority how the configuration is loaded. The priority is:

-   The app will first check if` NODE_ENV` is set to `production` or not.
-   If it is set to `production`, the order is

    -   .env
    -   .env.production
    -   .env.example

-   Else if it is not set to `production`, the order is

    -   .env.development
    -   .env
    -   .env.example

-   Note that you don't need to use `.env` files. You can just set the environment variables in your shell.

| Variable    | Description                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| PORT        | The port the server will listen on.                                                                      |
| NODE_ENV    | The environment the server is in.                                                                        |
| ORIGIN      | CORS origin. (Regex string to support multiple origins)                                                  |
| CREDENTIALS | CORS credentials.                                                                                        |
| LOG_FORMAT  | The format of the logs. The app uses morgan to log http requests. You can use any of the morgan formats. |
| LOG_DIR     | The directory where the logs will be saved. (Recommended to use absolute path)                           |

### Docker

The docker-compose file uses a volume to store the logs. You can change the volume driver to whatever you want. The docker-compose file also uses a `.env` file to set the environment variables. You can change the environment variables in the docker-compose file or in the `.env` file.

The default port is 8000. You can change it in the docker-compose file.
