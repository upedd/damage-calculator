import React, { Component } from 'react';
import { Divider, Select } from 'antd';
const { Option } = Select;

export default class ArmorData extends Component {
  render() {
    return (
      <div>
        <Divider>Armor Data:</Divider>
        <Select
          defaultValue="l_armor"
          className="Select"
          onChange={this.props.handleChange.bind(null, 'armorType')}
        >
          <Option value="l_armor">Leather Armor</Option>
          <Option value="g_armor">Gold Armor</Option>
          <Option value="c_armor">Chainmail Armor</Option>
          <Option value="i_armor">Iron Armor</Option>
          <Option value="d_armor">Diamond Armor</Option>
          <Option value="n_armor">Netherite Armor</Option>
        </Select>
        <Select
          defaultValue="0"
          className="Select"
          onChange={this.props.handleChange.bind(null, 'protection')}
        >
          <Option value="0">No Protection</Option>
          <Option value="1">Protection I</Option>
          <Option value="2">Protection II</Option>
          <Option value="3">Protection III</Option>
          <Option value="4">Protection IV</Option>
        </Select>
      </div>
    );
  }
}
