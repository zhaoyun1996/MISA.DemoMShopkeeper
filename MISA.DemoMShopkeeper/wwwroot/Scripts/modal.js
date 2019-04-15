$(document).ready(function () {
    //Click nút lưu
    //Created by tdtung (12/02/2019)
    $(document).on('click', '.btn-save', function () {
        debugger;
        var action = parseInt($(this).parents('.modal-tool-customer').attr('action-modal'));

        switch (action) {
            case enumJS.enumActionModalTool.Add: {
                customerJS.addCustomer();
                break;
            }
            case enumJS.enumActionModalTool.Edit: {
                customerJS.updateCustomer();
                break;
            }
            default:
        }

    });

    //Thay đổi kích thước màn hình đặt lại vị trí xuất hiện modal
    //Created by tdtung (12/02/2019)
    $(window).resize(function () {
        modalJS.setPositionModal();
    });

    //Nhấn nút đóng, hủy bỏ trong modal
    //Created by tdtung (12/02/2019)
    $(document).on('click', '.btn-close,.btn-cancel', function () {
        if (!$(this).hasClass('btn-show-modal')) {
            $(this).parents('.MISA-modal').remove();
        }
    });

    //Nhấn nút không lưu trong modal
    //Created by tdtung (12/02/2019)
    $(document).on('click', '.btn-not-save', function () {
        var parent = $(this).attr('parent');
        $('.MISA-modal.' + parent).remove();
        $(this).parents('.MISA-modal').remove();
    });

    //Nhấn nút full screen
    //Created by tdtung (12/03/2019)
    $(document).on('click', '.btn-full-screen', function () {
        var parent = $(this).attr('parent');
        if (!$(this).hasClass('isFull')) {
            $('.' + parent).addClass('full-screen');
            $(this).addClass('isFull');
        } else {
            $('.' + parent).removeClass('full-screen');
            $(this).removeClass('isFull');
        }
    })

    //Hiển thị modal khi click vào nút có class 'btn-show-modal'
    //Created by tdtung (12/02/2019)
    $(document).on('click', '.btn-show-modal', function () {
        if ($(this).hasClass('btn-show-modal')) {
            var typeModal = parseInt($(this).attr('type-modal'));
            var action;
            switch (typeModal) {
                //Modal hiển thị thông tin
                case enumJS.enumTypeModal.Notify: {
                    var id = $(this).attr('id');
                    modalJS.showModalNotification(id);
                    break;
                }
                //Hiển thị chức năng bảng khách hàng
                case enumJS.enumTypeModal.Tool: {
                    action = $(this).attr('action-modal');
                    modalJS.showModalToolCustomer(parseInt(action));
                    break;
                }
                //Modal cảnh báo
                case enumJS.enumTypeModal.Message: {
                    var parent = $(this).attr('parent');
                    action = $(this).attr('action-modal');
                    var type = $(this).attr('type-icon-modal');
                    modalJS.showModalMessageBox(parseInt(type), parseInt(action), parent);
                    break;
                }
                //Modal thêm nhanh
                case enumJS.enumTypeModal.AddQuick: {
                    modalJS.showModalAddQuick();
                    break;
                }
                default:
            }
            modalJS.setPositionModal();
        }
    });
});

