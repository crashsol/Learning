# DVA 中 effect 异常处理流程

- model 中,component 里使用 dispatch 发出 action 时,如果调用 effects 副作用中发出抛出异常,会被 dva 全局的 onError 函数捕获，如果在 onError 继续跑出异常，可以在发出 dispatch 的 component 中，通过 catch 捕获

## component 中发出 dispatch,模拟登陆

```
handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      })
        // 因为dispatch 返回的是一个promise，可以使用then执行后续和catch捕获异常
        .then(() => {
          alert('aaa');
        })
        //如果在onError中继续抛出异常，可以在此处处理异常
        .catch(e => {
          console.log(2);
          notification.error(e.message);
        });
    }
  };
```

## model 中处理模拟登陆,如果 call 抛出异常，或者主动抛出异常，会被 onError 捕获

```
...
 *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.status === 'error') {
        // 主动抛出异常, 首先会被onError处理
        throw new Error('登陆错误');
      }
 }
...
```

## 统一配置 onError 处理函数，在 pages 下的 app.js|ts 中添加 dva 配置

```
// dva 统一配置入口
export const dva = {
  config: {
    // effects 统一异常处理
    onError(err) {
      // 如果调用了下面一句话，err会被吞噬，不会被component中的catch捕获
      err.preventDefault();
      console.error(err.message);
    },
  },
};

```

# 其他查看链接

- [如何在 dva 的 effects 中实现 callback 回调](https://www.jianshu.com/p/30aa0465f2c8)
- [Dva 官方仓库讨论](https://github.com/onvno/pokerface/issues/3)
