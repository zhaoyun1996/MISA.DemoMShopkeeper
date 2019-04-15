///Created by tdtung (12/02/2019)
$(document).ready(function () {
    //Kéo thanh cuộn thân bảng thì header bảng cuộn theo
    //Created by tdtung (12/02/2019)
    $(".table-tbody").on('scroll', function () {
        var x = $(".table-tbody").scrollLeft();
        $('.table-thead').scrollLeft(x);
    });

    //Kích hoạt tạo sub menu chọn ngày tháng
    commonJS.selectDate();

    //Kích hoạt sự kiện hover vào select box
    commonJS.eventMouseSelectRow();

    //Di chuyển modal
    //Created by tdtung (12/02/2019)
    $(function () {
        $(".MISA-modal-box").draggable({
            handle: ".MISA-modal-header",
            containment: ".modal-active.MISA-modal"
        });
    });

    //click slidebar và dropmenu (có class sup-menu)
    commonJS.selectMemu();

    //Nhấn ra ngoài submenu thì ẩn submenu đi
    //Created by tdtung (12/02/2019)
    $(document).click(function (e) {
        $('.e-click-out').each(function () {
            var parent = $(this).attr('parent');
            if (!$(e.target).closest(this).length && !$(e.target).closest('#' + parent).length) {
                $(this).hide();
            }
        });
    });

    //Format tiền tệ nếu input có class 'inputMoney'
    //Created by tdtung (12/03/2019)
    $(document).on('keyup', '.inputMoney', function (e) {
        var val = $(this).val().trim().split(/\./).join('');
        while (/(\d+)(\d{3})/.test(val)) {
            
            val = val.replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
        }
        $(this).val(val);
    })
    //Sự kiện nhập giá trị vào ô tiền tệ bắt buộc nhập số và có ít hơn 12 kí tự
    //Created by tdtung (12/03/2019)
    $(document).on('keypress', '.inputMoney', function (e) {
        var val = $(this).val().trim().split(/\./).join('');
        if ((val.length < 11) && (e.keyCode > 47) && (e.keyCode < 58)) {
            return true;
        }
        else {
            return false;
        }
    })
});

