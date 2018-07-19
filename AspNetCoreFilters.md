# 关于NetCore中常用Filter记录

- 统一模型验证
```
     /// <summary>
    /// 统一认证模型错误
    /// </summary>
    public class ValidateModelFilter: ActionFilterAttribute
    {
        private readonly ILogger _logger;
        public ValidateModelFilter(ILogger<ValidateModelFilter> logger)
        {
            _logger = logger;
        }
        public override void OnResultExecuting(ResultExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {

                if(context.HttpContext.Request.IsAjax())
                {
                    //如果是ajax请求，返回json数据
                    var errors = context.ModelState.Values.SelectMany(v => v.Errors);
                    context.Result = new JsonResult(errors.Select(a => a.ErrorMessage).Aggregate((i, next) => $"{i},{next}"));
                }
            }
               
        }
        
    }
```
- MVC统一异常处理
```
    /// <summary>
    /// 全局异常处理
    /// </summary>
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly ILogger _logger;

        private readonly IHostingEnvironment _env;

        public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger, IHostingEnvironment env)
        {
            _env = env;
            _logger = logger;
        }
       public void OnException(ExceptionContext context)
        {        
           
            if (context.Exception.GetType() == typeof(UserOperationException))
            {             
                if(context.HttpContext.Request.IsAjax())
                {
                    context.Result = new BadRequestObjectResult(context.Exception.Message);
                }
                else
                {           
                    context.ModelState.AddModelError(string.Empty, context.Exception.Message);
                    context.Result = new ViewResult();
                }
                
            }
            else
            {              
                var Message = "发生了未知的内部错误";
                if (_env.IsDevelopment())
                {
                    //非生产环境就返回堆栈错误信息
                    Message = context.Exception.StackTrace;
                }
                if(context.HttpContext.Request.IsAjax())
                {
                    context.Result = new BadRequestObjectResult(Message);
                }
                else
                {                  
                    context.ModelState.AddModelError(string.Empty, context.Exception.Message);
                    context.Result = new ViewResult();
                }
            
            }
            //记录错误信息
            _logger.LogError(context.Exception, context.Exception.Message);
            context.ExceptionHandled = true;
        }   
    }

```
- 判断当前请求是否是AJAX
```
    /// <summary>
    /// HttpReqquest 扩展方法
    /// </summary>
    public static class RequestExtend
    {
        /// <summary>
        /// 判断当前请求是否为 Ajax
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public static bool IsAjax(this HttpRequest req)
        {
            bool result = false;
            var xreq = req.Headers.ContainsKey("x-requested-with");
            if(xreq)
            {
                result = req.Headers["x-requested-with"] == "XMLHttpRequest";
            }
            return result;           

        }
    }
```
- 注册全局Filter
```
  services.AddMvc(options =>
    {
        //Global Exception Filter
        options.Filters.Add(typeof(GlobalExceptionFilter)
        //Validte Model Filter
        options.Filters.Add(typeof(ValidateModelFilter)
    }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
 
```
