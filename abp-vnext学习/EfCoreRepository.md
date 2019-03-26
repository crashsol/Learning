# EfCoreRepository 配置导航属性

## 使用配置 EntityOptions 对导航属性进行配置

- 在 EntityFrameworkCore 层中，通过 IAbpDbContextRegistrationOptionsBuilder 方法进行对聚合根导航属性的配置

```
    public class BookStoreSPAEntityFrameworkCoreModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<BookStoreSPADbContext>(options =>
            {
                /* Add custom repositories here. Example:
                 * options.AddRepository<Question, EfCoreQuestionRepository>();
                 */
                // 创建默认仓储
                options.AddDefaultRepositories(true);

                // 通过该方法为AggregateRoot配置导航属性的配置
                options.Entity<OrganizationUnit>(sp =>
                {
                    sp.DefaultWithDetailsFunc = query => query.Include(b => b.Children)
                        .Include(b => b.OrganizationUnitUsers);
                });
                //添加OrganizationUnit Repository 自定义IRepository的注册
               // options.AddRepository<IOrganizationUnitRepository, EfCoreOrganizationUnitRepository>();
            });
        }
    }

```

## 通过创建扩展方法，重写 IRepository 的 WithDetails(),配置导航属性，步骤如下

- 在 Domain 层创建 IOrganizationUnitRepository:IBasicRepository<OrganizationUnit,Guid>

```
 ///// <summary>
///// 组织单元管理接口
///// </summary>
public interface IOrganizationUnitRepository:IBasicRepository<OrganizationUnit,Guid>
{

}
```

- 在 EntityFrameworkCore 中, 使用静态方法 OrganizationUnitEfCoreQueryableExtensions

```
  /// <summary>
  /// 组织单元构建静态扩展方法
  /// </summary>
  public static class OrganizationUnitEfCoreQueryableExtensions
  {
      public static IQueryable<OrganizationUnit> IncludeDetails(this IQueryable<OrganizationUnit> queryable,
          bool include = true)
      {
          if (!include)
          {
              return queryable;
          }
          return queryable
              .Include(x => x.Children)
              .Include(b => b.OrganizationUnitUsers);
      }
  }
```

- 在 EntityFrameworkCore 中,创建 IOrganizationUnitRepository 的 EfCoreOrganizationUnit 的实现

```
  //public class EfCoreOrganizationUnitRepository: EfCoreRepository<BookStoreSPADbContext, OrganizationUnit,Guid>,IOrganizationUnitRepository
  {
      public EfCoreOrganizationUnitRepository(IDbContextProvider<BookStoreSPADbContext> dbContextProvider)
          : base(dbContextProvider){}

      //重写基类的withDetails方法，用于加载导航属性
      public override IQueryable<OrganizationUnit> WithDetails()
      {
          return GetQueryable().IncludeDetails(true);
      }
  }
```
