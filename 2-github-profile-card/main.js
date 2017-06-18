class ProfileCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
        console.log('test test');

    }

    connectedCallback() {
        let $tmpl = document.currentScript.ownerDocument.querySelector('template').content;
        let $cloned = $tmpl.cloneNode(true);

        this.shadow.appendChild($cloned);
        this.fetchProfileDetails(this.attributes.login.value);
    }

    fetchProfileDetails(login) {
        // let url = 'https://api.github.com/users/' + login;
        let url = './profile.json';

        let options = { method: 'GET' };
        return fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .then((profile) => {
                this.displayProfile(profile);
                this.fetchRepos(login);
            })
    }

    fetchRepos(login) {
        let url = './repos.json';

        let options = { method: 'GET' };
        return fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .then((repos) => {
                this.displayRepos(repos);
            })
    }

    displayProfile(profile) {
        this.shadow.querySelector('img').attributes.src.value = profile.avatar_url;
        this.shadow.querySelector('h2').innerText = profile.name;
        this.shadow.querySelector('.bio').innerText = profile.bio;
        this.shadow.querySelector('.location').innerText = profile.location;
    }

    displayRepos(repos) {
        let repoList = '';

        repos.forEach((el, i) => {
            let repo = el;
            if (i < 9) {
                repoList += `<li><span>&#9733; ${repo.stargazers_count}</span> 
                    <a href="${repo.url}">${repo.name}</a></li>`;
            }
        });

        this.shadow.querySelector('ul').innerHTML = repoList;
    }
}

window.customElements.define('profile-card', ProfileCard);

