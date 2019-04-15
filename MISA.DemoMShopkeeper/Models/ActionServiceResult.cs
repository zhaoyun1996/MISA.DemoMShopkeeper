using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.DemoMShopkeeper.Models
{
    /// <summary>
    /// Kết quả trả về của api
    /// </summary>
    /// Created by tdtung - 06/03/2019
    public class ActionServiceResult
    {
        private bool _success;
        private string _message;
        private object _data;

        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        /// Created by tdtung - 06/03/2019
        public object Data
        {
            get { return _data; }
            set { _data = value; }
        }
        /// <summary>
        /// Thông báo trả về
        /// </summary>
        /// Created by tdtung - 06/03/2019
        public string Message
        {
            get { return _message; }
            set { _message = value; }
        }
        /// <summary>
        /// Kết quả trả về thành công hay không
        /// </summary>
        /// Created by tdtung - 06/03/2019
        public bool Success
        {
            get { return _success; }
            set { _success = value; }
        }
    }
}
