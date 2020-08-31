using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Interfaces
{
    public interface IProductRepository
    {
        IEnumerable<Product> products { get; }

        IEnumerable<Product> availableProduct { get; }

        void SaveProduct(Product product);

        void DeleteProduct(int id);
    }
}
