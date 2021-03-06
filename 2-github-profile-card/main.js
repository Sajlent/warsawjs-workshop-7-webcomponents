
class ProfileCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        let $tmpl = ProfileCard.DOCUMENT.querySelector('#profile-card-template').content;
        let $cloned = $tmpl.cloneNode(true);

        this.shadow.appendChild($cloned);
        this.fetchProfileDetails(this.attributes.login.value);
    }

    fetchProfileDetails(login) {
        // let url = 'https://api.github.com/users/' + login;
        let url = '../data/profile.json';

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
        let url = '../data/repos.json';

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
        let sorted = repos.sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
        });

        sorted.forEach((el, i) => {
            let repo = el;
            if (i < 9) {
                repoList += `<li><span>&#9733; ${repo.stargazers_count}</span>
                    <a href="${repo.html_url}">${repo.name}</a></li>`;
            }
        });

        this.shadow.querySelector('ul').innerHTML = repoList;
    }
}

ProfileCard.DOCUMENT = document.currentScript.ownerDocument;

window.customElements.define('profile-card', ProfileCard);

