using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Interfaces;
using Store.Models;

namespace Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IProductRepository product;
        private IEnumerable<Product> productsByCategoria = new List<Product>();
        private Dictionary<string, List<Product>> productDictionary = new Dictionary<string, List<Product>>();
        public SearchController(IProductRepository product)
        {
            this.product = product;
            foreach (var particularProduct in this.product.products)
            {
                if (this.productDictionary.ContainsKey(particularProduct.Name))
                {
                    this.productDictionary[particularProduct.Name].Add(particularProduct);
                }
                else
                {
                    this.productDictionary.Add(particularProduct.Name, new List<Product> { particularProduct });
                }
            }
        }

        [HttpGet("Index/{nameProduct}")]
        public IActionResult Index(string nameProduct)
        {
            if (string.IsNullOrEmpty(nameProduct))
            {
                productsByCategoria = product.products;
                return Ok(productsByCategoria);
            }

            var mostSimilarProducts = GetMostSimilarProducts(nameProduct);
            if (!mostSimilarProducts.Any())
            {
                productsByCategoria = product.products;
                return Ok(productsByCategoria);
            }

            List<Product> foundProducts = new List<Product>();
            foreach (var product in productDictionary)
            {
                foreach (var productName in mostSimilarProducts)
                {
                    if (productName == product.Key)
                    {
                        foreach (var prod in product.Value)
                        {
                            prod.Category.products = null;
                            foundProducts.Add(prod);
                        }
                    }
                }
            }

            return Ok(foundProducts);
        }

        private IEnumerable<string> GetMostSimilarProducts(string nameProduct)
        {
            List<string> list = productDictionary.Select(item => item.Key).ToList();
            var requestCommandSymbols = nameProduct.ToUpperInvariant();
            var productsIntersactions = list.Select(command => (command, command.ToUpperInvariant()))
                .Select(commandTuple => (commandTuple.command, commandTuple.Item2.Intersect(requestCommandSymbols).Count()));
            var max = productsIntersactions.Max(tuple => tuple.Item2);
            return max > 2 ? productsIntersactions.Where(tuple => tuple.Item2.Equals(max)).Select(tuple => tuple.command) : Enumerable.Empty<string>();
        }
    }
}
