$(document).ready(function () {

    //Sự kiện nhấn nút chuyển trang
    //Created by tdtung (13-3-2019)
    $(document).on('click', '.btn-panigate.active', function () {
        var currentPage = parseInt($('.number-page').attr('value'));
        var numberResult = $('.number-result').val();
        var max = $('#total-page').text();
        var nextPage = 1;
        if ($(this).hasClass('btn-begin')) {
            nextPage = 1;

        }
        else if ($(this).hasClass('btn-preview')) {
            nextPage = currentPage - 1;
        }

        else if ($(this).hasClass('btn-next')) {
            
            nextPage = currentPage + 1;
        }

        else if ($(this).hasClass('btn-end')) {
            
            nextPage = max;
        }
        
        customerJS.showDataCustomer(numberResult, nextPage);
    });
  

    //Hiển thị menu chọn chức năng lọc
    customerJS.showSubMenuFilter();

    //Hiển thị dữ liệu trong bảng danh sách
    customerJS.showDataCustomer();

    //Tạo combobox
    commonJS.inputSelectChange('filterCustomerStatus', ['Tất cả', 'Đang theo dõi', 'Ngừng theo dõi']);

    //Nhập giá trị trong ô lọc dữ liệu
    //Created by tdtung (12/3/2019)
    $(document).on('keydown', '.input-filter input', function (e) {
        var page = parseInt($('.number-page').val());
        var numberResult = $('.number-result').val();
        switch (e.key) {
            case 'Enter':
                {
                    var condition = customerJS.getCondition();
                    customerJS.showDataCustomer(numberResult, page, condition);
                    break;
                }

            default:
        }
    });

    //Nhấn nút enter trong input nhập số trang
    //Created by tdtung (12/3/2019)
    $(document).on('keydown', '.number-page', function (e) {
        var currentPage = $(this).val();
        var max = $('#total-page').html();
        var page = parseInt($(this).val());
        var numberResult = $('.number-result').val();
        switch (e.key) {
            case 'Enter':
                {
                    if (page > max || page < 1) {
                        page = currentPage;
                    }
                    else {
                        $(this).val(page);
                        var condtiton = customerJS.getCondition();
                        customerJS.showDataCustomer(numberResult, page, condtiton);
                    }
                    break;
                }
            case 'ArrowUp': {

                if (page < max) {
                    page += 1;
                    $(this).val(page);
                }
                break;
            }
            case 'ArrowDown': {
                if (page > 1) {
                    page -= 1;
                    $(this).val(page);
                }
                break;
            }
            default:
        }
    });

    //Chức năng nút reload danh sách dữ liệu
    //Created by tdtung (12/3/2019)
    $(document).on('click', '.btn-reload', function () {
        customerJS.showDataCustomer();
    });

    ///Sự kiện nhấn bàn phím 
    //Di chuyển lựa chọn trong bảng dữ liệu
    //Created by tdtung (12/3/2019)
    $(window).keydown(function (e) {
        var row = $('tr.checked');
        if (row.is(':focus')) {

            if (e.key === 'ArrowDown') {
                if (row.next().length > 0) {
                    row.removeClass('checked');
                    row.next().addClass('checked');
                    row.next().focus();
                }
            }
            else if (e.key === 'ArrowUp') {
                if (row.prev().length > 0) {
                    row.removeClass('checked');
                    row.prev().addClass('checked');
                    row.prev().focus();
                }
            }
        }
    });

    
        //var w = $(".customer-table-column-customerName").eq(0).width();
    //$(window).resize(function () {
    //    if (customerJS.checkScroll()) {
    //        debugger;
    //        $('.table-thead').find('.column-scroll').css('display', 'block');
    //        //$('.customers-table').find('.customer-table-column-customerName').css('min-width', w - 17);
    //        //$('.customers-table').find('.customer-table-column-customerName').css('width', w - 17);
    //    }
    //    else {
    //        $('.table-thead').find('.column-scroll').css('display','none');
    //        //$('.customers-table').find('.customer-table-column-customerName').css('min-width', w);
    //        //$('.customers-table').find('.customer-table-column-customerName').css('width', w);
    //    }
    //});

    ///Sự kiện click vào nút check all
    //Created by tdtung (12/3/2019)
    $('.check-all').click(function () {
        if ($(this).prop('checked')) {
            $('.check-one-row').prop("checked", true);
            $('tr').addClass("active");
        }
        else {
            $('.check-one-row').prop("checked", false);
            $('tr').removeClass("active");
        }
        customerJS.checkDisableToolBar();
    });

    ///Thay đổi kích thước các cột trong bảng dữ liệu
    //Created by tdtung (12/3/2019)
    $(function () {
        commonJS.resizeColumn(".customer-table-column-check", 40);
        commonJS.resizeColumn(".customer-table-column-customerName", 250);
        commonJS.resizeColumn(".customer-table-column-customerCode", 120);
        commonJS.resizeColumn(".customer-table-column-customerPhone", 150);
        commonJS.resizeColumn(".customer-table-column-customerStatus", 150);
        commonJS.resizeColumn(".customer-table-column-Note", 180);
        commonJS.resizeColumn(".customer-table-column-customerBirthday", 160);
        commonJS.resizeColumn(".customer-table-column-customerGroup", 150);
    });

    //Sự kiện click vào hàng dữ liệu trong bảng
    //Created by tdtung (12/3/2019)
    $(document).on('click', '.table-tbody tr', function (e) {
        if (!$(this).find('.check-one-row').is(e.target)) {
            $('.table-tbody').find('tr').removeClass('checked');
            $(this).addClass('checked');
            //$('.btn-delete').addClass('btn-show-modal');
            //$('.btn-delete').removeClass('btn-disable');
            customerJS.checkDisableToolBar();
        }
    });

    //Sự kiện double click vào hàng dữ liệu trong bảng => hiển thị modal sửa
    //Created by tdtung (12/3/2019)
    $(document).on('dblclick', '.table-tbody tr', function (e) {
        if (!$(e.target).closest($('.customer-table-column-check')).length) {
            $('.modal-tool').addClass('modal-active');
            modalJS.showModalToolCustomer("3");
            $('.btn-cancel').click(function () {
                $('.modal-tool').removeClass('modal-active');
            });
        }
    });

    //Hiển thị toolbar khi click chuột phải vào dòng dữ liệu:
    //Created by tdtung (12/3/2019)
    $(document).on('contextmenu', '.table-tbody tr', function (e) {
        if (!$(this).find('.check-one-row').is(e.target)) {
            $('.table-tbody').find('tr').removeClass('checked');
            $(this).addClass('checked');
            $('.btn-delete').addClass('btn-show-modal');
            $('.btn-delete').removeClass('btn-disable');
        }
        e.preventDefault();
        customerJS.checkDisableToolBar();
        $('.toolbar-right-click').css('top', e.pageY - 12);
        $('.toolbar-right-click').css('left', e.pageX - 12);
        $('.toolbar-right-click').show();
    });

    //Chọn chức năng trong toolbar khi nhấn chuột phải:
    //Created by tdtung (12/3/2019)
    $(document).on('click', '.toolbar-row', function () {
        if (!$(this).hasClass('btn-disable')) {
            $('.toolbar-right-click').hide();
        }
    });

    //Khi click vào checkbox để chọn dòng dữ liệu:
    //Created by tdtung (12/3/2019)
    $(document).on('click', '.check-one-row', function () {
        if ($(this).prop('checked')) {
            customerJS.checkboxClick();
            $(this).parents('tr').addClass('active');
            $(this).parents('tr').addClass('checked');
        }
        else {
            $('.check-all').prop("checked", false);
            $(this).parents('tr').removeClass('active');
            $(this).parents('tr').removeClass('checked');
        }
        customerJS.checkDisableToolBar();
    });

    //Kiểm tra dữ liệu nhập
    commonJS.validateInput('filterCustomerBirthday', { 'isDate': 'Nhập ngày tháng năm đúng định dạng dd/mm/yyyy' }, true);
});

