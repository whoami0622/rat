import Process from '@components/Process';
import { ProcessListTemplate } from '@templates';

import MessageHandler from './index';

export default class ProcessListHandler
  implements MessageHandler<ProcessListTemplate> {
  public emit(data: ProcessListTemplate) {
    /* const processes = data.processes.sort((a, b) => a.path === '' ? 1 : -1);

    this.view.setState({
      processes
    }); */
  }
}
