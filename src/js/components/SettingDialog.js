/**
 * Created by huangling on 22/01/2017.
 */
import React, {Component} from 'react';
import {Card, Tabs, Menu, Slider, Row, Col, InputNumber} from 'antd';
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

export  default  class SettingContainer extends Component {
  componentWillMount() {
    this.state = {
      activeKey: '1',
      current: '1',
      openKeys: [],
      opacity: 100
    };
    this.onOpenChange = this.onOpenChange.bind(this);
    this.onOpacityChange = this.onOpacityChange.bind(this);
  }

  handleOk() {
    this.handleCancel();
  }

  handleCancel() {
    this.props.toggleShow(false);
  }

  onChange(activeKey) {
    this.setState({activeKey});
  }

  onOpenChange(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({openKeys: nextOpenKeys});
  }

  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }

  onOpacityChange(value) {
    this.setState({opacity: value});
    this.props.updateStyle({opacity: value / 100});
  }

  render() {
    const panes = [
      {
        title: 'Tab 1',
        content: (
          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            selectedKeys={[this.state.current]}
            style={{width: 500}}
            onOpenChange={this.onOpenChange}
            onClick={this.handleClick}
          >
            <SubMenu key="basic" title={<span>Basic Style</span>}>
              <Menu.Item key="background">Background</Menu.Item>
              <Menu.Item key="opacity">
                <Row>
                  <Col span={4}>
                    <span>Opacity</span>
                  </Col>
                  <Col span={12}>
                    <Slider min={1} max={100} onChange={this.onOpacityChange} value={this.state.opacity}/>
                  </Col>
                  <Col span={4}>
                    <InputNumber min={1} max={100} style={{marginLeft: 16}}
                                 value={this.state.opacity} onChange={this.onOpacityChange}
                    />%
                  </Col>
                </Row>
              </Menu.Item>
              <Menu.Item key="position">Fiexd position</Menu.Item>
            </SubMenu>
            <SubMenu key="border" title={<span>Border Style</span>}>
              <Menu.Item key="thick">thick</Menu.Item>
              <Menu.Item key="radius">radius</Menu.Item>
              <Menu.Item key="style">style</Menu.Item>
              <Menu.Item key="color">color</Menu.Item>
              <Menu.Item key="rotate">rotate</Menu.Item>
            </SubMenu>
            <SubMenu key="shadow" title={<span>Shadow Style</span>}>
              <Menu.Item key="size">size</Menu.Item>
              <Menu.Item key="opacity">opacity</Menu.Item>
              <Menu.Item key="color">color</Menu.Item>
              <Menu.Item key="direction">direction</Menu.Item>
            </SubMenu>
          </Menu>
        ), key: '1'
      }
    ];

    return (
      <Card title="Settings" style={{width: 600}}>
        <Tabs onChange={this.onChange}
              activeKey={this.state.activeKey}>
          {panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </Card>
    );
  }
}
