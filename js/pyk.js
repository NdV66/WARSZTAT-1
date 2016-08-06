var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("reel-pyk");
    if (n > x.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
    x[slideIndex - 1].className += ' fade-in one';
}

function calculatePrice(myform) {

    var elt1 = document.getElementById("itemType");
    var itemType = elt1.options[elt1.selectedIndex].value;
    var itemTypeName = elt1.options[elt1.selectedIndex].innerText;

    var itemImage = elt1.selectedIndex;

    var elt2 = document.getElementById("itemColor");
    var itemColor = elt2.options[elt2.selectedIndex].value;
    var itemColorName = elt2.options[elt2.selectedIndex].innerText;

    var elt3 = document.getElementById("itemCloth");
    var itemCloth = elt3.options[elt3.selectedIndex].value;
    var itemClothName = elt3.options[elt3.selectedIndex].innerText;


    var chksBox = document.getElementById("transport");


    itemType = parseInt(itemType);
    itemColor = parseInt(itemColor);
    itemCloth = parseInt(itemCloth);

    var chksBoxValue = parseInt(chksBox.value);



    var sume = document.querySelector(".calcItems");
    var type = document.querySelector(".type");
    var typeValue = document.querySelector(".typevalue");
    var color = document.querySelector(".colork");
    var colorValue = document.querySelector(".colorkvalue");
    var pattern = document.querySelector(".pattern");
    var patternValue = document.querySelector(".patternvalue");
    var transp = document.querySelector(".transp");
    var transpValue = document.querySelector(".transpvalue");


    if (chksBox.checked) {
      transp.innerText = "Transport";
      transpValue.innerText = chksBoxValue;
    } else {
      transp.innerText = "Transport";
      transpValue.innerText = 0;
    }
    var transpParse = parseInt(transpValue.innerText);
    var total = (itemType + itemColor + itemCloth + transpParse) + ' zł';
    var imgClass = document.querySelector(".image_part");
    if (itemImage === 1) {
      imgClass.innerHTML = '<img class="calcImg" src="images/red_chair.png">';
    } else if(itemImage === 2) {
      imgClass.innerHTML = '<img class="calcImg" src="images/black_chair.png">';
    } else if (itemImage === 3) {
      imgClass.innerHTML = '<img class="calcImg" src="images/orange.png">';
    } else {
      imgClass.innerHTML = ' ';
    }

    sume.innerText = total;
    if (itemTypeName == "Wybierz rodzaj") {
        type.innerText = '-';
    } else {
        type.innerText = itemTypeName;
    }
    if (itemColorName == "Wybierz kolor") {
        color.innerText = "-";
    } else {
        color.innerText = itemColorName;
    }
    if (itemClothName == "Wybierz materiał") {
        pattern.innerText = "-";
    } else {
        pattern.innerText = itemClothName;
    }


    typeValue.innerText = itemType;
    colorValue.innerText = itemColor;
    patternValue.innerText = itemCloth;
}
