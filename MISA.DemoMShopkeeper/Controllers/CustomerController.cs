using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.DemoMShopkeeper.Models;

namespace MISA.DemoMShopkeeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        List<Customer> customers = new List<Customer>()
        {
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
            new Customer(){CustomerID = Guid.NewGuid(), CustomerName="Vũ Văn Kiệt", CustomerCode="1402028", Email="vvkiet@gmail.com", PhoneNumber="01629335882", Address="Thái Bình", Birthday= new DateTime(), CreatedDate=new DateTime(), CustomerGroupCode="CGC0001", ModifiedDate=new DateTime(), Note="VN", Status=0},
        };
        [HttpGet]
        public ActionResult<List<Customer>> Get()
        {
            return Ok(new { Success = 1, Data = customers.ToList() });
        }
    }
}
