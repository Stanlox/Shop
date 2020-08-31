using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public bool isAvailable { get; set; }
        public int categoryId { get; set; }
        public virtual CategoryProduct Category { get; set; }
    }
}
