class Customer {
    constructor() {
        this.getAll();
    }

    getAll() {
        $('.load-data-form').css('display', 'block');
        $.ajax({
            url: "/api/customer",
            method: 'get',
            async: false,
            success: function (res) {
                if (res && res.success) {
                    var data = res.data;
                    $.each(data, function (index, item) {
                        var i = index + 1;
                        if (i % 2 !== 0) {
                            if (i === 1) {
                                $('<tr>', { html: buidRowTable(item), id: item.CustomerID, class: "row-white checked" }).appendTo($('.table-tbody table'));

                            } else {
                                $('<tr>', { html: buidRowTable(item), id: item.CustomerID, class: "row-white" }).appendTo($('.table-tbody table'));
                            }
                        } else {
                            $('<tr>', { html: buidRowTable(item), id: item.CustomerID, class: "row-grey" }).appendTo($('.table-tbody table'));

                        }
                    });
                    //Đặt lại thuộc tính các cột
                    if ($(".customer-table-column-customerName").eq(0).width() < 250) {
                        $(".customer-table-column-customerName").eq(0).width(250);
                    }
                    $(".customer-table-column-customerName").eq(0).css('min-width', $(".customer-table-column-customerName").eq(0).css('width'));
                    $(".customer-table-column-customerName").css('width', $(".customer-table-column-customerName").eq(0).css('width'));
                    $(".customer-table-column-customerName").css('min-width', $(".customer-table-column-customerName").eq(0).css('min-width'));
                    //Ẩn nút loading

                    $('.load-data-form').hide(0);
                    //Hiển thị số phân trang
                    //$('#total-page').html(res.Data.TotalPage);
                    //var startPage = (page - 1) * count + 1;
                    //var endPage = page * count;
                    //if (endPage > res.Data.TotalRecord) {
                    //    endPage = res.Data.TotalRecord;
                    //}
                    //$('#start-list').html(startPage);
                    //$('#end-list').html(endPage);
                    //$('#total-record').html(res.Data.TotalRecord);
                    ////Đặt lại trạng thái nút chuyển trang
                    //customerJS.changeStatusBtnPanigate(page);
                    ////Xử lý khi bảng dữ liệu xuất hiện thanh cuộn
                    //customerJS.checkScroll();
                }
                else {
                    alert(res.Message);
                }
            }
        })
    }

    
}

var customerJS = new Customer();

function buidRowTable(item) {
    var html = '';
    html += '<td class="column-resizable customer-table-column-check">';
    html += '<label class="lb-checkbox">';
    html += '<input type="checkbox" class="check-one-row" />';
    html += '<span class="checkmark"></span>';
    html += '</label>';
    html += '</td>';
    html += '<td class="column-resizable customer-table-column-customerCode" filter="filterCustomerCode">' + item.customerCode + '</td>';
    html += '<td class="column-resizable customer-table-column-customerName" filter="filterCustomerName"><a href="">' + item.customerName + '</a></td>';
    html += '<td class="column-resizable customer-table-column-customerPhone" filter="filterCustomerPhone">' + item.phoneNumber + '</td>';
    html += '<td class="column-resizable customer-table-column-customerBirthday date" filter="filterCustomerBirthday">' + commonJS.formatDateToVN(item.birthday) + '</td>';
    html += '<td class="column-resizable customer-table-column-customerGroup" filter="filterCustomerGroup">' + item.customerGroupName + '</td>';
    html += '<td class="column-resizable customer-table-column-Note" filter="filterCustomerNote">' + item.note + '</td>';
    html += '<td class="column-resizable customer-table-column-customerStatus" filter="filterCustomerStatus">' + enumJS.enumStatusCustomer[item.status] + '</td>';
    return html;
}