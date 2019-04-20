package main

import (
	"rat/client/screen"
	"rat/shared/network/header"

	"gopkg.in/mgo.v2/bson"
)

type MousePacket struct {
	MonitorID   int "monitor"
	MouseButton int "button"
	Type        int "state"
}

func (packet MousePacket) Header() header.PacketHeader {
	return header.MouseHeader
}

func (packet MousePacket) OnReceive() error {
	screen.Mouse(packet.MonitorID, packet.MouseButton, packet.Type)
	return nil
}

func (packet MousePacket) Decode(buf []byte) (IncomingPacket, error) {
	err := bson.Unmarshal(buf, &packet)
	return packet, err
}
