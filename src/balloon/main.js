import {
  ユーザー入力を受け付ける,
  再生,
  紙吹雪,
  サイズ変更,
  消す,
  出す,
} from '../common/lib';

import StateMachine from 'javascript-state-machine';

const 中間イベント = Array.from(Array(9).keys()).reduce((obj, key, index) =>
  ({...obj, ['onEnterサイズ' + (index + 1).toString()]: async () => {
    console.log('onEnterサイズ' + (index + 1).toString() + ',' + (100 + (index + 1) * 50).toString() + 'px, ' + (300 + (index + 1) * 10).toString() + 'px');
    const b = document.querySelector('#風船');
    await Promise.all([
      再生('#効果音：ビヨーン'),
      サイズ変更(b, {
        width: (100 + (index + 1) * 50).toString() + 'px',
        height: (300 + (index + 1) * 10).toString() + 'px'}),
    ]);
  } }), {});

const fsm = StateMachine({
  init: '開始',
  transitions: [
    { name: 'ユーザー入力', from: '開始',  to: 'サイズ1' },
    { name: 'ユーザー入力', from: 'サイズ1',  to: 'サイズ2' },
    { name: 'ユーザー入力', from: 'サイズ2',  to: 'サイズ3' },
    { name: 'ユーザー入力', from: 'サイズ3',  to: 'サイズ4' },
    { name: 'ユーザー入力', from: 'サイズ4',  to: 'サイズ5' },
    { name: 'ユーザー入力', from: 'サイズ5',  to: 'サイズ6' },
    { name: 'ユーザー入力', from: 'サイズ6',  to: 'サイズ7' },
    { name: 'ユーザー入力', from: 'サイズ7',  to: 'サイズ8' },
    { name: 'ユーザー入力', from: 'サイズ8',  to: 'サイズ9' },
    { name: 'ユーザー入力', from: 'サイズ9',  to: 'バン！' },
    { name: 'ユーザー入力', from: 'バン！',  to: 'サイズ1' },
  ],
  methods: {
    "onEnter開始": () => {
      console.log('開始');
      const b = document.querySelector('#風船');
      b.style.opacity = 1;
    },
    ...中間イベント,
    "onEnterバン！": async () => {
      const c = document.querySelector('#紙吹雪用キャンバス');
      const b = document.querySelector('#風船');
      await Promise.all([
        再生('#効果音：ビヨーン'),
        サイズ変更(b, {width: '600px', height: '400px'}),
      ]);
      await Promise.all([
        消す(b),
        再生('#効果音：バン！'),
        紙吹雪(c, '#ff0000'),
        サイズ変更(b, {width: '100px', height: '300px'}),
      ]);
      await 出す(b);
    },
    onPendingTransition: () => {console.log('まだ前の動作が終わっていません')},
  }
});

const eventHandler = async () => {
  fsm.ユーザー入力();
};

ユーザー入力を受け付ける(eventHandler);
