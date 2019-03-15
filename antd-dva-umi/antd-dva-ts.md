# TS-React-Antd 创建页面注意事项

### 1. 在 React 中使用 AntdUI 库注意事项

- > 定义传入的 Props Interface
  ```
  interface IIndexPageProps  {
      // 要传入的 state对象，从model中导入
      notice: INoticeModelState;
      dispatch: (args: any) => Promise<any>;
      submitting: boolean;
  }
  ```
- > 如果传入的 Props 需要使用 Form 表单，定义的 interface 需要继承 **FormComponentProps**，导出的页面必须要用 **Form.Create()**(**Index**)装饰,否则通过 this.props.form 无法获取{ **getFieldDecorator**, **getFieldsError**, **getFieldError**, **isFieldTouched** }
  ```
  interface IIndexPageProps extends FormComponentProps {
      notice: INoticeModelState;
      dispatch: (args: any) => Promise<any>;
      submitting: boolean;
  }
  //导出页面需要使用Form.Create(Index)进行装饰
  export defalut index Form.create()(Index);
  ```
- > 定义页面 class,传入上面定义的 PageProps
  ```
  class index extends Component<IIndexPageProps> {
  }
  ```

### 2. 通过 connnet 函数，将 dva 中的 state 传给 Page

- > 注意事项: 从 model 中导出的 state 名称为 model 的 namespaces,并且与 IPageState 中定义的 state 名称一致,例如 notice
  ```
  @connect(({ notice, loading }) => ({
     notice,
     loading: loading.effects['notice/send'],
  }))
  class index extends Component<IIndexPageProps> {
      ...
  }
  ```
