Portfolio
---------
http://www.mikeswork.info

This is a site built in React using Styled Components (plus the DOM Router, Router Hash Links, SASS, and Basiclightbox node packages.)

The challenge was creating a page that displays a floating header, which is initially hidden, and then shows up to indicate the current section as the user scrolls/clicks to scroll through them. It was interesting to use the DOM IntersectionObserver object to keep track of where the user is in the overall page and then to make visual/route updates accordingly. Extracting this logic out into util/useScrolledTo.js and importing it into the components that require it felt like an elegant approach.