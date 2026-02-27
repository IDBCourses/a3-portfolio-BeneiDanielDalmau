//waiting for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // we grab what we need
  let slides = document.querySelector(".slides");
  let thumbnails = document.querySelectorAll(".thumbnails img");

  slides.addEventListener("wheel", (event) => {
    //we are listening to scrolling when cursor on top of .slides
    event.preventDefault(); //stop default scrolling
    slides.scrollBy({ left: event.deltaY, behavior: "smooth" }); //scrollLeft conflicts with scroll-snap-type: mandatory, so we switched to scrollBy to force horizontal scroll
  });

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
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle("active", i === imageIndex);
      });
    }
  });
});
