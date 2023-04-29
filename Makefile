dev:
	npm run dev
test:
	npm run test
deploy:
	npm run build && firebase deploy --only hosting