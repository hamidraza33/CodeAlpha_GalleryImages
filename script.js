//Select all filter buttons

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

//Select lightbox modal

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

//Category filtering logics
//Loop through each filter buttons user to click
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        //remove from active all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        //Show/hide logic
        //Read the filter category value 
        const filterValue = button.getAttribute('data-filter');

        //Loop through every individual gallery item
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            //Show the item if "all" is selected OR if the item category matches the filter value

            if(filterValue === 'all' || itemCategory ===filterValue){
                item.style.display = 'block'; //display the card
            } else{
                item.style.display = 'none';  //hide the card
            }
        });


    });
});
//Loop through each gallery  item cards to listeners for click
//Opening the lightbox model

galleryItems.forEach((item) => {
    const img = item.querySelector('img');
    //When an image inside a card is clicked
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});
//Closing the lightbox modal
//Close the lightbox modal when 'X' is close button clicked 
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

//Also close the lightbtn if the user clicked on dark background overlay

lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox){
        lightbox.style.display = 'none';
    }
});

//track

let visibleItems = [];
let currentVisibleIndex = 0;

function getVisibleItems() {
    return Array.from(galleryItems).filter(item => item.style.display !== 'none');
}

galleryItems.forEach((item) => {
    const img = item.querySelector('img');
    img.addEventListener('click', () => {
        visibleItems = getVisibleItems();
        currentVisibleIndex = visibleItems.indexOf(item);

        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });

});

function showImg(index){
    if (visibleItems.length === 0) return;

    if(index >= visibleItems.length) {
        currentVisibleIndex = 0;
    } else if (index < 0) {
        currentVisibleIndex = visibleItems.length -1;
    } else {
        currentVisibleIndex = index;
    }

const targetImg = visibleItems[currentVisibleIndex].querySelector('img');
lightboxImg.src = targetImg.src;    
}

nextBtn.addEventListener('click', () => {
    showImg(currentVisibleIndex + 1);
});

prevBtn.addEventListener('click', () => {
    showImg(currentVisibleIndex - 1);
});