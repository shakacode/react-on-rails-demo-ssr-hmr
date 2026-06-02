# Repository Agent Instructions

## Pull Request Readiness

Codex is pre-approved to mark draft pull requests as ready for review in this
repository when the requested work is complete, required checks and review-app
verification are passing or any non-blocking skip is documented, and there are
no known unresolved blocking review comments or user-requested changes.

Codex does not need to ask again before running `gh pr ready` under those
conditions. If required checks are failing, review-app verification is broken,
or blocking feedback remains unresolved, leave the pull request as draft and
report the blocker instead.
