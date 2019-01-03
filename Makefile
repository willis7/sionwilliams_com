all: install start

clean:
	rm -rf $(deadwood)
	echo "Clean complete"

install:
	@yarn install

start:
	@yarn start

build:
	@yarn run build

preview:
	@yarn run build-preview

deadwood := \
	node_modules/ \
	dist/ \

.SILENT: clean
.PHONY: clean install start build preview