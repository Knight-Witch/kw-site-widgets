# Builder Notes Changelog

## 2026-05-15 - Initial scaffold

Created the dedicated builder development branch and documentation scaffold.

Added:

- `README.md`
- `BUILDER_MASTER_SPEC.md`
- `IMPLEMENTATION_PLAN.md`
- `CHANGELOG.md`
- `NOTES_CHANGELOG.md`

Key decisions recorded:

- Keep builder in `Knight-Witch/kw-site-widgets`.
- Develop on `KW_Builder_Dev`.
- Use `fourthwall/builder/` for isolated builder files.
- Use `kwb-` namespace to avoid conflict with the existing `kwfw-` featured carousel.
- Use a loader approach later so the Fourthwall footer only needs one builder include.
- Build desktop-first.
- Start with builder shell + Cover + Core selection before jacket/cart complexity.
