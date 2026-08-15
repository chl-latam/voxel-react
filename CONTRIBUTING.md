# Contributing

Contributions are welcome through GitHub issues and pull requests.

## Development

1. Check out `voxel-core` and `voxel-react` as sibling directories.
2. Use Node.js 20 or newer.
3. Run `npm ci`.
4. Include tests for behavioral changes.
5. Run `npm run check` before opening a pull request.

Keep API calls, product catalogs, stores, and application-specific UI outside
Voxel React. Geometry and coordinate conversion belong in Voxel Core.
