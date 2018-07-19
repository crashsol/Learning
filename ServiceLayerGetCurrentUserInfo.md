## 在服务层中，通过IHttpContextAccessor获取当前登录用户信息
- 方法一
```
 /// <summary>
    /// 在Service 层获取当前登录用户信息
    /// </summary>
    public  interface IUserAccessor
    {

        UserIdentity UserIdentity { get; }
    }


  public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _accessor;
        public UserAccessor(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }


        public UserIdentity UserIdentity => _accessor.HttpContext.User.UserIdentity();
       
    }
   

   Startup.cs中添加注入

   services.AddTransient<IUserAccessor, UserAccessor>();   

```

- 方法二，直接在Service层中，通关  IHttpContextAccessor 获取
```
public class BaseService
    {
        public ApplicationDbContext _dbContext;
        public ILogger<BaseService> _logger;
        public IMemoryCache _cache;
        public IMapper _mapper;
        private IHttpContextAccessor _httpContextAccessor;
        public UserIdentity UserIdentity  =>  _httpContextAccessor.HttpContext.User.UserIdentity();
        public BaseService(ApplicationDbContext dbContext, ILogger<BaseService> logger,IMemoryCache cache,IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _logger = logger;
            _cache = cache;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

    }
```
从ClaimsPrincipal中获取用户信息，扩展方法

```
  public static class UserAccessorExtend
    {
        public static UserIdentity UserIdentity(this ClaimsPrincipal User)
        {
            var userIdentity = new UserIdentity();
            userIdentity.UserId = User.Claims.FirstOrDefault(b => b.Type == ClaimTypes.NameIdentifier).Value;
            userIdentity.UserName = User.Claims.FirstOrDefault(b => b.Type == ClaimTypes.Name).Value;
            return userIdentity;
        }
    }


     /// <summary>
    /// 当前登录用户信息
    /// </summary>
    public class UserIdentity
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// 用户名称
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 头像
        /// </summary>
        public string Avatar { get; set; }


        ///// <summary>
        ///// 所属部门
        ///// </summary>
        //public string Department { get; set; }

        /// <summary>
        /// 职位
        /// </summary>
        public string Title { get; set; }
    }
```
