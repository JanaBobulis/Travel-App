
function newElement() {
 // inside the function create variable which equals to a new element
    var li = document.createElement("li");
    var inputValue = document.getElementById("name").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.classList.add("item");
    if (inputValue !== '') {
        document.getElementById("myCodes").appendChild(li);  
        }
    document.getElementById("name").value = "";

    var items = document.querySelectorAll(".item");
    var last = items[items.length-1].scrollIntoView();

    //ADD CLOSE BUTTON 
    var myList = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myList.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myList[i].appendChild(span);
    }
    
    //CLICK ON CLOSE BUTTON TO CLOSE 
    var close = document.getElementsByClassName("close");
    var i; 
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
        var div = this.parentElement;
            div.style.display = "none";
        }
    }
    }
                                     
    // CREATE CLOSE BUTTON 
    var myList = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myList.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myList[i].appendChild(span);
    }
                        
    // CLICK ON CLOSE BUTTON TO HIDE THE CURRENT LIST ITEM 
    var close = document.getElementsByClassName("close");var i; 
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
    // CLICK ON CLEAR ALL BUTTON TO CLEAR ALL LIST ITEMS
    function resetElement() {
        var list = document.getElementById("myCodes");
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
    }


export { newElement }
export { resetElement }