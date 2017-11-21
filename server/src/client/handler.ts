import { controlSocket } from "../index";
import Client from "./client";
import ComputerInfoHandler from "./computerInfoHandler";

import Message from "shared/message";
import { PacketType } from "shared/types";

interface PacketMap {
    [index: string]: PacketHandler<any>;
}

const mapping: PacketMap = {
    [PacketType.ComputerInfo]: new ComputerInfoHandler()
};

export interface PacketHandler<T extends Message> {
    handle(client: Client, data: T): void;
}

export function handle<T extends Message>(client: Client, message: T) {
    const handler = mapping[message._type] as PacketHandler<T>;

    if (handler) {
        handler.handle(client, message);
    } else {
        throw new Error("failed to find handler for " + message._type);
    }
}
