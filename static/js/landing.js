(function(){
    // Тут неебический дропдаун

    var dropdown = $id("landing-dd"),
        dropdownClickarea = $id("landing-dropdown-clickarea"),
        dropdownWhouare = $id("landing-whouare"),
        dropdownList = dropdown.querySelector("ul"),
        dropdownListItems = dropdownList.querySelectorAll("li"),
        dropdownSelected = [];

    dropdownClickarea.onclick = function() {
        if (dropdownList.style.display == "" || dropdownList.style.display == "none") {
            dropdownList.style.display = "block";
        } else {
            dropdownList.style.display = "none";
        }
    };

    (function() {
        for (var i = 0, length = dropdownListItems.length; i < length; i++) {
            (function(item) {
                item.onclick = function() {
                    var id = parseInt(item.getAttribute("data"));
                    var key = in_array(id, dropdownSelected);

                    if ( key !== false ) {
                        delete dropdownSelected[key];
                        item.querySelector(".landing-checkbox").removeAttribute("selected");
                    } else {
                        dropdownSelected.push(id);
                        item.querySelector(".landing-checkbox").setAttribute("selected", "");
                    }
                };
            })(dropdownListItems[i]);
        }
    })();

    // Конец неебического дропдауна

    // Начало неебической функции-отправки

    $id("send-invite").onclick = function () {

        var inviteWhouare = (function() {
            var whouare = "";

            for (var i = 0, length = dropdownSelected.length; i < length; i++) {
                if (dropdownSelected[i] !== undefined)
                    whouare += dropdownSelected[i] + ",";
            }

            return whouare.slice(0, whouare.length-1);
        })();

        var inviteName = document.getElementsByName("invite_name")[0],
            inviteEmail = document.getElementsByName("invite_email")[0],
            inviteTextarea = textarea;

        var validate = InviteValidate(
            inviteName.value,
            inviteEmail.value,
            inviteTextarea.value,
            inviteWhouare
        );

        if (validate === true) {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    var json = JSON.parse(xhr.responseText);

                    if(json.error) {
                        alert("Ошибка: \n\n" + json.error.content);
                    }

                    if(json.ok) {
                        alert("Спасибо! Ваша заявка принята на рассмотрение!");
                        window.document.location = '/?landing';
                    }
                }
            }

            xhr.open("POST","/func/ask_invite.php",true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(
                "invite_name=" + inviteName.value
                + "&invite_email=" + inviteEmail.value
                + "&spec=" + inviteWhouare
                + "&why=" + inviteTextarea.value
                + "&adopting_agreement=checked"
            );
        } else {
            alert("Проверьте свои данные");
        }
    };

    var InviteValidate = function( name, email, text , whouare ) {
        var error_codes = [];

        if (/^[a-zA-ZА-Яа-я]+$/.exec(name) === null)
            error_codes[1] = true;

        if (/^([a-zA-Z0-9\.\-\_]+)@([a-zA-Z0-9\.\-\_]+)\.([a-zA-Z]+)$/.exec(email) === null)
            error_codes[2] = true;

        if (text.length < 300 || text.length >= 1000)
            error_codes[3] = true;

        if (whouare === "")
            error_codes[4] = true;

        if (error_codes[1] === true
            || error_codes[2] === true
            || error_codes[3] === true
            || error_codes[4] === true) {
            return error_codes;
        }

        return true;
    };

    // Конец неебической функции-отправки

    $id('demo-video').onclick = function(){
        $id('video-popup').style.display = 'block';
        $id('iframed-video').innerHTML = '<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/LICSA6iJd6w?autoplay=1&rel=0&showinfo=0&autohide=1" frameborder="0" allowfullscreen>';
    }

    $id('close-video').onclick = function(){
        $id('video-popup').style.display = 'none';
        $id('iframed-video').innerHTML = '';
    }
})();

// get invite
(function() {
    var textarea = $id('textform'),
        close = $id('modal-invite-close');

    if (location.hash === "#invite") {
        $id("invite").style.display = "block";
    }

    close.onclick = function() {
        $id("invite").style.display = "none";
    };

    textarea.onclick = textarea.onkeydown = function textLimiter(mouse){
        var count = 300,
            text = textarea,
            content = text.value,
            clength = content.length,
            counttext = $id('symbols-left'),
            left = "Осталось набрать: " + (count - clength);

        if(clength > count) {
            left = "Осталось набрать: " + 0;
        }

        if(clength >= 1000) {
            left = "Вы достигли лимита сообщения (1000 символов), удалите лишнее.";
            text.value = content.substr(0,1000);
        }

        counttext.innerHTML = left;
    }
})();

// auth
(function() {
    var close = $id("modal-auth-close"),
        remindLink = $id("sing-in-remind");

    if (location.hash === "#auth") {
        $id("sing-in").style.display = "block";
    }

    close.onclick = function() {
        $id("sing-in").style.display = "none";
    };

    remindLink.onclick = function(event) {
        event.preventDefault();
        $id("remind").style.display = "block";
    };
})();

// remind
(function() {
    var close = $id("modal-remind-close");

    close.onclick = function() {
        $id("remind").style.display = "none";
    };
})();