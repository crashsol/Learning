# 在 TS 环境下使用 Dva(dva.js)

- 首先要引入 Effect,Subscription,Reducer 的定义
  > Effect 是用于异步的请求，Subscription 用于对事件的订阅，比如路由,websocket 等
  ```
  import { Effect, Subscription } from 'dva';
  import { Reducer } from 'redux';
  ```
- 定义 Model 的 Props 属性
  ```
  //INoticeItem
  export interface INoticeItem {
    userName: string;
    message: string;
   }
  //定义Dva model中的state具备的属性
  export interface INoticeModelState {
    notices: INoticeItem[];
    loading: boolean;
   }
  ```
- 定义 Model 的 Interface

  > **namespace:** 大小写敏感，全局唯一

  > **effects:** 表示所有异步操作的集合，里面提供 call，put, select 函数，

  - call 用于异步调用
  - put 发出 reduce
  - select 用于从 state 中获取指定名称的**state**对象用

  > **reducers:** 同步操作，返回一个全新的 state
  > **subscriptions:** 用于事件的订阅，比如监听键盘,url,websocket，将到的信息，通过 dispatch 发送给 effects 或则 reducers

  ```
  export interface INoticeModel {
  namespace: 'notice';
  state: INoticeModelState;
  effects: {
    // 定义一个异步操作，它是一个Effect类型的
    send: Effect;
  };
  reducers: {
    // 更新notices,可以指定传入的state类型是INoticeModelState
    saveNotices: Reducer<INoticeModelState>;
  };
  subscriptions: {
    // 订阅消息
    setup: Subscription;
  };
  }
  ```

- 创建并导出 Model
  ```
  const NoticeModel: INoticeModel = {
    namespace: 'notice',
    state: {
    notices: [],
    loading: false,
  },
   effects: {
    *send({ payload }, { call, put, select }) {
      const { userName, message } = payload;
      yield connection.send('NewMessage', userName, message);
    },
  },
  reducers: {
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: [...state.notices, payload],
      };
    },
  },
  export default NoticeModel;
  ```
