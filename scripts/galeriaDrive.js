API_KEY = 'AIzaSyBx3yoP-mk42v-UYlIdyjKLnzmdqZ8SL6s';
FOLDER_ID = '1uUo_5jqutKrO_NMm6OQTzg8n0D8vrppM';
gallery = document.getElementById('galeriaDinamic');

async function fetchImages() {
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image/'+and+trashed=false&key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    data.files.forEach(file => {
      const img = document.createElement('img');
      img.src = `https://drive.google.com/uc?id=${file.id}`;
      img.alt = file.name;
      img.style.width = '200px';
      img.style.margin = '10px';
      gallery.appendChild(img);
    });
  }

fetchImages();