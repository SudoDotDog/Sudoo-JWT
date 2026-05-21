# Paths
build := typescript/tsconfig.build.json

# NPX functions
tsc := node_modules/.bin/tsc

clean:
	@echo "[INFO] Cleaning release files"
	@rm -rf dist

build: clean
	@echo "[INFO] Building for production"
	@NODE_ENV=production $(tsc) --p $(build)

publish: build
	@echo "[INFO] Publishing package"
	@pnpm publish --access=public --no-git-checks

publish-dry-run: build
	@echo "[INFO] Publishing package (dry-run)"
	@pnpm publish --access=public --no-git-checks --dry-run
