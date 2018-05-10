all: install start

clean:
	rm -rf $(deadwood)
	echo "Clean complete"

install:
	@yarn install

start:
	@yarn start

deadwood := \
	node_modules/ \
	dist/ \

.SILENT: clean
.PHONY: clean install start