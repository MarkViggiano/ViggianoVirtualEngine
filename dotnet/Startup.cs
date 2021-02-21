using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace dotnet {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.Configure<CookiePolicyOptions>(options => {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddRouting();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseMvc();

            var trackPackageRouteHandler = new RouteHandler(context => {
              var routeValues = context.GetRouteData().Values;
              return context.Response.WriteAsync($"Hello! Route values: {string.Join(", ", routeValues)}");
            });

            var routeBuilder = new RouteBuilder(app, trackPackageRouteHandler);
            RegisterRoutes(routeBuilder);

            var routes = routeBuilder.Build();
            app.UseRouter(routes);

        }

        public void RegisterRoutes(RouteBuilder routeBuilder) {

          routeBuilder.MapGet("hello/{name}", context => {
            var name = context.GetRouteValue("name");
            // The route handler when HTTP GET "hello/<anything>" matches
            // To match HTTP GET "hello/<anything>/<anything>,
            // use routeBuilder.MapGet("hello/{*name}"
            return context.Response.WriteAsync($"Hi, {name}!");
          });

          routeBuilder.MapGet("application/", context => {
            return context.Response.WriteAsync("This is VVE's web server for cpu bound activities!");
          });

        }

    }
}
