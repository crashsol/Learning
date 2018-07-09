# 在NetCore 2.1中使用AuthoizePolicyProvider，实现颗粒度更细的权限控制
- 自定义PermissionAttribute 
``` 
    /// <summary>
    /// 自定义授权
    /// </summary>
    public class PermissionAttribute:AuthorizeAttribute
    {
        /// <summary>
        /// 策略前缀
        /// </summary>
        private const string POLICY_PREFIX = "Permission";

        //使用构造函数，出入PermissionName ，并使用该名称创建对应的 PolicyName
        public PermissionAttribute(string name) => Name = name;

        public string Name
        {
            get
            {
                return Policy.Substring(POLICY_PREFIX.Length);
            }
            set
            {
                Policy = $"{POLICY_PREFIX}{value}";
            }
        }

    }
```
- 自定义 AuthorizePolicyHander
```
 /// <summary>
    /// 用于Policy 自动注册
    /// </summary>
    public class PermissionAuthorizationPolicyProvider : IAuthorizationPolicyProvider
    {
        const string POLICY_PREFIX = "Permission";

        public DefaultAuthorizationPolicyProvider FallbackPolicyProvider { get; }
        public PermissionAuthorizationPolicyProvider(IOptions<AuthorizationOptions> options)
        {
            FallbackPolicyProvider = new DefaultAuthorizationPolicyProvider(options);
        }
        public Task<AuthorizationPolicy> GetDefaultPolicyAsync()
        {
            return FallbackPolicyProvider.GetDefaultPolicyAsync();
        }

        /// <summary>
        /// 自定义Policy
        /// </summary>
        /// <param name="policyName"></param>
        /// <returns></returns>
        public Task<AuthorizationPolicy> GetPolicyAsync(string policyName)
        {
            if (policyName.StartsWith(POLICY_PREFIX, StringComparison.OrdinalIgnoreCase))
            {
                //PermissionAuthorizeAttribute 
                //Create new Policy
                var policy = new AuthorizationPolicyBuilder();
                //基于资源授权
                //policy.AddRequirements(new PermissionRequirement(policyName.Substring(POLICY_PREFIX.Length)));
                //基于Claims 授权
                policy.RequireClaim(POLICY_PREFIX, policyName.Substring(POLICY_PREFIX.Length));

                return Task.FromResult(policy.Build());
            }
            return FallbackPolicyProvider.GetPolicyAsync(policyName);
        }
    }
```
> 除了上述基于Claims授权，还可以自定义授权类型，继承 IAuthorizationRequirement，并定义其处理类，AuthorizationHandler\<IAuthorizationRequirement\>
- **添加到依赖注入,并且配置MvcOption 中的AllowCombiningAuthorizeFilters=false**,以便可以同时使用[Authorize],[Permission("")]进行授权标记
```
  //PolicyProvider
   services.AddSingleton<IAuthorizationPolicyProvider, PermissionAuthorizationPolicyProvider>();

 services.AddMvc(options =>
            {
                options.AllowCombiningAuthorizeFilters = false;
                //Global Exception Filter
                options.Filters.Add(typeof(GlobalExceptionFilter));

                //Validte Model Filter
                options.Filters.Add(typeof(ValidateModelFilter));

            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

```