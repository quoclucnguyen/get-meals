# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the NestJS application entry (`main.ts`) and root module (`app.module.ts`).
- Feature modules live under `src/<feature>/` (e.g., `weather/`, `ratings/`, `recommendations/`), each with `*.module.ts`, `*.service.ts`, `*.controller.ts`, and `dto/` or `interfaces/` as needed.
- Database entities are in `src/entities/` (e.g., `*.entity.ts`).
- Tests are split between unit tests in `src/**/*.spec.ts` and e2e tests in `test/`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run start`: run the API locally in standard mode.
- `npm run start:dev`: run with file watching and hot reload.
- `npm run start:debug`: run with Node inspector enabled.
- `npm run build`: compile TypeScript to `dist/`.
- `npm run start:prod`: run the compiled build.
- `npm run lint`: run ESLint with auto-fix.
- `npm run format`: format TypeScript sources with Prettier.
- `npm run test`: run Jest unit tests.
- `npm run test:e2e`: run e2e tests using `test/jest-e2e.json`.
- `npm run test:cov`: generate coverage output.

## Coding Style & Naming Conventions
- TypeScript + NestJS conventions; follow module/service/controller layering.
- Formatting is enforced by Prettier (default 2-space indentation); linting by ESLint (`eslint.config.mjs`).
- File naming follows NestJS patterns: `*.module.ts`, `*.service.ts`, `*.controller.ts`, DTOs in `dto/*.dto.ts`, interfaces in `interfaces/*.interface.ts`, and entities in `src/entities/*.entity.ts`.

## Testing Guidelines
- Jest is the primary test runner (see `package.json` config).
- Unit tests: `src/**/*.spec.ts` with module-level setup.
- E2E tests: `test/*.e2e-spec.ts` using Supertest and `test/jest-e2e.json`.
- Add tests alongside new modules/services and keep coverage reasonable; use `npm run test:cov` to check.

## Commit & Pull Request Guidelines
- No established commit convention yet (no Git history). Use short, imperative subjects (e.g., "Add ratings validation").
- PRs should include: a clear summary, linked issue (if any), and testing notes (`npm run test`, `npm run test:e2e`).
- Include API/behavior changes in the description and update docs if endpoints change.

## Configuration Tips
- `PORT` is read in `src/main.ts` and defaults to `3000` if unset.
- Add new environment variables via `.env` (if introduced) and document them in the PR.
