using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices.ComTypes;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Interfaces;
using Store.Models;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private IProductRepository product;
        private IEnumerable<Product> productsByCategoria = new List<Product>();
        delegate IEnumerable<Product> GetProducts(IEnumerable<Product> productsByCategoria, IProductRepository product);
        private static string NameDeviceCategory = string.Empty;
        private Tuple<string, GetProducts>[] commands = new Tuple<string, GetProducts>[]
         {
                new Tuple<string, GetProducts>("phones", GetPhones),
                new Tuple<string, GetProducts>("laptop", GetLaptop),
                new Tuple<string, GetProducts>("tablets", GetTablets),
                new Tuple<string, GetProducts>("projectors", GetProjectors)
         };

        public HomeController(IProductRepository product)
        {
            this.product = product;
        }

        [HttpGet("[action]")]
        public IActionResult Products(string nameCategory)
        {
            if (string.IsNullOrEmpty(nameCategory))
            {
                productsByCategoria = product.products;
                return Ok(productsByCategoria);
            }
            else
            {
                var index = Array.FindIndex(commands, j => j.Item1.Equals(nameCategory, StringComparison.InvariantCultureIgnoreCase));

                if (index >= 0)
                {
                    productsByCategoria = commands[index].Item2(productsByCategoria, product);
                    productsByCategoria.Count();
                }

                return Ok(productsByCategoria);
            }

        }

        [HttpGet("[action]")]
        public IActionResult Available()
        {
            var availableProduct = product.availableProduct;
            return Ok(availableProduct);
        }

        [HttpGet("EditProduct/{id}")]
        public IActionResult EditProduct(int id)
        {
            var prod = product.products.FirstOrDefault(x => x.Id == id);
            return Ok(prod);
        }

        [HttpPut("SaveEditProduct/{id}")]
        public IActionResult SaveEditProduct(int id, [FromBody]Product product)
        {
            if (ModelState.IsValid)
            {
                this.product.SaveProduct(product);
                return Ok();
            }
            else
            {
                return BadRequest("OOps something went wrong! Keep calm, all will be ok!");
            }
        }

        [HttpDelete("DeleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            this.product.DeleteProduct(id);
            return Ok();
        }

        public static IEnumerable<Product> GetPhones(IEnumerable<Product> productsByCategory, IProductRepository product)
        {
            NameDeviceCategory = "Мобильные телефоны";
            return productsByCategory = product.products.Where(i => i.Category.categoryName.Equals(NameDeviceCategory, StringComparison.InvariantCultureIgnoreCase));
        }

        public static IEnumerable<Product> GetLaptop(IEnumerable<Product> productsByCategory, IProductRepository product)
        {
            NameDeviceCategory = "Ноутбуки";
            return productsByCategory = product.products.Where(i => i.Category.categoryName.Equals(NameDeviceCategory, StringComparison.InvariantCultureIgnoreCase));
        }

        public static IEnumerable<Product> GetTablets(IEnumerable<Product> productsByCategory, IProductRepository product)
        {
            NameDeviceCategory = "Планшеты";
            return productsByCategory = product.products.Where(i => i.Category.categoryName.Equals(NameDeviceCategory, StringComparison.InvariantCultureIgnoreCase));
        }

        public static IEnumerable<Product> GetProjectors(IEnumerable<Product> productsByCategory, IProductRepository product)
        {
            NameDeviceCategory = "Проекторы";
            return productsByCategory = product.products.Where(i => i.Category.categoryName.Equals(NameDeviceCategory, StringComparison.InvariantCultureIgnoreCase));
        }


    }
}
