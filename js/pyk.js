window.onload = function init() {
    var model = {},
        view = {},
        controler = {};       
       
    /*------ ------ MODEL ------ ------ */   
    model = (function createModel(){
        /*
         * Calculate a price
         * @param {Array}  array of prices
         * @return {Number} result
         */
        function calculatePrice(array) {
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
        
        /*
         * Check if < select > has an option with "Select X"
         * @param {HTMLobject} elt 
         * @returns {Boolean} true when yes and false when not
         */
        function validateChoose(elt) {
            var patt = /Wybierz.*/g;       
            return patt.test(elt.options[elt.selectedIndex].innerText)     ;
        }
        
        return {
            calculatePrice: calculatePrice,
            validateChoose: validateChoose
        };
    })(); 
       
    /*------ ------ VIEW ------ ------ */
    view = (function createView(){
        var slideIndex = 1;
        
        /**
         * Show divs
         * @param {Integer} amount of divs
         */
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
        
        /**
         * Add divs
         * @param {Integer} number of divs
         */
        function plusDivs(number) {
            showDivs(slideIndex += number);
        }
        
        /**
         * Remove all parent's children
         * @param {HTMLobject} parent
         */
        function removeChildren(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        
        /**
         * Add new text to the parent
         * @param {HTMLobject} parent
         * @param {HTMLobject} node
         */
        function addNewText(parent, node) {
            removeChildren(parent);
            parent.appendChild(document.createTextNode(node));
        }
        
        /**
         * Set a total's value
         * @param {type} total
         */
        function setTotal(total) {             
            addNewText(document.querySelector(".calcItems"), total);
        }
        
        /**
         * Set transport's values
         * @param {type} text to be set
         */
        function setTransport(text) {
            var chksBox = document.getElementById("transport");
            
            if (chksBox.checked) {                
                addNewText(document.querySelector(".transpvalue"), parseInt(chksBox.value));
            } else {
                addNewText(document.querySelector(".transpvalue"), '-');
            }
            addNewText(document.querySelector(".transp"), "Transport");
        }
        
        /**
         * Set an image
         * @param {type} elt
         */
        function setImage(elt) {
            var imagesUrl = ["images/red_chair.png", "images/black_chair.png", "images/orange.png"], 
                imgClass = document.querySelector(".image_part"),
                img = document.createElement("img"),
                index = elt.selectedIndex - 1;
                removeChildren(imgClass);
                
                if(index > -1) {
                    img.src = imagesUrl[index];
                    img.className += " calcImg";                                
                    imgClass.appendChild(img);
                }
                
        }
                
        return {
            showDivs: showDivs,
            plusDivs: plusDivs,
            setTotal: setTotal,
            setTransport: setTransport,
            setImage: setImage,
            addNewText: addNewText
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
        
        /**
         * Choose a transport value
         */
        function chooseTranspValue(){
            view.setTransport();
            setAllTotal();            
        }
        
        /**
         * Set content in a right block
         */
         function setContent() {
            addOneContent(document.querySelector(".type"), document.querySelector(".typevalue"), elt1);
            addOneContent(document.querySelector(".colork"), document.querySelector(".colorkvalue"), elt2);
            addOneContent(document.querySelector(".pattern"), document.querySelector(".patternvalue"), elt3);
            
            /**
             * Set one content (left and right value)
             * @param {type} left elemt in the block
             * @param {type} value to be set
             * @param {type} elt
             */
            function addOneContent(left, value, elt) {                
                view.addNewText(left, elt.options[elt.selectedIndex].innerText);                
                if(model.validateChoose(elt)) {                    
                    view.addNewText(value, "-");
                } else {
                    view.addNewText(value, elt.options[elt.selectedIndex].value);
                }
            }
        }
        
        /**
         * Set total - call calculate function and set its result
         */
        function setAllTotal() {
            total = model.calculatePrice([  elt1.options[elt1.selectedIndex].value,
                                            elt2.options[elt2.selectedIndex].value,
                                            elt3.options[elt3.selectedIndex].value,
                                            transpValue.innerText]);
            view.setTotal(total);   
        }
        
        /**
         * Set the content and the total value
         */
        function calculatePrice() {            
            setContent();
            setAllTotal();
        }
        
        /**
         * Initial function - it makes all what is needed to work
         */
        function init(){   
            /**
             * Call functions, which have to be called on a page's start
             */
            (function start(){
                view.showDivs(1);
            })();
            
            /**
             * Bind all events
             */
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