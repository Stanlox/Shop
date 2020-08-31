using Microsoft.EntityFrameworkCore;
using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Models
{
    public class ApplicationDbContent : DbContext
    {
        public ApplicationDbContent(DbContextOptions<ApplicationDbContent> options)
           : base(options)
        { }

        public DbSet<Product> Product { get; set; }
        public DbSet<CategoryProduct> Category { get; set; }
    }
}
