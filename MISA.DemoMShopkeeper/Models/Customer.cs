using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.DemoMShopkeeper.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    //using System.Data.Entity.Spatial;

    //[Table("Customer")]
    public partial class Customer
    {
        public Guid CustomerID { get; set; }

        [Required]
        [StringLength(20)]
        public string CustomerCode { get; set; }

        [Required]
        [StringLength(100)]
        public string CustomerName { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        [StringLength(50)]
        public string PhoneNumber { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Birthday { get; set; }

        [StringLength(255)]
        public string Address { get; set; }

        [StringLength(255)]
        public string Note { get; set; }

        public byte? Status { get; set; }

        //[StringLength(20)]
        //public string IdentifyCard { get; set; }

        //[StringLength(255)]
        //public string CompanyName { get; set; }

        //[StringLength(20)]
        //public string TaxCode { get; set; }

        [StringLength(20)]
        public string CustomerGroupCode { get; set; }

        public DateTime CreatedDate { get; set; }

        //public Guid? CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        //public Guid? ModifiedBy { get; set; }
    }
}
