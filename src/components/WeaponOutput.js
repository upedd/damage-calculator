import React, { Component } from 'react';
import { Divider, Table } from 'antd';

export default class WeaponOutput extends Component {
  render() {
    // Table syntax from  ant design (https://ant.design/components/table/)
    const columns = [
      {
        title: 'Damage Source',
        dataIndex: 'source',
        key: 'source'
      },
      {
        title: 'Normal Damage',
        dataIndex: 'normal',
        key: 'normal'
      },
      {
        title: 'Critical Damage',
        dataIndex: 'crit',
        key: 'crit'
      }
    ];
    const {
      damage,
      strengthDamage,
      sharpnessDamage,
      critDamage,
      critStrength,
      sum,
      critSum
    } = this.props.data;
    const data = [
      {
        source: 'Weapon',
        normal: damage,
        crit: critDamage
      },
      {
        source: 'Strength',
        normal: strengthDamage,
        crit: critStrength
      },
      {
        source: 'Sharpness',
        normal: sharpnessDamage,
        crit: sharpnessDamage
      },
      {
        source: 'Sum',
        normal: sum,
        crit: critSum
      }
    ];
    return (
      <div>
        <Divider>Weapon Stats:</Divider>
        <Table columns={columns} dataSource={data} pagination={false}></Table>
      </div>
    );
  }
}
