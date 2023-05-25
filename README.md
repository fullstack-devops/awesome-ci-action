# awesome-ci-action
A GitHub Action to use the Awesome CI in your workflow

## Usage

### Inputs

- `version`: The chart-releaser version to use (default: 1.3.0)

### Environment variables

- `GITHUB_TOKEN` (required): The GitHub token of this repository (`${{ secrets.GITHUB_TOKEN }}`)

### Example Workflow

Create a workflow (eg: `.github/workflows/release.yml`):

```yaml
name: PullRequest

on:

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup awesome-ci
        uses: fullstack-devops/awesome-ci-action@main

      - name: set build Infos
        run: awesome-ci pr info -number ${{ github.event.pull_request.number }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
For information and options see [awesome-ci](https://github.com/fullstack-devops/awesome-ci). 
