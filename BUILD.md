# Build

## Requirementss

- Go
- Preferably make (cygwin)
- TypeScript compiler
- Windows
	- [TDM-GCC](http://tdm-gcc.tdragon.net/)
- macOS
	- Xcode
- Linux
	- gcc
	- X development headers and libraries
- `go get github.com/oschwald/geoip2-golang`
- `go get golang.org/x/image/bmp`
- `go get github.com/disintegration/imaging`
- `go get golang.org/x/net/websocket`
- `go get github.com/dustin/go-humanize`

***

```bash
$ make  # builds web, command and client (client, command)
$ make web  # runs the TypeScript compiler (tsconfig.json) (command/web/static/lib.js, command/web/static/lib.js.map)
$ make cert  # generates TLS certificates (command/private.key, command/cert.pem)
$ make clean  # removes all debugging and built files
$ make prod  # builds production command (rat)
$ make windows  # builds command and production Windows binaries (command/bin/)
$ make macos  # builds command and production macOS binaries (command/bin/)
$ make linux  # builds command and production Linux binaries (command/bin/)
```

***

## Windows

Download [TDM-GCC](http://tdm-gcc.tdragon.net/)
and add it to your `%PATH%`

Add the header files to your `%PATH%` as well.

## macOS

Install Xcode. Run `gcc` from your terminal and it should offer to install it.

## Linux

Install gcc and X development headers and libraries. Most likely available in your package manager as `gcc`

```
# apt-get install gcc
# apt-get install libx11-dev
```

***

# Configuring Go

Set `GOPATH` to your working directory

```
$ mkdir /go
$ export PATH=$PATH:/go
$ cd /go/src/...
$ make ...
```

***

# Building without make

Do not forget to run `tsc` in the root directory

## Development 

```
$ cd client
$ go build
```

```
$ cd command
$ go build
```

## Production

```
$ cd client
$ go build --tags="prod"
```

```
$ cd command
$ go build --tags="prod"
```