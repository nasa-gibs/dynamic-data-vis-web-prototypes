# dynamic-data-vis-web-prototypes

## Adding an existing repository
1. `git clone https://github.com/nasa-gibs/dynamic-data-vis-web-prototypes.git`
2. `cd dynamic-data-vis-web-prototypes`
3. `git remote add {repository-name} {repository-url}`
4. `git fetch {repository-name}`
5. `git subtree add --prefix={directory-name} {repository-name}/{branch} --squash`
6. `git commit -m "Adding subtree {repository-name}"`
7. `git push`