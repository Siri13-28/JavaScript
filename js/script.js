const items = document.querySelectorAll(".item");
const showAll = document.querySelector(".show-all-btn");
const contentSections = document.querySelectorAll(".about-content");

items.forEach((item) => {
  const content = item.querySelector(".content");
  const plusIcon = item.querySelector(".puls");
  const itemImages = document.querySelectorAll(".item img");

  const tl = gsap.timeline({ paused: true });

  tl.to(content, {
    opacity: 1,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    duration: 0.5,
    ease: "power1.inOut"
  });

  tl.fromTo(
    plusIcon,
    { scale: 0 },
    { scale: 1.2, duration: 0.2, ease: "power2.inOut" }
  );

  item.addEventListener("mouseenter", () => {
    tl.play();
  });

  item.addEventListener("mouseleave", () => {
    tl.reverse();
  });

  item.addEventListener("click", () => {
    items.forEach((otherItem, otherIndex) => {
          // Check if all items are hidden
    if (areAllItemsHidden()) {
      showAll.disabled = true; 
    } else {  
      showAll.disabled = false; 
    }

      if (otherItem !== item) {
        gsap.to(otherItem, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            otherItem.style.display = "none";
          }
        });

        gsap.to(itemImages, {
          opacity: 0,
          duration: 0.5
        });

      } else {
        gsap.to(content, {
          opacity: 0,
          onComplete: () => {
            content.style.display = "none";
            gsap.fromTo(
              itemImages[otherIndex],
              { opacity: 0, y: "50%", display: "none" },
              {
                opacity: 1,
                y: "0%",
                width: "200px",
                display: "block",
                duration: 0.5,
                ease: "power1.inOut"
              }
            );
            gsap.to(items, {
              margin: "0",
              onComplete: () => {
                items.forEach(item => {
                  item.style.pointerEvents = "none";
                });
              }
            })
          }
        });
      }
    });
  });
});

//Show all button
// Helper function to check if all items are hidden
function areAllItemsHidden() {
  return Array.from(items).every(item => item.style.display === "none");
};

showAll.addEventListener("click", () => {
  items.forEach((item) => {
    const content = item.querySelector(".content");
    const itemImage = item.querySelector("img");

    item.style.display = "block";
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
    item.style.marginLeft = "2%";

    // Reset image width
    gsap.to(itemImage, { width: "150px", duration: 0.5, opacity: 1 });
    content.style.display = "block";
    contentSections.forEach(content => {
      content.style.display = "none";
    });
    // Disable the Show All button again
  showAll.disabled = false;
  });
})

//Show About Content
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    contentSections.forEach(content => {
      content.style.display = "none";
    });
    gsap.to(items, {
      delay: 0.8, 
      onComplete: () => {
          contentSections[index].style.display = "block";
      }
    });
  })
});