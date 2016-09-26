window.onload = function init() {
    var model = {},
        view = {},
        controler = {};       
       
    /*------ ------ MODEL ------ ------ */
    model = (function createModel(){
        function calculatePrice(array) { //type, color, cloth, transport
            var total = 0,
                helper = 0;
            for(var i = 0; i < array.length; i++) {
                helper = parseInt(array[i]);                
                if(!isNaN(helper)){
                    total += helper;
                }
            };            
            return total;
        }       
        
        return {
            calculatePrice: calculatePrice
        };
    })(); 
       
    /*------ ------ VIEW ------ ------ */
    view = (function createView(){
        var slideIndex = 1;
               
        function showDivs(amount) {
            var elements = document.getElementsByClassName("reel-pyk");
            
            if (amount > elements.length) {
                slideIndex = 1;
            }
            if (amount < 1) {
                slideIndex = elements.length;
            }
            
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
            
            elements[slideIndex - 1].style.display = "block";
            elements[slideIndex - 1].className += " fade-in one";
        }
        
        function plusDivs(number) {
            showDivs(slideIndex += number);
        }
        
        function removeChildren(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        
        function addNewText(parent, node) {
            removeChildren(parent);
            parent.appendChild(document.createTextNode(node));
        }
        
        function setTotal(total) {             
            addNewText(document.querySelector(".calcItems"), total);
        }
        
        function setTransport(text) {
            var chksBox = document.getElementById("transport");
            
            if (chksBox.checked) {                
                addNewText(document.querySelector(".transpvalue"), parseInt(chksBox.value));
            } else {
                addNewText(document.querySelector(".transpvalue"), '-');
            }
            addNewText(document.querySelector(".transp"), "Transport");
        }
        
        function setContent() {
            addOneContent(document.querySelector(".type"), document.querySelector(".typevalue"), document.getElementById("itemType"));
            addOneContent(document.querySelector(".colork"), document.querySelector(".colorkvalue"), document.getElementById("itemColor"));
            addOneContent(document.querySelector(".pattern"), document.querySelector(".patternvalue"), document.getElementById("itemCloth"));
            
            function addOneContent(left, value, elt) {
                var patt = /Wybierz.*/g;
                addNewText(left, elt.options[elt.selectedIndex].innerText );
                if(patt.test(elt.options[elt.selectedIndex].innerText)) {                    
                    addNewText(value, "-");
                } else {
                    addNewText(value, elt.options[elt.selectedIndex].value);
                }
            }
        }
        
        function setImage(elt) {
            var imagesUrl = ["images/red_chair.png", "images/black_chair.png", "images/orange.png"], 
                imgClass = document.querySelector(".image_part"),
                img = document.createElement("img");        
                img.src = imagesUrl[elt.selectedIndex - 1];
                img.className += " calcImg";
                removeChildren(imgClass);
                imgClass.appendChild(img);
        }
                
        return {
            showDivs: showDivs,
            plusDivs: plusDivs,
            setTotal: setTotal,
            setTransport: setTransport,
            setContent: setContent,
            setImage: setImage
        };
    })();
        
    /*------ ------ CONTROLER ------ ------ */
    controler = (function createControler(){ 
        var elt1 = document.getElementById("itemType"),
            elt2 = document.getElementById("itemColor"),
            elt3 = document.getElementById("itemCloth"),        
            total = 0,
            chksBox = document.getElementById("transport"),
            transpValue = document.querySelector(".transpvalue");
        
        function chooseTranspValue(){
            view.setTransport();
            setAllTotal();            
        }
        
        function setAllTotal() {
            total = model.calculatePrice([  elt1.options[elt1.selectedIndex].value,
                                            elt2.options[elt2.selectedIndex].value,
                                            elt3.options[elt3.selectedIndex].value,
                                            transpValue.innerText]);
            view.setTotal(total);   
        }

        function calculatePrice() {            
            view.setContent();
            setAllTotal();
        }
        
        function init(){    
            (function start(){
                view.showDivs(1);
            })();
            
            (function bindEvents(){
                elt1.addEventListener("change", function(){
                    calculatePrice();
                    view.setImage(this);
                }, false);
                elt2.addEventListener("change", calculatePrice, false);
                elt3.addEventListener("change", calculatePrice, false);
                document.querySelector(".reel-prev-click").addEventListener("click", function(){
                    view.plusDivs(-1);
                }, false);
                document.querySelector(".reel-next-click").addEventListener("click", function(){
                    view.plusDivs(1);
                }, false);
                chksBox.addEventListener("click", chooseTranspValue, false);                
            })();            
        }
        
        return {
            init: init
        };
    })();
    
    /*------ ------ LOGICAL PART ------ ------*/
    controler.init();  
};