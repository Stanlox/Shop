using Microsoft.EntityFrameworkCore;
using Shop.Interfaces;
using Shop.Models;
using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContent dbContent;

        public ProductRepository(ApplicationDbContent dbContent)
        {
            this.dbContent = dbContent;
        }
        public IEnumerable<Product> products
        {
            get
            {
                return dbContent.Product.Include(x => x.Category);
            }
        }

        public IEnumerable<Product> availableProduct
        {
            get
            {
                return dbContent.Product.Where(x => x.isAvailable).Include(x => x.Category);
            }
        }

        public void SaveProduct(Product product)
        {
            Product prod = dbContent.Product.Find(product.Id);

            if (prod != null)
            {
                prod.Name = product.Name;
                prod.isAvailable = product.isAvailable;
                prod.Price = product.Price;
                prod.Category = product.Category ?? prod.Category;
                prod.categoryId = product.categoryId;
            }

            dbContent.SaveChanges();
        }

        public void DeleteProduct(int id)
        {
            Product prod = dbContent.Product.Find(id);
            if (prod != null)
            {
                dbContent.Product.Remove(prod);
                dbContent.SaveChanges();
            }
        }
    }
}
