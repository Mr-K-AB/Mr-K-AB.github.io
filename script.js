// script.js

const messengerAppLinkInput = document.getElementById('messenger-app-link');
const messengerAppThumbnailContainer = document.getElementById('messenger-app-thumbnail');

messengerAppLinkInput.addEventListener('input', () => {
  const githubLink = messengerAppLinkInput.value;

  if (githubLink) {
    const repositoryName = githubLink.split('/').pop().replace('.git', '');
    const thumbnailUrl = `https://opengraph.githubassets.com/1/${repositoryName}`;

    messengerAppThumbnailContainer.innerHTML = `<img src="${thumbnailUrl}" alt="GitHub Repository Thumbnail">`;
  } else {
    messengerAppThumbnailContainer.innerHTML = '';
  }
});
