import { InputState, MouseButton } from "../display";
import MessageTemplate from "./index";

export interface MouseTemplate extends MessageTemplate {
    monitor: number;
    button: MouseButton;
    state: InputState;
}

export interface MouseMotionTemplate extends MessageTemplate {
    monitor: number;
    x: number;
    y: number;
}
