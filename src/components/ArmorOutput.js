import React, { Component } from 'react';
import { Divider, Row, Col, Statistic, Table } from 'antd';

export default class ArmorOutput extends Component {
  render() {
    const columns = [
      {
        title: 'Property',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Normal Hit',
        dataIndex: 'normal',
        key: 'normal'
      },
      {
        title: 'Critical Hit',
        dataIndex: 'crit',
        key: 'crit'
      }
    ];
    const {
      defense,
      toughness,
      dmg,
      dmgProt,
      dmgHTK,
      dmgCrit,
      dmgCritProt,
      dmgCritHTK,
      percentage
    } = this.props.data;
    const data = [
      {
        name: 'Damage After Armour',
        normal: dmg,
        crit: dmgCrit
      },
      {
        name: 'Damage After Protection',
        normal: dmgProt,
        crit: dmgCritProt
      },
      {
        name: 'Hits To Kill',
        normal: dmgHTK,
        crit: dmgCritHTK
      }
    ];
    return (
      <div>
        <Divider>Armor Stats:</Divider>
        <Row gutter={4}>
          <Col span={8} className="statistic">
            <Statistic title="Armour Points" value={defense} />
          </Col>
          <Col span={8} className="statistic">
            <Statistic title="Armour Toughness" value={toughness} />
          </Col>
          <Col span={8} className="statistic">
            <Statistic
              title="Protection Reduction"
              value={percentage}
              suffix="%"
            />
          </Col>
        </Row>
        <Divider></Divider>
        <Table columns={columns} dataSource={data} pagination={false}></Table>
      </div>
    );
  }
}
