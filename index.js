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
        recipeName.textContent = recipeFile.replace('.html', '').replace(/\b\w/g, char => char.toUpperCase());
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
