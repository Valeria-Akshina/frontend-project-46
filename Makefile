install:
 	npm install

publish:
 	npm publish --dry-run

lint:
 	npx eslint .

lint-fix:
 	npx eslint . --fix

test:
 	npm test

test-coverage:
 	npm test -- --coverage --coverageProvider=v8

test-watch:
 npm run test:watch

test-coverage:
 npm run test:coverage

lint:
 npm run lint

lint-fix:
 npm run lint -- --fix

publish:
 npm publish --dry-run
