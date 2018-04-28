import Client from '@app/client';
import { selectClient } from '@app/reducers/clients';
import ScreenHandler from '@messages/screen';
import StreamMessage from '@shared/messages/stream';
import { Monitor } from '@shared/system';
import { MessageType } from '@shared/types';
import { ScreenFrameTemplate } from '@templates';
import * as React from 'react';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import Stream from './Stream';

interface Props {
  client: Client;
}

interface State {
  data: ScreenFrameTemplate;
  scale: number;
  running: boolean;
}

class Screen extends React.Component<Props> {
  public state: State = {
    data: null,
    scale: 0.1,
    running: true,
  };

  private selectedMonitor: Monitor;

  public componentDidMount() {
    this.selectedMonitor = this.props.client.monitors[0];
    // this.subscribe(MessageType.Screen, new ScreenHandler(this));
    this.stream();
  }

  public componentWillUnmount() {
    this.stop();
  }

  public render() {
    const { scale, running, data } = this.state;

    return (
      <div style={{ padding: 10 }}>
        <Navbar>
          <Nav>
            <NavItem>Close</NavItem>
            <NavDropdown title={'monitor'} id={'dropdown-size-medium'}>
              {this.props.client.monitors.map(monitor => (
                <MenuItem
                  key={monitor.id}
                  onClick={() => this.selectMonitor(monitor)}
                >
                  {monitor.id + ': ' + monitor.width + 'x' + monitor.height}
                </MenuItem>
              ))}
            </NavDropdown>
            <NavItem>
              <input
                type="range"
                min={1}
                value={scale * 100}
                max={100}
                onChange={e => this.setScale(e.target.valueAsNumber)}
              />
            </NavItem>
            <NavItem onClick={() => this.toggle()}>
              {running ? 'Pause' : 'Start'}
            </NavItem>
          </Nav>
        </Navbar>
        <div>
          <Stream mouse keyboard data={data} scale={scale} />
        </div>
      </div>
    );
  }

  private setScale(scale: number) {
    this.setState({
      scale: scale / 100,
    });

    this.stream();
  }

  private selectMonitor(monitor: Monitor) {
    this.selectedMonitor = monitor;
  }

  private toggle() {
    const { running } = this.state;

    if (running) {
      this.stop();
    } else {
      this.stream();
    }
  }

  private stream() {
    const { scale } = this.state;

    this.props.client.send(
      new StreamMessage({
        active: true,
        scale,
        monitor: true,
        handle: this.selectedMonitor.id,
      })
    );

    this.setState({
      running: true,
    });
  }

  private stop() {
    this.props.client.send(
      new StreamMessage({
        active: false,
      })
    );

    this.setState({
      running: false,
    });
  }
}

export default connect(state => ({
  client: selectClient(state),
}))(Screen);
