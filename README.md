# awesome-ci-action - arcived
A GitHub Action to use the Awesome CI in your workflow

---

This action is no longer maintained. It is replaced by **relctl-action**, which installs relctl, the successor
of awesome-ci:
https://github.com/layer87-labs/relctl-action

```yaml
- uses: layer87-labs/relctl-action@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

The reusable workflows (`generate-build-infos`, `create-release`) are in the same repository. The legacy
comment commands `aci_*` and the variable `ACI_SILENT` are still accepted by relctl; set
`RELCTL_LEGACY_ACI_ENV=true` to also get the `ACI_*` output variables.

Migration guide, including a runbook that an AI agent can follow:
https://labs.layer87.de/docs/relctl/migrating-from-awesome-ci

This repository is read-only. Please open issues and pull requests at
https://github.com/layer87-labs/relctl and https://github.com/layer87-labs/relctl-action.

---

## Usage

### Inputs

- `version`: The chart-releaser version to use (default: 1.7.2)

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
