$(function() {
    var loginForm = $('#loginForm');
    loginForm.on("show", function() {
        $("#btnLogin").on("click", function(e) {
            e.preventDefault();

            var loginName = $.trim($("#txt-nickname").val()),
            roomName = $.trim($("#txt-room-name").val()),
            storyStr = $.trim($("#txt-stories").val());

            if(!loginName) {
                $("#errNoNickname").show();
                return;
            }
            else 
                $("#errNoNickname").hide();
            if(!roomName) {
                $("#errNoRoomName").show();
                return;
            }
            else
                $("#errNoRoomName").hide();


            $.cookie("LoginName", loginName);
            $("#f").submit();
        });
    });
    loginForm.on("shown", function() {
        $("#txt-nickname").focus();
    });
    loginForm.keydown(function (evt) {
        if (evt.keyCode == 13) $('#btnLogin').click();
    });
            
    loginForm.modal({ "backdrop" : "static", "keyboard" : false, "show" : true });
});
