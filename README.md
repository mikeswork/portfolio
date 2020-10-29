Portfolio
---------
http://www.mikeswork.info

This is a scalable, responsive site built in React using the Styled Components, DOM Router, Router Hash Links, SASS, and Basiclightbox node packages.

It was an interesting challenge to display a floating header, which is initially hidden, and then displays to indicate the current section when the user browses through them (either by scrolling down the page or by using the navigation buttons). The right strategy turned out to be using the DOM IntersectionObserver object to keep track of where the user is in the overall page and then to make visual/route updates accordingly (to display/hide the floating header and change which nav button gets a selected state). Extracting this logic out into util/useScrolledTo.js, and importing it as a state hook into the components that should respond to scrolling, felt like an elegant approach.