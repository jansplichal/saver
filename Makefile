test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--reporter spec \
		--require should \
		--timeout 2000 \
		test/*

.PHONY: test
