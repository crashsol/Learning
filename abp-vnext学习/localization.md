# localization 重点学习

## 添加本地资源解析

- 定义资源名称

```
    [LocalizationResourceName("NewNameOfBookStoreSPA")]
    public class BookStoreSPAResource
    {

    }
```

- AbpModel 中 注入该资源，并指定添加到 BookStoreSPAResource 中

```
   Configure<AbpLocalizationOptions>(options =>
    {
     options.Resources
        // 配置资源所属
        .Get<BookStoreSPAResource>()
        // 指定资源所在目录
        .AddVirtualJson("/Acme/BookStoreSPA/Localization/ApplicationContracts");
   });
```

- 前台通过 **/api/abp/application-configuration** 可以获取全部的配置信息,其中包含上面配置 BookStoreSPAResource,它的资源名称为 NewNameOfBookStoreSPA，而不是类的名称

```
 "NewNameOfBookStoreSPA": {
        "Permission:Test": "Permission.Test",
        "Permission:BookStoreSPA": "BookStoreSPAApplication"
  },
  "AbpUi": {
        ....
  }
```

## 资源覆盖

- 如果先添加了 Domain 中的资源,又在 ApplicationContracts 中添加了相同的 Key,则 Application 中的 key-value 会覆盖 domain 中的

## 资源集成

- 通过类进行继承

```
   /// <summary>
    /// 继承 AbpValidationResource 中的已经定义的
    /// </summary>
    [InheritResource(typeof(AbpValidationResource))]
    [LocalizationResourceName("NewNameOfBookStoreSPA")]
    public class BookStoreSPAResource
    {

    }

    // 通过API获取到 NewNameOfBookStoreSPA 资源会继承AbpValidationResource中定义的key-value
    "NewNameOfBookStoreSPA": {
        ...
        "The field {0} must match the regular expression '{1}'.": "The field {0} must match the regular expression '{1}'.",
        "The field {0} is invalid.": "The field {0} is invalid.",
        "Permission:Test": "�������.Test",
        "Permission:BookStoreSPA": "BookStoreSPAApplication"

```

- 通过 AbpLocalizationOptions 配置继承
  - 资源可以从多个资源继承.
  - 如果新的本地化资源定义了相同的本地化字符串, 那么它会覆盖该字符串

```
    services.Configure<AbpLocalizationOptions>(options =>
    {
        options.Resources
            .Add<TestResource>("en") //Define the resource by "en" default culture
            .AddVirtualJson("/Localization/Resources/Test") //Add strings from virtual json files
            .AddBaseTypes(typeof(AbpValidationResource)); //Inherit from an existing resource
    });

```

## 官方文档

- [官方文档(中文)](https://cn.abp.io/documents/abp/latest/Localization)

```

```
