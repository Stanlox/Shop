﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    public class CategoryProduct
    {
        public int id { get; set; }
        public string categoryName { get; set; }
        public List<Product> products { get; set; }
    }
}

