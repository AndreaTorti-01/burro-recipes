window.addEventListener('DOMContentLoaded', () => {
  const language = document.documentElement.lang;
  const recipeFolder = language === 'en' ? 'recipes/en/' : 'recipes/it/';

  fetch('recipes.json')
    .then(response => response.json())
    .then(files => {
      const listContainer = document.getElementById('recipes-list');
      listContainer.classList.add('recipes-grid');
      files.forEach((recipeFile) => {
        const link = document.createElement('a');
        link.href = recipeFolder + recipeFile;
        link.className = "recipe-link";
        
        const recipeName = document.createElement('span');
        fetch(recipeFolder + recipeFile)
          .then(r => r.text())
          .then(html => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            recipeName.textContent = doc.querySelector('h1')?.textContent || recipeFile.replace('.html', '');
          });
        link.appendChild(recipeName);
        
        const thumb = document.createElement('img');
        thumb.src = `images/${recipeFile.replace('.html', '.webp')}`;
        thumb.style.width = "100px";
        thumb.style.height = "auto";
        link.appendChild(thumb);
        
        listContainer.appendChild(link);
      });
    });
});
