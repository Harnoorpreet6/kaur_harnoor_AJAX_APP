(() => {
  
  

    //VARIABLES
    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector('#material-template');
    const materialList = document.querySelector('#material-list');
    const container1 = document.querySelector('#container1');
    const container2 = document.querySelector('#container2');
    const loader = document.querySelector("#loader");
    //Info Boxes API https://swiftpixel.com/earbud/api/infoboxes"
    //Material List API https://swiftpixel.com/earbud/api/materials"
  
    //FUNCTIONS
    function loadInfoBoxes() {
  
      //Add loading indicator
  
      //make AJAX call here
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        console.log(infoBoxes.results);
  
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
  
          const imageElement = document.createElement('img');
          imageElement.src = `images/${infoBox.thumbnail}`;
    
          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;
    
          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;
  
          //Add images
    
          selected.appendChild(imageElement);
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
  
      })
      .catch(error => {
        console.log(error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Oops, something went wrong. Please check your internet connection or try again later.';
        container1.appendChild(errorMessage);
        // loader.classList.toggle('hidden');
    });
      //Add erorr message
  
    }
    
    loadInfoBoxes();
  
    function loadMaterialInfo() {
  
     
  
      fetch("https://swiftpixel.com/earbud/api/matrerials")
      .then(response => response.json())
      .then(materialListData => {
  
        materialListData.forEach(material => {
          //Clone the template
          const clone = materialTemplate.content.cloneNode(true);
          //Populate template
          const materialHeading = clone.querySelector('.material-heading');
          materialHeading.textContent = material.heading;
          
          const materialDescription = clone.querySelector('.material-description');
          materialDescription.textContent = material.description;
  
          materialList.appendChild(clone);
        });
  
      })
      .catch(error => {
        console.log(error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Unable to process your request at the moment. Please try again later or check your network connection.';
        container2.appendChild(errorMessage);
        loader.classList.toggle('hidden');
    });
      //Add error message
  
    }
   
  
    loadMaterialInfo();
    
   
   
  
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    //EVENT LISTENERS
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  
  })();
  
  