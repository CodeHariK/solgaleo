clean:
	find /Users/Shared/Code/solgaleo -name "gen.css" -type f -delete
	find /Users/Shared/Code/solgaleo -name "gen.ts" -type f -delete
	@rm -rf dist || true
	@rm -rf dist-test || true
	@rm -rf dist-example || true
	@rm -rf node_modules || true
	@rm -rf example/node_modules || true

gotest:
	go run main.go

goexample:
	go run main.go -dir=dist-example
