import chalk from 'chalk';

import { Message } from '../../../../shared/src/messages';
import { MessageType } from '../../../../shared/src/types';
import MouseMotionHandler from './mouseMove';

import WebClient from '../webClient';
import DirectoryHandler from './directory.handler';
import KeyHandler from './key';
import MouseHandler from './mouse';
import ProcessHandler from './process.handler';
import ScreenHandler from './screen.handler';
import SubscribeHandler from './subscribe.handler';

const debug = require('debug')('control:ws');

interface MessageMap {
  [index: string]: MessageHandler<any>;
}

const mapping: MessageMap = {
  [MessageType.Subscribe]: new SubscribeHandler(),
  [MessageType.Screen]: new ScreenHandler(),
  [MessageType.Directory]: new DirectoryHandler(),
  [MessageType.Process]: new ProcessHandler(),
  [MessageType.Mouse]: new MouseHandler(),
  [MessageType.MouseMove]: new MouseMotionHandler(),
  [MessageType.Key]: new KeyHandler(),
};

export interface MessageHandler<T extends any> {
  handle(data: T, client?: WebClient): void;
}

export function handle<T extends Message>(client: WebClient, message: T) {
  const handler = mapping[message._type] as MessageHandler<T>;

  if (handler) {
    handler.handle(message, client);
  } else {
    debug('failed to find handler', chalk.bold(message._type + ''), message);
  }
}