//Kiểm tra có xuất hiện scroll không
//Created by tdtung (12/3/2019)
(function ($) {
    $.fn.hasScrollBar = function () {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);

/// các hàm xử lý js trong trang khách hàng
//Created by tdtung (12/02/2019)
var customerJS = {

    //Sự kiện hiển thị menu chọn chức năng lọc
    //Created by tdtung (12/2/2019)
    showSubMenuFilter: function () {
        //Bấm vào nút chọn chức năng lọc
        $('.btn-filter').click(function () {
            //Lấy id trường mà cần thay đổi chức năng lọc
            var id = $(this).attr('id');
            //hiển thị menu lọc
            var html = "";
            if (id === 'filter-birthday') {
                html += '<div class="sub-filter-row"><span class="icon-filter">=</span> : Bằng</div>                     ';
                html += '    <div class="sub-filter-row"><span class="icon-filter"><</span> : Nhỏ hơn</div>              ';
                html += '        <div class="sub-filter-row"><span class="icon-filter">≤</span> : Nhỏ hơn hoặc bằng</div>';
                html += '        <div class="sub-filter-row"><span class="icon-filter">></span> : Lớn hơn</div>          ';
                html += '        <div class="sub-filter-row"><span class="icon-filter">≥</span> : Lớn hơn hoặc bằng</div>';
                $('.sub-filter-menu').html(html);
            } else {
                html += '<div class="sub-filter-row"><span class="icon-filter">*</span> : Chứa</div>             ';
                html += '    <div class="sub-filter-row"><span class="icon-filter">=</span> : Bằng</div>         ';
                html += '    <div class="sub-filter-row"><span class="icon-filter">+</span> : Bắt đầu bằng</div> ';
                html += '    <div class="sub-filter-row"><span class="icon-filter">-</span> : Kết thúc bằng</div>';
                html += '    <div class="sub-filter-row"><span class="icon-filter">!</span> : Không chứa</div>   ';
                $('.sub-filter-menu').html(html);
            }
            //Đặt vị trí xuất hiện menu chọn chức năng lọc
            $('.sub-filter-menu').attr('parent', id);
            var position = $(this).offset();
            $('.sub-filter-menu').css('top', parseInt(position.top) + 35);
            $('.sub-filter-menu').css('left', parseInt(position.left));
            $('.sub-filter-menu').toggle();
            //Sự kiện khi chọn chức năng lọc trong danh sách
            commonJS.selectFilterRow();
        });
    },

    //Kiểm tra chọn 2 checkbox sẽ ẩn chức năng sửa và nhân đôi
    //Created by tdtung (12/2/2019)
    checkDisableToolBar: function () {
        //Nếu không có dòng nào được chọn thì ẩn nút xóa, sửa, nhân đôi
        if ($('tr.checked').length === 0 && $('tr.active').length === 0) {
            $('.btn-edit').removeClass('btn-show-modal');
            $('.btn-edit').addClass('btn-disable');
            $('.btn-duplicate').removeClass('btn-show-modal');
            $('.btn-duplicate').addClass('btn-disable');
            $('.btn-delete').removeClass('btn-show-modal');
            $('.btn-delete').addClass('btn-disable');
        }
        else {
            $('.btn-delete').addClass('btn-show-modal');
            $('.btn-delete').removeClass('btn-disable');
            $('.btn-edit').addClass('btn-show-modal');
            $('.btn-edit').removeClass('btn-disable');
            $('.btn-duplicate').addClass('btn-show-modal');
            $('.btn-duplicate').removeClass('btn-disable');
            //Nếu chọn trên 2 dòng thì ẩn nút sửa và nhân đôi
            if ($('tr.active').length > 1) {
                $('.btn-edit').removeClass('btn-show-modal');
                $('.btn-edit').addClass('btn-disable');
                $('.btn-duplicate').removeClass('btn-show-modal');
                $('.btn-duplicate').addClass('btn-disable');
            }
        }
    },

    ///Hàm hiển thị dữ liệu vào table
    //Created by tdtung (12/2/2019)
    showDataCustomer: function (count, page, customerCondition) {
        customerService.loadData(count, page, customerCondition);
    },

    //Kiểm tra bảng dữ liệu có thanh cuộn hay không
    //Created by tdtung (12/2/2019)
    checkScroll: function (w) {
        var check = false;
        //Kiểm tra có xuất hiện thanh cuộn trong bảng dữ liệu không
        if ($('.table-tbody').hasScrollBar()) {
            check = true;
        }
        //Xử lý nếu có thanh cuộn ở bảng danh sách
        if (check) {
            $('.table-thead').find('.column-scroll').css('display','block');
            //$('.customers-table').find('.customer-table-column-customerName').css('min-width', w - 17);
            //$('.customers-table').find('.customer-table-column-customerName').css('width', w - 17);
        }
        else {
            $('.table-thead').find('.column-scroll').css('display', 'none');
            //$('.customers-table').find('.customer-table-column-customerName').css('min-width', w);
            //$('.customers-table').find('.customer-table-column-customerName').css('width', w);
        }
    },

    //Kiểm tra checkbox all
    //Created by tdtung (12/2/2019)
    checkboxClick: function () {
        var check = true;
        //Kiểm tra xem có check box nào không được chọn không
        $('.check-one-row').each(function () {
            if (!$(this).prop('checked')) {
                check = false;
            }
        });
        //Nếu các checkbox đều đã được chọn thì tự động chọn nút checkbox all
        if (check) {
            $('.check-all').prop("checked", true);
        }
        //Nếu có ít nhất 1 checkbox không được chọn thì tự động bỏ chọn nút check all
        else {
            $('.check-all').prop("checked", false);
        }
    },

    //Hiển thị trạng thái ứng với giá trị trong DB
    //Created by tdtung (12/3/2019)
    showStatus: function (status) {
        switch (status) {
            case 1:
                return enumJS.enumStatusCustomer[status];
            case 0:
                return enumJS.enumStatusCustomer[0];
            default:
        }
    },

    //Lấy điều kiện lọc dữ liệu
    //Created by tdtung (12/3/2019)
    getCondition: function () {
        //Lấy dữ liệu filter
        var filterCondition = "{";
        $('.input-filter input').each(function (index, item) {
            filterCondition += "'" + $(this).attr('field') + "' : '" + $(this).val() + "'";
            if ($('.input-filter input').eq(index + 1).length !== 0) {
                filterCondition += ' , ';
            }
        });
        filterCondition += ' }';
        eval('var customerCondition = ' + filterCondition);
        return customerCondition;
    },

    //Chức năng sửa nhân viên
    //Created by tdtung (12/3/2019)
    updateCustomer: function () {
        var status = '1';
        //if (true) {

        //}
        var modal = $('.btn-save').parents('.MISA-modal-box');
        var customerID = $('.btn-save').parents('.MISA-modal-box').find('input[name="CustomerID"]').attr('value');

        var customerName = $('input[name="CustomerName"]').val();
        var email = $('input[name="Email"]').val();
        var phoneNumber = $('input[name="PhoneNumber"]').val();
        var birthday = $('input[name="Birthday"]').val();
        var address = $('input[name="Address"]').val();
        var note = $('textarea[name="note"]').val();
        var customerGroupCode = $('input[name="CustomerGroup"]').attr('value');
        var identifyCard = $('input[name="IdentifyCard"]').val();
        var companyName = $('input[name="CompanyName"]').val();
        var TaxCode = $('input[name="TaxCode"]').val();
        var oCustomer = {
            CustomerName: customerName,
            Email: email,
            PhoneNumber: phoneNumber,
            Birthday: commonJS.formatDateVN(birthday),
            Address: address,
            Note: note,
            Status: status,
            CustomerGroupCode: customerGroupCode,
            IdentifyCard: identifyCard,
            TaxCode: TaxCode,
            CompanyName: companyName
        }
        debugger
        $.ajax({
            url: '/api/CustomerAPI?customerID=' + customerID,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(oCustomer),
            async: false,
            success: function (res) {
                
                alert(res.Message);
                $('.MISA-modal').remove();
            },
            fail: function (res) {
                alert(res.Message);
            },
            erro: function (res) {
                alert(res.Message);
            }

        })
    },

    //THêm mới khách hàng
    //Created by TDTUNG (13/03/2019)
    addCustomer: function () {
        var status = '1';
        var modal = $('.btn-save').parents('.MISA-modal-box[action-modal="1"]');
        var inputs = modal.find('input');
        var JsonCustomer = '{ ';
        inputs.each(function (index,item) {
            var key = $(this).attr('name');
            var value;
            if (key === "CustomerGroupName") {
                key = "CustomerGroupID";
                value = $(this).attr('value');
            } else {
                value = $(this).val();
            }
            if (value === undefined) {
                value = '';
            }
            JsonCustomer += '"' + key + '" : "' + value+'"';
            if (index < inputs.length - 1) {
                JsonCustomer += ' , ';
            }
            
        });
        JsonCustomer += '} ';
        var oCustomer = JSON.parse(JsonCustomer);
        //debugger;
        //var customerCode = $('input[name="CustomerCode"]').val();
        //var customerName = $('input[name="CustomerName"]').val();
        //var email = $('input[name="Email"]').val();
        //var phoneNumber = $('input[name="PhoneNumber"]').val();
        //var birthday = $('input[name="Birthday"]').val();
        //var address = $('input[name="Address"]').val();
        //var note = $('textarea[name="note"]').val();
        //var customerGroupCode = $('input[name="CustomerGroup"]').attr('value');
        //var identifyCard = $('input[name="IdentifyCard"]').val();
        //var companyName = $('input[name="CompanyName"]').val();
        //var TaxCode = $('input[name="TaxCode"]').val();
        //var Customer = {
        //    CustomerCode: customerCode,
        //    CustomerName: customerName,
        //    Email: email,
        //    PhoneNumber: phoneNumber,
        //    Birthday: commonJS.formatDateVN(birthday),
        //    Address: address,
        //    Note: note,
        //    Status: status,
        //    CustomerGroupCode: customerGroupCode,
        //    IdentifyCard: identifyCard,
        //    TaxCode: TaxCode,
        //    CompanyName: companyName
        //}
        //debugger
        $.ajax({
            url: '/api/customer/add',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(oCustomer),
            async: false,
            success: function (res) {
                alert(res.Message);
                $('.MISA-modal').remove();
            },
            fail: function (res) {
                alert(res.Message);
            },
            erro: function (res) {
                alert(res.Message);
            }

        })
    },
    //thay đổi trạng thái nút phân trang
    //Created by tdtung (13/3/2019)
    changeStatusBtnPanigate: function (currentPage) {
        $('.number-page').attr('value', currentPage);

        var max = $('#total-page').text();
        
        if (currentPage < max) {
            $('.btn-next,.btn-end').addClass('active');
        }
        else {
            $('.btn-next,.btn-end').removeClass('active');
        }

        if (currentPage > 1) {
            $('.btn-preview,.btn-begin').addClass('active');
        }
        else {
            $('.btn-preview,.btn-begin').removeClass('active');
        }
    }
};
