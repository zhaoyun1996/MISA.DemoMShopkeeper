var customerService = {
    uri: "/api/customer/",
    buidRowTable: function (item) {
        var html = '';
        html += '<td class="column-resizable customer-table-column-check">';
        html += '<label class="lb-checkbox">';
        html += '<input type="checkbox" class="check-one-row" />';
        html += '<span class="checkmark"></span>';
        html += '</label>';
        html += '</td>';
        html += '<td class="column-resizable customer-table-column-customerCode" filter="filterCustomerCode">' + item.CustomerCode + '</td>';
        html += '<td class="column-resizable customer-table-column-customerName" filter="filterCustomerName"><a href="">' + item.CustomerName + '</a></td>';
        html += '<td class="column-resizable customer-table-column-customerPhone" filter="filterCustomerPhone">' + item.PhoneNumber + '</td>';
        html += '<td class="column-resizable customer-table-column-customerBirthday date" filter="filterCustomerBirthday">' + commonJS.formatDateToVN(item.Birthday) + '</td>';
        html += '<td class="column-resizable customer-table-column-customerGroup" filter="filterCustomerGroup">' + item.CustomerGroupName + '</td>';
        html += '<td class="column-resizable customer-table-column-Note" filter="filterCustomerNote">' + item.Note + '</td>';
        html += '<td class="column-resizable customer-table-column-customerStatus" filter="filterCustomerStatus">' + enumJS.enumStatusCustomer[item.Status] + '</td>';
        return html;
    },
    loadData: function (count, page, condition) {
        if (!count) {
            count = 50;
        }
        if (!page) {
            page = 1;
        }
        $('.load-data-form').show(0);
        var table = "";
        $('.table-tbody').find('table').html('');
        setTimeout(function () {
            $.ajax({
                //url: customerService.uri + 'data/' + page + '/' + count,
                url: customerService.uri + 'data/' + page + '/' + count,
                method: 'post',
                data: JSON.stringify(condition),
                async: false,
                success: function (res) {
                    if (res && res.Success) {
                        var data = res.Data.Data;
                        $.each(data, function (index, item) {
                            var i = index + 1;
                            if (i % 2 !== 0) {
                                if (i === 1) {
                                    $('<tr>', { html: customerService.buidRowTable(item), id: item.CustomerID, class: "row-white checked" }).appendTo($('.table-tbody table'));

                                } else {
                                    $('<tr>', { html: customerService.buidRowTable(item), id: item.CustomerID, class: "row-white" }).appendTo($('.table-tbody table'));
                                }
                            } else {
                                $('<tr>', { html: customerService.buidRowTable(item), id: item.CustomerID, class: "row-grey" }).appendTo($('.table-tbody table'));

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
                        $('#total-page').html(res.Data.TotalPage);
                        var startPage = (page - 1) * count + 1;
                        var endPage = page * count;
                        if (endPage > res.Data.TotalRecord) {
                            endPage = res.Data.TotalRecord;
                        }
                        $('#start-list').html(startPage);
                        $('#end-list').html(endPage);
                        $('#total-record').html(res.Data.TotalRecord);
                        //Đặt lại trạng thái nút chuyển trang
                        customerJS.changeStatusBtnPanigate(page);
                        //Xử lý khi bảng dữ liệu xuất hiện thanh cuộn
                        customerJS.checkScroll();
                    }
                    else {
                        alert(res.Message);
                    }
                }
            })
        }, 500);
    },
    getDataByID: function (customerID) {
        var uri = customerService.uri + 'data/' + customerID;
        ajaxService.get(uri, function (res) {
            if (res && res.Success) {
                var data = res.Data;
                //Lấy mảng key của data
                var arrKeyData = Object.keys(data);
                //Duyệt mảng
                for (var i = 0; i < arrKeyData.length; i++) {
                    //Kiểm tra input có name = giá trị mảng có tồn tại không và giá trị data[key] có != null không
                    if ($('input[name="' + arrKeyData[i] + '"]') !== undefined && data[arrKeyData[i]] !== null) {
                        var value = data[arrKeyData[i]];
                        //Nếu là ngày sinh format lại theo định dạng dd/mm/yyyy
                        if (arrKeyData[i] === "Birthday") {
                            value = commonJS.formatDateToVN(value);
                        }
                        //Đưa giá trị của data với key tương ứng vào input
                        $('input[name="' + arrKeyData[i] + '"]').attr('value', value);
                    }
                }
                $('input[name="CustomerGroupName"]').attr('id', data.CustomerGroupID);
                $('.MISA-modal-content').append('<input type="hidden" name="CustomerID" id="' + customerID + '"/>')
            }
            else {
                alert(res.Message);
            }
        });
    }

}