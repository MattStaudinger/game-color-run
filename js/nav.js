function startGame() {
  document.getElementById("start-button").style = "display: none";
  document.getElementById("nav-btn").style = "display: none";
  canvas.style = "margin-top: 20px;"
  document.querySelector("body").append(canvas);

  let intervalId = setInterval(() => {
    update();
    drawEverything();
  }, 1000/60)
};




function goToPage(link) {
//Show page
$("[data-page=" + link + "]").siblings("[data-page]").hide()
$("[data-page=" + link + "]").show()
  // Add the class active in the navbar
  $('li.nav-item').each(function(){
    var href = $(this).find('a.nav-link').attr('href')
    if (href === link) 
      $(this).addClass('active')
    else
      $(this).removeClass('active')
})
}

$("a").click(function(event) {
console.log($(this));
event.preventDefault();
goToPage($(this).attr("href"))
})


goToPage("home");
