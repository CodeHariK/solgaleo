package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	// Define a command-line flag for the directory
	dirFlag := flag.String("dir", "dist-test", "Directory to serve files from")
	flag.Parse() // Parse the command-line flags

	dir := *dirFlag // Get the value of the directory flag

	baseRoute := "/solgaleo"
	if dir == "dist-example" {
		baseRoute = ""
	}

	if _, err := os.Stat(dir); os.IsNotExist(err) {
		log.Fatalf("Directory %s does not exist", dir)
	}

	fileServer := http.FileServer(http.Dir(dir))

	http.Handle(baseRoute+"/assets/", http.StripPrefix(baseRoute+"/", fileServer))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if strings.Contains(r.URL.Path, ".") {
			newPath := strings.Replace(r.URL.Path, baseRoute, "/", 1)
			fmt.Println(filepath.Join(dir, newPath))
			http.ServeFile(w, r, filepath.Join(dir, newPath))
			return
		}

		if r.URL.Path == "/" && baseRoute != "" {
			http.Redirect(w, r, baseRoute, http.StatusPermanentRedirect)
			return
		}

		fmt.Println("Serving index for route:", r.URL.Path)
		http.ServeFile(w, r, filepath.Join(dir, "index.html"))
	})

	port := ":3000"
	log.Printf("Serving %s on http://localhost%s\n", dir, port)
	log.Fatal(http.ListenAndServe(port, nil))
}
