function $id(id){
  return document.getElementById(id);
}

function in_array(value, array) {
    for(var i = 0; i < array.length; i++) {
        if(array[i] == value)
            return i;
    }
    return false;
}

var TabsInit = function (tabs) {
    var tabs_li = tabs.querySelectorAll(".tab_name li[data]");

    for(i in tabs_li) {
        (function(i) {
            var element = tabs_li[i];
            element.onclick = function() {
                for(j in tabs_li) { tabs_li.item(j).setAttribute('class', ''); }

                element.setAttribute('class', 'active');

                var tab_cont = document.getElementById('tab_' + element.getAttribute('data'));
                var tab_cont_all = tabs.getElementsByClassName('tab_div')[0].getElementsByTagName('div');
                for(c in tab_cont_all) {
                    if(tab_cont_all.item(c).getAttribute('class') == 'tab_div_active') 
                        tab_cont_all.item(c).setAttribute('class', '');
                }
                tab_cont.setAttribute('class', 'tab_div_active');
            }
        })(i);
    }
};

var Dropdown = function(string, callback) {
    /**
     * Stylization select inputs
    */
    var StylizationObjects = [];

    var Stylization = function(object, callback) {
        var selectWrap = object;

        var select        = selectWrap.querySelector("select"),
         selectOptions = select.getElementsByTagName("option");

        var pseudoSelect       = document.createElement("ul"),
            pseudoSelectInner  = document.createElement("ul");

        var selectedElement;

        for (var i = 0; i < selectOptions.length; i++) {
            var creator = document.createElement("li");

            creator.innerHTML = selectOptions[i].innerHTML;
            creator.setAttribute('data', selectOptions[i].getAttribute("name"));

            creator.className = "for_dropdown_event";

            if (selectOptions[i].hasAttribute("disabled")) {
                creator.setAttribute('disabled', 'disabled');
            }

            if (selectOptions[i].hasAttribute("invisible")) {
                try {
                    creator.style.display = "none";
                } catch(e) {}
            }

            pseudoSelectInner.appendChild(creator);

            if(selectOptions[i].selected) {
                selectedElement = [
                    selectOptions[i].innerHTML,
                    selectOptions[i].getAttribute("name")
                ];
            }
        };

        var mainLI = document.createElement("li");

        var mainLILink = document.createElement("div");

        mainLILink.innerHTML = selectedElement[0];
        mainLILink.setAttribute("data",selectedElement[0]);
        mainLILink.className = "for_dropdown_event";

        mainLI.appendChild(mainLILink);

        mainLI.appendChild(pseudoSelectInner);

        pseudoSelect.appendChild(mainLI);
        selectWrap.appendChild(pseudoSelect);

        // dropdown list
        mainLILink.onclick = function() {
            var state = pseudoSelectInner.style['display'];

            hideAllDropdowns();

            if(state == "block") {
                pseudoSelectInner.style['display'] = "none";
            } else {
                pseudoSelectInner.style['display'] = "block";
            }

            document.onclick = function(event) {
                event = event || window.event;
                var target = event.target || event.srcElement;

                if(target.className != 'for_dropdown_event') {
                    hideAllDropdowns();
                }
            };
        };

        var pseudoSelectInner_LI = pseudoSelectInner.getElementsByTagName('li');
        for (var j in pseudoSelectInner_LI) {
            pseudoSelectInner_LI.item(j).onclick = function() {
                if (this.getAttribute("disabled")) {
                    return false;
                }

                document.getElementsByName(this.getAttribute('data'))[0].selected = true;
                this.parentNode.parentNode.getElementsByTagName("div")[0].innerHTML = this.innerHTML;
                
                if(callback) callback(this);

                hideAllDropdowns();
            };
        }
    };

    function hideAllDropdowns() {
        for (var i = 0; i < StylizationObjects.length; i++) {
            StylizationObjects[i].getElementsByTagName('ul')[1]
                                 .style.display = 'none';
        }
    }

    function Custom(string, callback) {
        if (string[0] == "#") {

            var query = string.substring(1, string.length);
            var DOM = document.getElementById(query);
            if (DOM) {
                StylizationObjects.push(DOM);
                Stylization(DOM, callback);
            }
        } else if (string[0] == ".") {

            var DOM_ELEMENTS = document.querySelectorAll(string);
            if(DOM_ELEMENTS) {
                for (var i = 0; i < DOM_ELEMENTS.length; i++) {
                    StylizationObjects.push(DOM_ELEMENTS[i]);
                    Stylization(DOM_ELEMENTS[i],callback);
                }
            }
        } 
    }

    return Custom(string, callback);
};