//Các hàm xử lý sự kiện chung trong các giao diện
//Created by tdtung (12/02/2019)
var commonJS = {
    //Sự kiện chọn giá trị filter
    //Created by tdtung (12/2/2019)
    selectFilterRow: function () {
        $('.sub-filter-row').click(function () {
            //Lấy icon chức năng lọc
            var icon = $(this).children('.icon-filter').html();
            var id = $(this).parent().attr('parent');
            //Hiển thị icon lên nút lọc
            $('#' + id).html(icon);
            //Ẩn menu chọn chức năng lọc
            $(this).parent().hide();
        });
    },

    //Sự kiện chọn giá trị trong combobox sẽ đưa vào input
    //Created by tdtung (20/2/2019)
    selectSubMenuRow: function () {
        $(document).on('click', '.sub-menu-row', function () {
            var value = $(this).html();
            $(this).parents('.select-sub-menu').siblings('input').val(value);
            $(this).parents('.select-sub-menu').hide();
        });
    },

    // Hiển thị lịch chọn ngày tháng năm cho các ô nhập ngày tháng năm:
    //Created by tdtung (12/02/2019)
    selectDate: function () {
        $(document).on('click', '.icon-select-date', function () {
            //Lấy input sử dụng datepicker
            var parent = $(this).attr('parent');
            //Cấu hình lại datepicker
            $('input[name="' + parent + '"]').datepicker(
                {
                    dateFormat: "dd/mm/yy",
                    dayNamesMin: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                    dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
                    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    monthNamesMin: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                    onSelect: function () {
                        $(this).focus();
                    }
                }
            );
            //Kiểm tra ẩn hiện của datepicker
            if ($('.ui-datepicker').css('display') === 'none') {
                $('input[name="' + parent + '"]').datepicker('show');
            }
            else {
                //Hủy datepicker
                $('input[name="' + parent + '"]').datepicker("destroy");
            }
        });
    },

    //Ẩn/hiện menu-dropdown khi nhấn vào nút có class 'sup-menu'
    //Created by tdtung (12/02/2019)
    selectMemu: function () {
        $(document).on('click', '.sup-menu', function () {

            //Nếu là sup-menu ở slidebar
            if ($(this).hasClass('slidebar-row')) {
                $('.slidebar-row').removeClass('active');
                $(this).addClass('active');
            }
            //Ở các vị trí khác tìm đến sub-menu theo id của sup-menu
            var name = $(this).attr('id');
            $('.sub-menu[parent="' + name + '"]').toggle();
            //Nếu là select box thì focus vào ô input của select đó
            if ($(this).hasClass('select-menu')) {
                name = $(this).attr('id');
                $(this).siblings('input[name="' + name + '"]').focus();
            }
        });
    },

    //Hàm kiểm tra tính hợp lệ của ngày tháng năm (dd/mm/yyyy) nhập vào:
    //inputDate: chuỗi ngày tháng năm cần kiểm tra
    //Created by tdtung (13/02/2019)
    checkDate: function (inputDate) {
        //Nếu không nhập ngày tháng năm thì không kiểm tra
        if (inputDate === '') {
            return true;
        }
        //Tách lấy ngày tháng năm
        var comp = inputDate.split('/');
        var d = parseInt(comp[0], 10);
        var m = parseInt(comp[1], 10);
        var y = parseInt(comp[2], 10);
        var date = new Date(y, m - 1, d);
        //Kiểm tra có hợp lệ không
        if (date.getFullYear() === y && date.getMonth() + 1 === m && date.getDate() === d) {
            return true;
        }
        return false;
    },

    //Hàm kiểm tra tính hợp lệ của dữ liệu nhập vào. Nếu lỗi in ra thông báo lỗi đầu tiên tìm được:
    //inputName: ô text nhập dữ liệu cần kiểm tra
    //conditions: danh sách các điều kiện cần kiểm tra
    //onlyFocus: =1: nếu chỉ xuất hiện border màu đỏ khi lỗi.
    //           =0: hiển thị border và icon lỗi
    //Created by: tdtung (13/02/2019)
    validateInput: function (inputName, conditions, onlyFocus) {
        var input = $('input[name="' + inputName + '"]');
        if (!onlyFocus) {
            input.parent().append('<div class="btn-error" parent="' + inputName + '"><div class="icon-error"></div></div>');
        }
        //Sự kiện nhấn ra ngoài input được focus
        input.blur(function () {
            //Biến check kiểm tra có lỗi hay không.
            var check = false;
            //Ẩn đi lỗi
            $('.btn-error[parent="' + inputName + '"]').hide();
            input.removeClass('input-error');
            input.siblings().removeClass('input-error');
            //Duyệt các điều kiện cần kiểm tra
            $.each(conditions, function (index, item) {
                //Định nghĩa các lỗi cần kiểm tra
                var thisRegex;
                if (!check) {
                    switch (index) {
                        case "required": {
                            if (input.val() === "") {
                                check = true;
                            }
                            break;
                        }
                        case "isDate": {
                            if (!commonJS.checkDate(input.val())) {
                                check = true;
                            }
                            break;
                        }
                        case "phoneNumber": {
                            //Kiểm tra số điện thoại việt nam
                            thisRegex = /((\+84|0)+([0-9]{9}))$/g;
                            if (input.val() !== "") {
                                if (!thisRegex.exec(input.val())) {
                                    check = true;
                                }
                            }
                            break;
                        }
                        case "email": {
                            thisRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/g;
                            if (input.val() !== "") {
                                if (!thisRegex.exec(input.val())) {
                                    check = true;
                                }
                            }
                            break;
                        }
                    }
                    //Nếu phát hiện có lỗi. thông báo ngay lỗi vừa tìm được và thoát vòng lặp.
                    if (check) {
                        if (!onlyFocus) {
                            $('.btn-error[parent="' + inputName + '"]').show();
                            $('.btn-error[parent="' + inputName + '"]').attr('title', item);
                        }
                        else {
                            input.attr('title', item);
                        }
                        input.addClass('input-error');
                        input.siblings().addClass('input-error');

                    }
                }
                else {
                    return 1;
                }
            });
        });
    },

    //Tạo combobox cho input
    //<param>supMenuID: name của input cần tạo combobox</param>
    //<param>data: giá trị trong combobox </param>
    //<param>key: giá trị input nhập để lọc dữ liệu combobox </param>
    //Created by tdtung (20/2/2019)
    buildSubMenu: function (supMenuID, data, key) {
        //Lấy width của box select
        var width = $('#' + supMenuID).parent().width();
        var position = $('#' + supMenuID).parent().offset();

        //Xóa menu cũ
        $('#' + supMenuID).siblings('.select-sub-menu').remove();
        //Tạo menu mới
        var subMenu = $('<div class="sub-menu-dropdown select-sub-menu e-click-out sub-menu" parent="' + supMenuID + '" style="display: none; top: ' + (position.top + 37) + 'px; left: ' + position.left + 'px ; width:' + width + 'px"></div>');
        $('#' + supMenuID).parent().append(subMenu);
        ul = $('<ul type="none"></ul>');
        $.each(data, function (index, item) {
            string = item.toLowerCase().trim();
            if (key === null) {
                key = '';
            }
            key = key.toLowerCase().trim();
            if ((string.indexOf(key) !== -1) || (key === '')) {
                ul.append('<li class="sub-menu-row" tabindex="1">' + item + '</li>');
            }
        });
        subMenu.append(ul);
    },

    //Dựng combobox
    //<param>supMenuID: name của input cần tạo combobox. </param>
    //<param>data: mảng giá trị của combobox </param>
    //Created by tdtung 20/2/2019
    inputSelectChange: function (supMenuID, data) {
        commonJS.buildSubMenu(supMenuID, data);
        //Sự kiện khi nhập giá trị vào ô input => Hiển thị box gợi ý kết quả
        var selectBox = $('.show-select-box[name="' + supMenuID + '"]');
        selectBox.keyup(function (e) {
            var key = $(this).val();
            if ((e.key !== 'ArrowDown') && (e.key !== 'ArrowUp') && (e.key !== 'Tab') && (e.key !== 'Enter') && (e.key !== 'Escape')) {
                commonJS.buildSubMenu(supMenuID, data, key);
                $(this).siblings('.select-sub-menu').find('li').eq(0).addClass('checked');
                $(this).siblings('.select-sub-menu').show();
            }
        });
        //Nhập liệu không hợp lệ sẽ xóa
        selectBox.blur(function () {
            if ($(this).siblings('.select-sub-menu').find('li.checked').length === 0) {
                $(this).val('');
            }
            else {
                $(this).val($(this).siblings('.select-sub-menu').find('li.checked').html());
            }
        });

        //Sự kiện nhấn enter hoặc tab để chọn giá trị gợi ý
        selectBox.keydown(function (e) {
            //Chọn ra giá trị trong combobox đang được gợi ý
            var row = $(this).siblings('.select-sub-menu').find('li.checked');
            switch (e.key) {
                case 'ArrowDown': {
                    e.preventDefault();
                    $(this).siblings('.select-sub-menu').show();
                    if (row.next().length > 0) {
                        row.removeClass('checked');
                        row.next().addClass('checked');
                    } else {
                        //Nếu cuối danh sách đưa về đầu về danh sachs
                        row.removeClass('checked');
                        $(this).siblings('.select-sub-menu').find('li').eq(0).addClass('checked');
                    }
                    break;
                }
                case 'ArrowUp': {
                    e.preventDefault();
                    $(this).siblings('.select-sub-menu').show();
                    if (row.prev().length > 0) {
                        row.removeClass('checked');
                        row.prev().addClass('checked');
                    }
                    else {
                        //Nếu ở đầu danh sách thì đưa về cuối danh sách
                        row.removeClass('checked');
                        var li = $(this).siblings('.select-sub-menu').find('li');
                        li.eq(li.length - 1).addClass('checked');
                    }
                    break;
                }
                case 'Enter':
                case 'Tab':
                    {
                        //Nếu dự liệu không hợp lệ. xóa trắng input
                        var value = row.html();
                        if (value === undefined) {
                            value = '';
                        }
                        $(this).val(value);
                        $(this).parent().find('.select-sub-menu').hide();
                        break;
                    }
                case 'Escape': {
                    $(this).val('');
                    $(this).parent().find('.select-sub-menu').hide();
                }
            }
        });
    },

    //Sự kiện hover vào dòng trong select box đặt class chọn vào row đó
    //Created by tdtung (16/2/2019)
    eventMouseSelectRow: function () {
        //Sự kiện hover vào dòng thì chọn dòng đó.
        var subMenuRow = $('.show-select-box').parent().find('.sub-menu-row');
        $(document).on('mousemove', this, function () {
            //
            $('.sub-menu-row').removeClass('checked');
            $(this).addClass('checked');
        });
        //Kích hoạt sự kiện chọn giá trị trong ô lựa chọn
        commonJS.selectSubMenuRow();
    },

    ///Thay đổi kích thước các cột dữ liệu cùng tên với nhau
    //Created by tdtung (12/2/2019)
    resizeColumn: function (column, minWidth) {
        $(column).eq(0).resizable({
            handles: 'e',
            minWidth: minWidth,
            alsoResize: column,
            resize: function (event, ui) {
                //Khi thay đổi kích thước thì đặt lại width và min-width các đối tượng(cột) có cùng class
                $(column).css('min-width', ui.size.width);
                $(column).css('width', ui.size.width);
                $(this).css('height', 65);
            }
        });
    },

    //Hiển thị lại ngày tháng năm (dd/mm/yyyy) lấy từ cơ sở dữ liệu
    //Created by tdtung (29/2/2019)
    formatDateToVN: function (dateInput) {
        var day = new Date(dateInput);
        var date = day.getDate();
        if (date < 10) {
            date = '0' + date;
        }
        var month = day.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        return date + '/' + month + '/' + day.getFullYear();
    },

    //Chuyển ngày tháng năm từ dd/mm/yyyy thành mm/dd/yyyy
    //Created by tdtung (12/02/2019)
    formatDateVN: function (dateInput) {
        var date = dateInput.split('/');
        return date[1] + '/' + date[0] + '/' + date[2];
    }
};
