nodejs Mqttクライアントクラス
====

nodejsでMqttコミュニケーションを行うためのクラスです。

## 説明
  1. ke-utilityをベースとした構成となっています。
  2. オブジェクトコンストラクションにより起動されますので、必要に応じ継承でオーバーライドします。


## Requirement


## 使い方

### 初期処理
 - オブジェクト生成時の引数は次のようになります。
 - {
 -   broker: 「ブローカーアドレスmqtt://ではじめます」,
 -   topics: 「受信するtopicidを配列で指定します。」
 - }

### 受信時処理
 - mqGetメソッドを継承によりオーバーライドしてください。
 - 引き渡される引数は「トピックID」と「メッセージ本体」です。

### 送信
 - publishメソッドを使います。
 - publish(「トピックID」, 「メッセージ本体」)です。

### サンプル
~~~javascript
'use strict';
const keMqtt=require('ke-mqtt');
const main=class main extends keMqtt {
  mqGet(topic, data) {
    「受信時の処理」をオーバライドします。
  }
};
let UTY=new main({broker: 'mqtt://「ブローカーアドレス」', topics: [「受信トピックIDの配列」]});
UTY.PROC(function(){
  for(let i=0; i<2; i++){
    UTY.publish(「送信トピックID」, '「送信メッセージ」');
    console.log('publish');
    UTY.sleep(10000);
  }
});
~~~

## インストール
  npm install ke-mqtt

## Structure
  フォルダ構成と解説
## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[m0kimura](https://github.com/m0kimura)
