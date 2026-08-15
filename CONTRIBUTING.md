# Contributing

Contributions are welcome through GitHub issues and pull requests.

## Development

1. Use Node.js 20 or newer.
2. Run `npm ci`; the tagged Voxel Core dependency is installed from GitHub.
3. Include tests for behavioral changes.
4. Run `npm run check` before opening a pull request.

Keep API calls, product catalogs, stores, and application-specific UI outside
Voxel React. Geometry and coordinate conversion belong in Voxel Core.
