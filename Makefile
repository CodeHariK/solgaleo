clean:
	find /Users/Shared/Code/solgaleo -name "gen.css" -type f -delete
	find /Users/Shared/Code/solgaleo -name "gen.ts" -type f -delete
	rm -r dist
	rm -r dist-test
	rm -r dist-example

gotest:
	go run main.go

goexample:
	go run main.go -dir=dist-example
