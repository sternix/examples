package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func sse(w http.ResponseWriter, req *http.Request) {
	f, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming Unsupported", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	for {
		fmt.Fprintf(w, "data: %s\n\n", time.Now().Format("15:04:05"))
		f.Flush()
		time.Sleep(1 * time.Second)
	}
}

func main() {
	http.HandleFunc("/", sse)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
