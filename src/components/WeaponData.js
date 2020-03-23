import React, { Component } from 'react';
import { Select, Divider } from 'antd';
const { Option } = Select;

export default class WeaponData extends Component {
  render() {
    return (
      <div>
        <Divider>Weapon Data:</Divider>
        <div>
          <Select
            defaultValue="d_sword"
            className="Select"
            onChange={this.props.handleChange.bind(null, 'swordType')} // This weird method is for passing arguments to a function without executing it.
          >
            <Option value="w_sword">Wooden Sword</Option>
            <Option value="s_sword">Stone Sword</Option>
            <Option value="i_sword">Iron Sword</Option>
            <Option value="g_sword">Golden Sword</Option>
            <Option value="d_sword">Diamond Sword</Option>
            <Option value="n_sword">Netherite Sword</Option>
          </Select>
          <Select
            defaultValue="0"
            className="Select"
            onChange={this.props.handleChange.bind(null, 'sharpness')}
          >
            <Option value="0">No Sharpness</Option>
            <Option value="1">Sharpness I</Option>
            <Option value="2">Sharpness II</Option>
            <Option value="3">Sharpness III</Option>
            <Option value="4">Sharpness IV</Option>
            <Option value="5">Sharpness V</Option>
          </Select>
          <Select
            defaultValue="0"
            className="Select"
            onChange={this.props.handleChange.bind(null, 'strength')}
          >
            <Option value="0">No Strength</Option>
            <Option value="1">Strength I</Option>
            <Option value="2">Strength II</Option>
          </Select>
        </div>
      </div>
    );
  }
}
