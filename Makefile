.PHONY: clean push
clean:
	- rm -rf dist lib

push:
	- git add --all
	- git commit -m "update $(shell date +'%Y%m%d%H%M%S')"
	- git push