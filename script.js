//waiting for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // we grab what we need
  const slides = document.querySelector(".slides");
  // const thumbnails = document.querySelectorAll(".thumbnails img");

  console.log("slides found:", slides); //ctrl
  console.log("slides scrollWidth:", slides.scrollWidth); //ctrl
  console.log("slides clientWidth:", slides.clientWidth); //ctrl

  slides.addEventListener(
    "wheel",
    (event) => {
      //we are listening to scrolling when cursor on top of .slides
      console.log("wheel fired", event.deltaY); //ctrl
      event.preventDefault(); //stop default scrolling
      slides.scrollBy({ left: event.deltaY, behavior: "smooth" }); //scrollLeft conflicts with scroll-snap-type: mandatory, so we switched to scrollBy to force horizontal scroll
      console.log("scrollLeft is now:", slides.scrollLeft); //ctrl
    },
    { passive: false },
  );

  slides.addEventListener("scroll", () => {
    //we are tracking scrolling here
    let containerCenterX =
      slides.getBoundingClientRect().left + slides.offsetWidth / 2;
    let containerCenterY =
      slides.getBoundingClientRect().top + slides.offsetHeight / 2;
    let centerImg = document.elementFromPoint(
      //we id the current active image by checking the center of the galery container
      containerCenterX,
      containerCenterY,
    );

    if (centerImg && centerImg.tagName === "IMG") {
      //checking if there is an image if the center
      let imagesArray = []; //turning NodeList from querySelectroAll to array
      slides.querySelectorAll("img").forEach((img) => {
        imagesArray.push(img);
      });
      let imageIndex = imagesArray.indexOf(centerImg);
      console.log("current slide index:", imageIndex);
    }
  });
});
