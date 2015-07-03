using Microsoft.Owin;
using Owin;
using PersonalTools.Data;

[assembly: OwinStartupAttribute(typeof(PersonalTools.AspNet4.Startup))]
namespace PersonalTools.AspNet4
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            DataStore.Register("PersonalTools");
        }
    }
}
