'use strict';
/**
 * Mqttメッセージングクラス
 * @class
 * @desc
 *  起動オプション{
 *    broker: 「ブローカーサーバーアドレス」
 *    topics: [「サブスクライブするトピックID配列」]
 *  }
 *  オーバーライド
 *    mqConnected: 接続時処理
 *    mqGet:       メッセージ受信処理
 *    suberror:    さぶスクライブ時エラー処理
 */
const keUtility=require('ke-utility');
const Mq=require('mqtt');
module.exports=class keMqtt extends keUtility {
  constructor(op) {
    super(op);
    const me=this;
    let i;
    me.info();
    me.CFG.mq=me.CFG.mq||{};
    for(i in me.CFG.mq){op[i]=me.CFG.mq[i];}
    op.broker=op.broker||me.CFG.broker||'mqtt://mosquitto.org';
    op.topics=op.topics||[];
    me.Mq=Mq.connect(op.broker);
    me.Mq.on('connect', function(){me.mqConnected(op);});
    me.Mq.on('message', function(topic, data){
      me.mqGet(topic, data.toString());
    });
    for(i in op.topics){me.subscribe(op.topics[i]);}
    me.on('suberror', function(topic, err){me.suberror(topic, err);});
  }

  /**
   * 接続通知時処理
   * @param  {Object} op 接続オプション
   * @return {Void}      none
   * @method
   */
  mqConnected(op){
    console.log('connected:this should be overrided ', op);
  }

  /**
   * メッセージ受信時処理
   * @param  {String} topic トピックID
   * @param  {Steing} data  メッセージデータ
   * @return {Void}         none
   * @method
   */
  mqGet(topic, data){
    console.log('mqGet:this should be overrided', topic, data);
  }

  /**
   * メッセージ送信
   * @param  {String} topic トピックID
   * @param  {String} data  メッセージデータ
   * @return {Void}         none
   * @method
   */
  publish(topic, data) {
    return this.Mq.publish(topic, data);
  }

  /**
   * 受信依頼
   * @param  {String} topic トピックID
   * @return {Void}         none
   * @method
   */
  subscribe(topic){
    const me=this;
    me.Mq.subscribe(topic, function(err, grandted){
      if(err){me.fire('suberror', topic, err);}
      else{me.infoLog('subscribed: '+topic);}
    });
  }

  /**
   * サブスクライブエラー時処理
   * @param  {Object} err     エラー情報
   * @param  {Object} granted 認証情報
   * @return {Void}           none
   * @method
   */
  suberror(err, granted) {
    consle.log('suberror:this should be overrided', err, granted);
  }

};