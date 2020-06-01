## Introduction

The project uses starter code from [nextron](https://github.com/saltyshiomix/nextron)

Currently, there is only one main page at `renderer/pages/home`. This will either render `PreCheckScreen` or `HomeScreen`.

- `PreCheckScreen`: Handles checking for updates and logging in the user with Auth0.
- `Home`: Renders the main app. This screen should only be shown if the user is logged in.

### Errors

If you find errors like module not found .node, then try running the npm rebuild first.