//Các hàm xử lý sự kiện với modal
//Created by tdtung (12/02/2019)
var modalJS = {
    //Tạo ra cấu trúc modal chung
    //Created by tdtung (12/02/2019)
    buidModalCommon: function (typeModal) {
        var html = '';

        html += '<div class="MISA-modal ui-widget-content">';
        html += '    <div class="MISA-modal-box">                                ';
        html += '        <div class="MISA-modal-header">                         ';
        html += '            <div class="MISA-modal-title modal-box-title"></div>';
        html += '            <div class="btn-close btn-show-modal btn-message-box" type-icon-modal="2" action-modal="2" type-modal="3">                             ';
        html += '                <div class="icon-close"></div>                  ';
        html += '            </div>                                              ';
        html += '        </div>                                                  ';
        html += '        <div class="MISA-modal-content">      ';
        html += '        </div>                                                  ';
        html += '        <div class="MISA-modal-footer">        ';
        html += '            <div class="footer-content">                        ';

        html += '            </div>                                              ';
        html += '        </div>                                                  ';
        html += '    </div>                                                      ';
        html += '</div>                                                          ';
        var modal = $(html);
        switch (typeModal) {

            case enumJS.enumTypeModal.Tool: {
                //Modal tool
                modal.addClass('modal-tool');
                modal.addClass('modal-active');
                break;
            }
            case enumJS.enumTypeModal.Message: {
                //Modal cảnh báo
                modal.addClass('modal-message');
                modal.addClass('modal-active');

                modal.find('.MISA-modal-box').addClass('modal-message-box');
                modal.find('.MISA-modal-content').append('<div class="d-flex"><div class="message-box-icon"></div><div class="message-box-content"></div></div>');
                break;
            }
            case enumJS.enumTypeModal.Notify: {
                //Modal thêm mới nhanh
                modal.addClass('modal-notification');
                modal.addClass('modal-active');

                modal.find('.MISA-modal-box').addClass('modal-notification');
                break;
            }
            case enumJS.enumTypeModal.AddQuick: {
                //Modal thêm mới nhanh
                modal.addClass('modal-add-quick');

                modal.find('.MISA-modal-box').addClass('modal-add-quick-customer-group');
                break;
            }
            default:
        }

        $('body').append(modal);
        //Di chuyển modal
        $(function () {
            $(".MISA-modal-box").draggable({
                handle: ".MISA-modal-header",
                containment: ".modal-active.MISA-modal"
            });
        });
    },

    //Hàm hiển thị modal nếu là modal tin tức
    //Created by tdtung (12/02/2019)
    showModalNotification: function (id) {
        modalJS.buidModalCommon(enumJS.enumTypeModal.Notify);
        var title = $('#' + id).find('.title').html();
        $('.modal-notification').find('.modal-box-title').html(title);
        $('.modal-notification').find('.MISA-modal-content').html(title);
        var btn = "";
        btn += '<div class="MISA-btn btn-close">';
        btn += ' <div class="icon icon-close icon-close-white"></div><div class="content-button">Đóng</div>';
        btn += '</div>';
        $('.modal-notification').find('.footer-content').html(btn);
    },

    //Hàm hiển thị modal thêm nhanh
    //Created by tdtung (12/02/2019)
    showModalAddQuick: function () {
        var parent = "modal-tool";
        modalJS.buidModalCommon(enumJS.enumTypeModal.AddQuick);
        modal = $('.modal-add-quick').find('.MISA-modal-box');
        parent = "modal-add-quick";
        modal.find('.btn-close.btn-show-modal').attr('parent', parent);
        var content="";
        content += '<div class="MISA-form-group">                                                         ';
        content += '    <div class="label-form">Mã nhóm KH <span class="icon-require">*</span></div>      ';
        content += '    <div class="input-form">                                                          ';
        content += '        <input type="text" name="CustomerGroupCode" value="" />                       ';
        content += '    </div>                                                                            ';
        content += '</div>                                                                                ';
        content += '    <div class="MISA-form-group">                                                     ';
        content += '        <div class="label-form">Tên nhóm KH <span class="icon-require">*</span></div> ';
        content += '        <div class="input-form">                                                      ';
        content += '            <input type="text" name="CustomerGroupName" value="" />                   ';
        content += '        </div>                                                                        ';
        content += '    </div>                                                                            ';
        content += '    <div class="MISA-form-group">                                                     ';
        content += '        <div class="label-form">Thuộc nhóm</div>                                      ';
        content += '        <div class="input-form">                                                      ';
        content += '            <input type="text" name="CustomerGroupCode" value="" />                   ';
        content += '        </div>                                                                        ';
        content += '    </div>                                                                            ';
        content += '    <div class="MISA-form-group">                                                     ';
        content += '        <div class="label-form">Diễn giải</div>                                       ';
        content += '        <div class="input-form input-note">                                           ';
        content += '            <textarea name="note"></textarea>                                         ';
        content += '        </div>                                                                        ';
        content += '    </div>                 ';
        modal.addClass('modal-add-quick-customer-group');
        $('.modal-add-quick-customer-group').find('.MISA-modal-content').html(content);
        modal.find('.modal-box-title').html("Thêm mới nhóm khách hàng");
        //Footer
        var footer = "";
        footer += '<div class="MISA-btn btn-help">                            ';
        footer += '    <div class="icon icon-help"></div>                     ';
        footer += '    <div class="btn-content">Trợ giúp</div>                    ';
        footer += '</div>                                                     ';
        footer += '<div class="footer-right">                        ';
        footer += '    <div class="MISA-btn btn-save">                        ';
        footer += '        <div class="icon icon-save"></div>                 ';
        footer += '        <div class="btn-content">Lưu</div>                 ';
        footer += '    </div>                                                 ';
        footer += '    <div class="MISA-btn btn-cancel">                      ';
        footer += '        <div class="icon icon-close icon-close-blue"></div>';
        footer += '        <div class="btn-content">Hủy bỏ</div>              ';
        footer += '    </div>                                                 ';
        footer += '</div>                                              ';

        //#endregion
        modal.find('.footer-content').html(footer);

    },

    //Hàm hiển thị modal nếu là modal chức năng thêm sửa nhân đôi
    //Created by tdtung (12/02/2019)
    showModalToolCustomer: function (action) {
        //Action: 
        //1-Thêm mới
        //2-Nhân bản
        //3-Sửa
        //4- Thêm nhanh nhóm khách hàng
        var modal;
        var parent;
        var content = '';
        modalJS.buidModalCommon(enumJS.enumTypeModal.Tool);
        if (action !== enumJS.enumActionModalTool.Import) {
            modal = $('.modal-tool').find('.MISA-modal-box');
            modal.attr('action-modal', action);
            parent = "modal-tool";
            modal.find('.btn-close.btn-show-modal').attr('parent', parent);
            //#region modal-content chung cho thêm sửa nhân đôi khách hàng
            content += '<div class="col-12 group-box">                                                                            ';
            content += '    <div class="content-title">Thông tin cơ bản</div>                                                     ';
            content += '    <div class="content-form">                                                                            ';
            content += '        <div class="col-6">                                                                               ';
            content += '            <div class="MISA-form-group">                                                                 ';
            content += '                <div class="label-form">Mã khách hàng <span class="icon-require">*</span></div>           ';
            content += '                <div class="input-form">                                                                  ';
            content += '                    <input type="text" name="CustomerCode" autofocus />                                   ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '        <div class="col-6 form-right">                                                                               ';
            content += '            <div class="MISA-form-group">                                                                 ';
            content += '                <div class="label-form">Tên khách hàng <span class="icon-require">*</span></div>          ';
            content += '                <div class="input-form">                                                                  ';
            content += '                    <input type="text" name="CustomerName"  />                                             ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '        <div class="col-6">                                                                               ';
            content += '            <div class="MISA-form-group">                                                                 ';
            content += '                <div class="label-form">Nhóm khách hàng</div>                                             ';
            content += '                <div class="input-form input-select-add">                                                 ';
            content += '                    <input type="text" class="show-select-box" name="CustomerGroupName" placeholder="Nhập để tìm kiếm" />             ';
            content += '                    <div class="btn-drop-down sup-menu select-menu" id="CustomerGroup">                                                           ';
            content += '                        <div class="icon-arrow-down"></div>                                               ';
            content += '                    </div>                                                                                ';
            content += '                    <div class="btn-add-new btn-show-modal btn-add-customer-group-quick" type-modal="4">                                                             ';
            content += '                        <div class="icon-add-new"></div>                                                  ';
            content += '                    </div>                                                                                ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '        <div class="col-6 form-right">                                                                               ';
            content += '            <div class="MISA-form-group">                                                                 ';
            content += '                <div class="label-form">Điện thoại <span class="icon-require">*</span></div>              ';
            content += '                <div class="input-form">                                                                  ';
            content += '                    <input type="text" name="PhoneNumber" /><span></span>                               ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '        <div class="col-12">                                                                              ';
            content += '            <div class="MISA-form-group">                                                                 ';
            content += '                <div class="label-form">Địa chỉ</div>                                                     ';
            content += '                <div class="input-form input-select input-select-address">                                ';
            content += '                    <div class="d-flex"><input type="text" class="show-select-box" name="City" placeholder="Tỉnh thành" />                            ';
            content += '                    <div class="btn-drop-down sup-menu select-menu" id="City">                                                           ';
            content += '                        <div class="icon-arrow-down"></div>                                               ';
            content += '                    </div></div>                                                                           ';
            content += '                    <div class="d-flex"><input type="text" class="show-select-box" name="District" placeholder="Quận/Huyện" />                        ';
            content += '                    <div class="btn-drop-down sup-menu select-menu" id="District">                                                           ';
            content += '                        <div class="icon-arrow-down"></div>                                               ';
            content += '                    </div>   </div>                                                                             ';
            content += '                    <div class="d-flex"><input type="text" class="show-select-box" name="Wards" placeholder="Phường/Xã" />                            ';
            content += '                    <div class="btn-drop-down sup-menu select-menu" id="Wards">                                                           ';
            content += '                        <div class="icon-arrow-down"></div>                                               ';
            content += '                    </div>    </div>                                                                            ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '        <div class="col-12">                                                                              ';
            content += '            <div class="MISA-form-group form-group-up">                                                                 ';
            content += '                <div class="label-form"></div>                                                            ';
            content += '                <div class="input-form input-address">                                                    ';
            content += '                    <input type="text" name="Address" placeholder="Số nhà, đường phố" />                  ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '        <div class="col-6">                                                                               ';
            content += '            <div class="MISA-form-group">                                                                 ';
            content += '                <div class="label-form">Email</div>                                                       ';
            content += '                <div class="input-form">                                                                  ';
            content += '                    <input type="email" name="Email" />                                                   ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '        <div class="col-6 form-right">                                                                               ';
            content += '            <div class="MISA-form-group">                                                                 ';
            content += '                <div class="label-form">Ngày sinh</div>                                                   ';
            content += '                <div class="input-form input-select input-select-date">                                   ';
            content += '                    <input type="text" name="Birthday" placeholder="DD / MM / YYYY" />';
            content += '                    <div class="btn-drop-down">                                                           ';
            content += '                        <div class="icon-select-date" parent="Birthday"></div>                                              ';
            content += '                    </div>                                                                                ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '        <div class="col-12">                                                                              ';
            content += '            <div class="MISA-form-group">                                                                 ';
            content += '                <div class="label-form">Ghi chú</div>                                                     ';
            content += '                <div class="input-form input-note">                                                       ';
            content += '                    <textarea name="note"></textarea>                                                     ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '    </div>                                                                                                ';
            content += '</div>                                                                                                    ';
            content += '    <div class="col-12 group-box">                                                                        ';
            content += '        <div class="content-title">Thẻ thành viên</div>                                                   ';
            content += '        <div class="content-form">                                                                        ';
            content += '            <div class="col-6">                                                                           ';
            content += '                <div class="MISA-form-group">                                                             ';
            content += '                    <div class="label-form">Mã thẻ thành viên</div>                                       ';
            content += '                    <div class="input-form">                                                              ';
            content += '                        <input type="text" readonly name="MemberCardCode"/>                                                    ';
            content += '                    </div>                                                                                ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '            <div class="col-6 form-right">                                                                           ';
            content += '                <div class="MISA-form-group">                                                             ';
            content += '                    <div class="label-form">Hạng thẻ</div>                                                ';
            content += '                    <div class="input-form">                                                              ';
            content += '                        <input type="text" readonly name="RankCard"/>                                                    ';
            content += '                    </div>                                                                                ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '            <div class="col-12">                                                                          ';
            content += '                <div class="MISA-form-group">                                                             ';
            content += '                    <div class="label-form">Số CMND/Hộ chiếu</div>                                        ';
            content += '                    <div class="input-form input-numbercard">                                             ';
            content += '                        <input type="text" name="IdentifyCard" />                                           ';
            content += '                    </div>                                                                                ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '    </div>                                                                                                ';
            content += '    <div class="col-12 group-box">                                                                        ';
            content += '        <div class="content-title">Thông tin công ty</div>                                                ';
            content += '        <div class="content-form">                                                                        ';
            content += '            <div class="col-6">                                                                           ';
            content += '                <div class="MISA-form-group">                                                             ';
            content += '                    <div class="label-form">Tên công ty</div>                                             ';
            content += '                    <div class="input-form">                                                              ';
            content += '                        <input type="text" name="CompanyName" />                                                             ';
            content += '                    </div>                                                                                ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '            <div class="col-6 form-right">                                                                           ';
            content += '                <div class="MISA-form-group">                                                             ';
            content += '                    <div class="label-form">Mã số thuế</div>                                              ';
            content += '                    <div class="input-form">                                                              ';
            content += '                        <input type="text" name="TaxCode" />                                                             ';
            content += '                    </div>                                                                                ';
            content += '                </div>                                                                                    ';
            content += '            </div>                                                                                        ';
            content += '        </div>                                                                                            ';
            content += '    </div>                                                                                                ';
            //Nếu chức năng sửa thêm check box trạng thái
            if (action === enumJS.enumActionModalTool.Edit) {
                content += '    <div class="col-12 group-box">                                                                        ';
                content += '        <div class="MISA-form-group">                                                                     ';
                content += '            <div class="label-form"></div>                                                                ';
                content += '            <div class="d-flex">                                                                                ';
                content += '               <label class="lb-checkbox">                                                                                    ';
                content += '                   <input type="checkbox" name="StatusCustomer" class="check-one-row" id="StatusCustomer" />                          ';
                content += '                   <span class="checkmark"></span>                         ';
                content += '                </label>                                                                                  ';
                content += '                <label for="StatusCustomer">Ngừng theo dõi</label>                                                                                  ';
                content += '            </div>                                                                                        ';
                content += '        </div>                                                                                            ';
                content += '    </div>                                                                                                ';
            }
            //#endregion
            modal.addClass('modal-tool-customer');
            $('.modal-tool-customer').find('.MISA-modal-content').html(content);
            //#region modal-footer thêm sửa nhân đôi khách hàng
            var footer = "";
            footer += '<div class="MISA-btn btn-help">                            ';
            footer += '    <div class="icon icon-help"></div>                     ';
            footer += '    <div class="btn-content">Trợ giúp</div>                    ';
            footer += '</div>                                                     ';
            footer += '<div class="footer-right">                        ';
            footer += '    <div class="MISA-btn btn-save">                        ';
            footer += '        <div class="icon icon-save"></div>                 ';
            footer += '        <div class="btn-content">Lưu</div>                 ';
            footer += '    </div>                                                 ';
            if (action !== 4) {
                footer += '    <div class="MISA-btn btn-saveAs">                      ';
                footer += '        <div class="icon icon-saveAs"></div>               ';
                footer += '        <div class="btn-content">Lưu và thêm mới</div>     ';
                footer += '    </div>                                                 ';
            }
            footer += '    <div class="MISA-btn btn-cancel">                      ';
            footer += '        <div class="icon icon-close icon-close-blue"></div>';
            footer += '        <div class="btn-content">Hủy bỏ</div>              ';
            footer += '    </div>                                                 ';
            footer += '</div>                                              ';

            //#endregion
            modal.find('.footer-content').html(footer);
        }
        else if (action === enumJS.enumActionModalTool.Import) {
            $('.modal-tool .MISA-modal-box').addClass('modal-import');
            modal = $('.modal-import');
            //Thêm nút full screen
            modal.find('.MISA-modal-header').append('<div class="btn-full-screen" parent="modal-import"><div class= "icon-full-screen" ></div></div>')
            //#region Modal content
            var html = '';
            html += '    <div class="content-status">                                                                                                                                   ';
            html += '        <div class="header-import step1 active header-import-ok">                                                                                                  ';
            html += '            <div class="header-import-content">                                                                                                                    ';
            html += '                <div class="step-number">1</div>                                                                                                                   ';
            html += '                <div class="step-content">Chọn tệp nguồn</div>                                                                                                     ';
            html += '            </div>                                                                                                                                                 ';
            html += '                                                                                                                                                                   ';
            html += '        </div>                                                                                                                                                     ';
            html += '        <div class="dash step1 active"></div>                                                                                                                      ';
            html += '        <div class="header-import step2">                                                                                                                          ';
            html += '            <div class="header-import-content">                                                                                                                    ';
            html += '                <div class="step-number">2</div>                                                                                                                   ';
            html += '                <div class="step-content">Kiểm tra dữ liệu</div>                                                                                                   ';
            html += '            </div>                                                                                                                                                 ';
            html += '                                                                                                                                                                   ';
            html += '        </div>                                                                                                                                                     ';
            html += '        <div class="dash step2"></div>                                                                                                                             ';
            html += '        <div class="header-import step3">                                                                                                                          ';
            html += '            <div class="header-import-content">                                                                                                                    ';
            html += '                <div class="step-number">3</div>                                                                                                                   ';
            html += '                <div class="step-content">Hoàn thành</div>                                                                                                         ';
            html += '            </div>                                                                                                                                                 ';
            html += '        </div>                                                                                                                                                     ';
            html += '    </div>                                                                                                                                                         ';
            html += '    <div class="import-content">                                                                                                                                   ';
            html += '        <div class="content-panel">                                                                                                                                ';
            html += '            <div class="content-left">Lý do nhập khẩu</div>                                                                                                    ';
            html += '            <div class="content-right">                                                                                                                            ';
            html += '                <label class="container-radiobox">                                                                                                                 ';
            html += '                    Thêm mới danh mục                                                                                                                              ';
            html += '                            <input type="radio" checked="checked" name="reason-import" value="1">                                                                  ';
            html += '                        <span class="checkmark-radio"></span>                                                                                                      ';
            html += '                        </label>                                                                                                                                   ';
            html += '                    <label class="container-radiobox">                                                                                                             ';
            html += '                        Cập nhật danh mục                                                                                                                          ';
            html += '                            <input type="radio" name="reason-import" value="2">                                                                                    ';
            html += '                            <span class="checkmark-radio"></span>                                                                                                  ';
            html += '                        </label>                                                                                                                                   ';
            html += '                    </div>                                                                                                                                         ';
            html += '                </div>                                                                                                                                             ';
            html += '                <div class="content-box">                                                                                                                          ';
            html += '                    <div class="content-left">Chọn tệp nhập khẩu</div>                                                                                         ';
            html += '                    <div class="content-right">                                                                                                                    ';
            html += '                        <div class="area-choose-file">                                                                                                             ';
            html += '                            <div class="box-choose-file">                                                                                                          ';
            html += '                                <div class="img-upload"></div>                                                                                                     ';
            html += '                                <div>Kéo thả tệp vào vùng này</div>                                                                                                ';
            html += '                                <div><a href="#" class="btnUploadFile">Chọn tệp nguồn</a></div>                                                                    ';
            html += '                                <input type="file" name="name" value="" />                                                                                         ';
            html += '                            </div>                                                                                                                                 ';
            html += '                        </div>                                                                                                                                     ';
            html += '                        <div>Nếu chưa có tệp mẫu, vui lòng tải tệp mẫu để nhập liệu và nhập khẩu khách hàng <span class="link"><a href="#">tại đây</a></span></div>';
            html += '                    </div>';
            html += '                </div>    ';
            html += '            </div>        ';
            //#endregion
            //Hiển thị content
            modal.find('.MISA-modal-content').html(html);
            //Hiển thị footer
            //#region footer
            var footer = '';
            footer += '<div class="MISA-btn btn-help">                                        ';
            footer += '    <div class="icon icon-help"></div>                                 ';
            footer += '    <div class="btn-content">Trợ giúp</div>                            ';
            footer += '</div>                                                                 ';
            footer += '    <div class="footer-right">                                         ';
            footer += '        <div class="MISA-btn btn-continue btn-disable">                ';
            footer += '            <div class="btn-content">Tiếp tục</div>                    ';
            footer += '            <div class="icon icon-continue icon-continue-white"></div> ';
            footer += '        </div>                                                         ';
            footer += '        <div class="MISA-btn btn-cancel">                              ';
            footer += '            <div class="icon icon-close icon-close-blue"></div>        ';
            footer += '            <div class="btn-content">Hủy bỏ</div>                      ';
            footer += '        </div>                                                         ';
            footer += '    </div>                                                             ';
            //#endregion
            modal.find('.footer-content').html(footer);
        }
        //#region Đặt tiêu đề
        switch (action) {
            case enumJS.enumActionModalTool.Add: {
                modal.find('.modal-box-title').html("Thêm mới khách hàng");
                $('input[name="CustomerCode"]').prop('readonly', false);
                break;
            }
            case enumJS.enumActionModalTool.Duplicate: {
                modal.find('.modal-box-title').html("Thêm mới khách hàng");
                $('input[name="CustomerCode"]').prop('readonly', false);
                modalJS.bindingDataCustomer(enumJS.enumActionModalTool.Duplicate);
                break;
            }
            case enumJS.enumActionModalTool.Edit: {
                modal.find('.modal-box-title').html("Sửa khách hàng");
                $('input[name="CustomerCode"]').prop('readonly', true);
                modalJS.bindingDataCustomer(enumJS.enumActionModalTool.Edit);
                break;
            }
            case enumJS.enumActionModalTool.Import: {
                modal.find('.modal-box-title').html("Nhập khẩu danh mục khách hàng");
                break;
            }
            default:
        }
        //#endregion

        //Tạo sub menu của các ô nhập có lựa chọn
        commonJS.inputSelectChange('CustomerGroup', { 'KH0001': 'Nhóm khách sỉ', 'KH0002': 'Nhóm khách lẻ' });
        commonJS.inputSelectChange('City', { 'HN': 'Hà Nội', 'HCM': 'Hồ Chí Minh', 'DN': 'Đà Nẵng', 'HP': 'Hải Phòng' });
        commonJS.inputSelectChange('District', { 'QCG': 'Quận Cầu Giấy', 'QBTL': 'Quận Bắc Từ Liêm', 'QNTL': 'Quận Nam Từ Liêm', 'DP': 'Đan Phượng', 'HD': 'Hà Đông' });
        commonJS.inputSelectChange('Wards', { 'MD': 'Mai dịch', 'DT': 'Duy Tân', 'DP': 'Đan Phượng', 'TTP': 'Thị trấn Phùng' });

        //Kích hoạt sự kiện kiểm tra giá trị các ô nhập
        commonJS.validateInput('CustomerCode', { 'required': 'Trường này không được để trống' });
        commonJS.validateInput('CustomerName', { 'required': 'Trường này không được để trống' });
        commonJS.validateInput('CustomerPhone', { 'required': 'Trường này không được để trống' });
        commonJS.validateInput('Birthday', { 'isDate': 'Nhập ngày tháng năm đúng định dạng dd/mm/yyyy' });
        commonJS.validateInput('PhoneNumber', { 'phoneNumber': 'Số điện thoại không hợp lệ' });
    },

    //Tạo và hiển thị modal thông báo
    //Created by tdtung (12/02/2019)
    showModalMessageBox: function (type, action, parent, title, content) {
        modalJS.buidModalCommon(enumJS.enumTypeModal.Message);
        var modal = $('.modal-message');
        var icon = modal.find('.message-box-icon');
        switch (type) {
            case enumJS.enumTypeModalMessage.Help: {
                icon.addClass('icon-popup-help');
                break;
            }
            case enumJS.enumTypeModalMessage.Notify: {
                icon.addClass('icon-popup-notify');
                break;
            }
            case enumJS.enumTypeModalMessage.Warning: {
                icon.addClass('icon-popup-warning');
                break;
            }
            case enumJS.enumTypeModalMessage.Danger: {
                icon.addClass('icon-popup-danger');
                break;
            }
            default:
        }
        //Nút xoá
        if (action === enumJS.enumActionModalMessage.Delete) {
            modal.find('.MISA-modal-title').html("Xoá dữ liệu");
            if ($('tr.active').length > 1) {
                $('.message-box-content').html("Bạn có muốn xoá các khách hàng đã chọn?");
            }
            else {
                if ($('tr.active').length === 1) {
                    var customerName = $('tr.active').find('.customer-table-column-customerName').text();
                    var customerCode = $('tr.active').find('.customer-table-column-customerCode').text();
                }
                else {
                    var customerName = $('tr.checked').find('.customer-table-column-customerName').text();
                    var customerCode = $('tr.checked').find('.customer-table-column-customerCode').text();
                }
                var content = "Bạn có chắc muốn xóa khách hàng <span class='content-warning'>" + customerName + " - (" + customerCode + ")</span> không?"
                modal.find('.message-box-content').html(content);
            }
            var footer = "";
            footer += '<div class="footer-right">            ';
            footer += '<div class="MISA-btn btn-delete">            ';
            footer += '    <div class="icon icon-delete"></div>     ';
            footer += '    <div class="btn-content">Xóa</div>       ';
            footer += '</div>                                       ';
            footer += '    <div class="MISA-btn btn-cancel">        ';
            footer += '        <div class="icon icon-close icon-close-blue"></div> ';
            footer += '        <div class="btn-content">Hủy bỏ</div>';
            footer += '    </div>                                   ';
            footer += '</div>                                   ';
            modal.find('.footer-content').html(footer);
        }
        //Nút huỷ bỏ
        else if (action === enumJS.enumActionModalMessage.Cancel) {
            modal.find('.MISA-modal-title').html("Dữ liệu chưa được lưu");
            $('.message-box-content').html("Dữ liệu đã thay đổi, bạn có muốn lưu không");
            var footer = "";
            footer += '<div class="footer-right">            ';
            footer += '<div class="MISA-btn btn-save">            ';
            footer += '    <div class="icon icon-save"></div>     ';
            footer += '    <div class="btn-content">Lưu</div>       ';
            footer += '</div> ';
            footer += '<div class="MISA-btn btn-not-save" parent="' + parent + '">            ';
            footer += '    <div class="icon icon-not-save"></div>     ';
            footer += '    <div class="btn-content">Không lưu</div>       ';
            footer += '</div>                                       ';
            footer += '    <div class="MISA-btn btn-cancel">        ';
            footer += '        <div class="icon icon-close icon-close-blue"></div> ';
            footer += '        <div class="btn-content">Hủy bỏ</div>';
            footer += '    </div>                                   ';
            footer += '</div>                                   ';
            modal.find('.footer-content').html(footer);
        }
        //Nếu lỗi trả về từ server
        else if (action === enumJS.enumActionModalMessage.Error) {
            modal.find('.MISA-modal-title').html(title);
            $('.message-box-content').html(content);
            var footer = "";
            footer += '<div class="footer-right">            ';
            footer += '    <div class="MISA-btn btn-cancel">        ';
            footer += '        <div class="icon icon-close icon-close-blue"></div> ';
            footer += '        <div class="btn-content">Đóng</div>';
            footer += '    </div>                                   ';
            footer += '</div>                                   ';
            modal.find('.footer-content').html(footer);
        }
    },

    //Lấy dữ liệu đối tượng đang chọn đưa vào form nhập liệu:
    //Created by tdtung (12/02/2019)
    bindingDataCustomer: function (action) {
        var row = 0;
        //Tìm đến đối tượng đang được chọn:
        if ($('tr.active').length === 0) {
            row = $('tr.checked');
        } else {
            row = $('tr.active');
        }
        //Lấy thông tin:
        var customerID = row.attr('id');
        customerService.getDataByID(customerID);
    },

    //Đặt vị trí xuát hiện modal ở giữa màn hình
    //Created by tdtung (11/03/2019)
    setPositionModal: function () {
        $('.MISA-modal-box').each(function () {
            if ($(window).width() <= $(this).width()) {
                $(this).addClass('modal-on-left');
            }
            else {
                $(this).removeClass('modal-on-left');
            }

            if ($(window).height() <= $(this).height()) {
                $(this).addClass('modal-on-top');
            }
            else {
                $(this).removeClass('modal-on-top');
            }
        });
    }


}
