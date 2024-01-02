(function ($) {

	// Init ScrollMagic
    var controller = new ScrollMagic.Controller();

    // get all slides
	var slides = ['#slide01', '#slide02', '#slide03'];

	// get all headers in slides that trigger animation
	var headers = ['#slide01 header', '#slide02 header', '#slide03 header'];

	// get all break up sections
	var breakSections = ['#cb01', '#cb02', '#cb03'];

	// Enable ScrollMagic only for desktop, disable on touch and mobile devices
	if (!Modernizr.touch) {

		// SCENE 1
		// create scenes for each of the headers
		headers.forEach(function (header, index) { 
		    
		    // number for highlighting scenes
			var num = index+1;

		    // make scene
		    var headerScene = new ScrollMagic.Scene({
		        triggerElement: header, // trigger CSS animation when header is in the middle of the viewport 
		        offset: -195 // offset triggers the animation 95 earlier then middle of the viewport, adjust to your liking
		    })
		    .setClassToggle('#slide0'+num, 'is-active') // set class to active slide
		    //.addIndicators() // add indicators (requires plugin), use for debugging
		    .addTo(controller);
		});

	    // SCENE 2
	    // change color of the nav for dark content blocks
	    breakSections.forEach(function (breakSection, index) {
		    
		    // number for highlighting scenes
			var breakID = $(breakSection).attr('id');

      // make scene
      var breakScene = new ScrollMagic.Scene({
          triggerElement: breakSection, // trigger CSS animation when header is in the middle of the viewport 
          triggerHook: 0.75
        })
        .setClassToggle('#' + breakID, 'is-active') // set class to active slide
        .on('enter', function(event) {
          $('#nav-dots').attr('class','is-light');
        })
        .addTo(controller);
    });

    // SCENE 3
    // change color of the nav back to dark
    slides.forEach(function(slide, index) {

      var slideScene = new ScrollMagic.Scene({
          triggerElement: slide // trigger CSS animation when header is in the middle of the viewport
        })
        .on('enter', function(event) {
          $('#nav-dots').removeAttr('class');
        })
        .addTo(controller);
    });


    // change behaviour of controller to animate scroll instead of jump
    controller.scrollTo(function(newpos) {
      TweenMax.to(window, 1, {
        scrollTo: {
          y: newpos
        },
        ease: Power1.easeInOut
      });
    });

    //  bind scroll to anchor links
    $(document).on("click", "a[href^='#']", function(e) {
      var id = $(this).attr("href");
      if ($(id).length > 0) {
        e.preventDefault();

        // trigger scroll
        controller.scrollTo(id);

        // if supported by the browser we can even update the URL.
        if (window.history && window.history.pushState) {
          history.pushState("", document.title, id);
        }
      }
    });

    
var navLinks=document.querySelectorAll('nav a');
Array.prototype.map.call(navLinks,function(item){
	item.addEventListener('click',function(e){
		var navlnks=document.querySelectorAll('nav a');
		Array.prototype.map.call(navlnks,function(item){if(item.parentNode.className=='active'||item.parentNode.className=='active open'){item.parentNode.className='';}});
		e.currentTarget.parentNode.className='active';
	});
});
    
    
    
  }

}(jQuery));