import React, { Component } from 'react';
import '../styles/DamageCalculator.css';
import ArmorData from './ArmorData';
import ArmorOutput from './ArmorOutput';
import WeaponData from './WeaponData';
import WeaponOutput from './WeaponOutput';
import { Typography } from 'antd';
const { Title, Text } = Typography;

// Map object (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) for swords and armors.
const SwordsMap = new Map();
SwordsMap.set('w_sword', 4);
SwordsMap.set('s_sword', 5);
SwordsMap.set('i_sword', 6);
SwordsMap.set('g_sword', 4);
SwordsMap.set('d_sword', 7);
SwordsMap.set('n_sword', 8);

const ArmorMap = new Map();
ArmorMap.set('l_armor', { defense: 7, toughness: 0 });
ArmorMap.set('g_armor', { defense: 11, toughness: 0 });
ArmorMap.set('c_armor', { defense: 12, toughness: 0 });
ArmorMap.set('i_armor', { defense: 15, toughness: 0 });
ArmorMap.set('d_armor', { defense: 20, toughness: 8 });
ArmorMap.set('n_armor', { defense: 20, toughness: 12 });

export default class DamageCalculator extends Component {
  // Initalizing default state.
  state = {
    swordType: 'd_sword',
    sharpness: '0',
    strength: '0',
    armorType: 'l_armor',
    protection: 0,
    armorData: {},
    swordData: {}
  };
  // Function which changes state when select element changed value. It also calls calls function for calculating sword damage.
  handleChange = (name, value) => {
    this.setState({ [name]: value }, this.calcSwordDamage);
  };
  // Function which calculates sword damage
  calcSwordDamage = () => {
    // Utility functions.
    const calcCrit = v => v * 1.5;
    const calcSharp = v => (v <= 1 ? v : v * 0.5 + 0.5);

    // Getting and calculating values
    const damage = SwordsMap.get(this.state.swordType);
    const sharpness = parseInt(this.state.sharpness);
    const strength = parseInt(this.state.strength);

    const strengthDamage = 3 * strength;
    const sharpnessDamage = calcSharp(sharpness);
    const critDamage = calcCrit(damage);
    const critStrength = calcCrit(strengthDamage);
    const sum = damage + strengthDamage + sharpnessDamage;
    const critSum = critDamage + sharpnessDamage + critStrength;

    // Passing values to react state
    this.setState(
      {
        swordData: {
          damage,
          sharpness,
          strength,
          strengthDamage,
          sharpnessDamage,
          critDamage,
          critStrength,
          sum,
          critSum
        }
      },
      this.calcArmorDamage // And calling function for armor calculation.
    );
  };
  // Function for armor calculation
  calcArmorDamage = () => {
    // Armor reduction method (https://gamepedia.cursecdn.com/minecraft_gamepedia/0/0e/ArmorDamageFormula.svg?version=9691d60eda348ba0d00561ea9b8f500a)
    const armorReduction = (dmg, toughness, defense) => {
      const bottomFraction = 2 + toughness / 4;
      const rightFraction = dmg / bottomFraction;
      const bracketMax = Math.max(defense / 5, defense - rightFraction);
      const bracketMin = Math.min(20, bracketMax);
      const bracket = 1 - bracketMin / 25;
      return bracket * dmg;
    };
    // Protection reduction method
    const protReduction = (dmg, prot) => {
      const sumEPF = prot * 4;
      const damageReduction = 1 - sumEPF / 25;
      const damageOut = dmg * damageReduction;
      return damageOut;
    };
    // Other functions
    const calcHTK = dmg => Math.ceil(20 / dmg);
    const calcPercentage = v => 100 * ((4 * v) / 25);

    // Getting and calculating values
    const { defense, toughness } = ArmorMap.get(this.state.armorType);
    const protection = parseInt(this.state.protection);

    const dmg = armorReduction(
      this.state.swordData.sum,
      toughness,
      defense
    ).toFixed(2);
    const dmgProt = protReduction(dmg, protection).toFixed(2);
    const dmgHTK = calcHTK(dmgProt);
    const dmgCrit = armorReduction(
      this.state.swordData.critSum,
      toughness,
      defense
    ).toFixed(2);
    const dmgCritProt = protReduction(dmgCrit, protection).toFixed(2);
    const dmgCritHTK = calcHTK(dmgCritProt);
    const percentage = calcPercentage(protection);
    // Setting react state.
    this.setState({
      armorData: {
        defense,
        toughness,
        dmg,
        dmgProt,
        dmgHTK,
        dmgCrit,
        dmgCritProt,
        dmgCritHTK,
        percentage
      }
    });
  };
  // When component is initialized calculate sword damage.
  componentDidMount() {
    this.calcSwordDamage();
  }
  render() {
    return (
      <div className="DamageCalculator">
        <Title>Damage Calculator</Title>
        <WeaponData handleChange={this.handleChange} />
        <WeaponOutput data={this.state.swordData} />
        <ArmorData handleChange={this.handleChange} />
        <ArmorOutput data={this.state.armorData} />
        <Text className="copyright">
          Made by <a href="https://github.com/upedd">upedd</a>
        </Text>
      </div>
    );
  }
}
