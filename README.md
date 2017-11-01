
![WiM logo](wimlogo.png)  

Lili 
============
This is the Laboratory Information Management System for the Laboratory for Infectious Disease and Environment.

Laboratory for Infectious Disease and Environment = **LIDE**  | Laboratory Information Management System = **LIMS**


**LI** DE  **LI** MS  = Lili 

This codebase is the front-end client/web application built in Angular and using the Clarity UI framework by VMWare


#### Installation
*Prerequisite*: Please install Angular-CLI by following [these instructions](https://github.com/angular/angular-cli#installation).

```bash
git clone https://github.com/USGS-WiM/lide-lims.git
cd lide-lims

# install the project's dependencies
yarn # or run "npm install"

# starts the application in dev mode and watches your files for livereload
ng serve
```

#### Test and build scripts

```bash
# running unit tests
ng test

# running e2e tests
ng e2e

# dev build
ng build

# prod build
ng build --prod --bh ./
```

## Built With

* [Angular](https://angular.io/) - The main web framework used
* [Clarity UI](https://vmware.github.io/clarity/) - Top-level UI framework if you have one 
* [NPM](https://www.npmjs.com/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md]() for details on the process for submitting pull requests to us. Please read [CODE_OF_CONDUCT.md]() for details on adhering by the [USGS Code of Scientific Conduct](https://www2.usgs.gov/fsp/fsp_code_of_scientific_conduct.asp).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/USGS-WiM/lili/tags). 

Advance the version when adding features, fixing bugs or making minor enhancement. Follow semver principles. To add tag in git, type git tag v{major}.{minor}.{patch}. Example: git tag v2.0.5

To push tags to remote origin: `git push origin --tags`

*Note that your alias for the remote origin may differ.

## Authors

* **[Blake Draper](https://www.usgs.gov/staff-profiles/blake-a-draper)**  - *Lead Developer* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)


See also the list of [contributors](https://github.com/USGS-WiM/lili/graphs/contributors) who participated in this project.

## License

This project is licensed under the Creative Commons CC0 1.0 Universal License - see the [LICENSE.md](LICENSE.md) file for details

## Suggested Citation
In the spirit of open source, please cite any re-use of the source code stored in this repository. Below is the suggested citation:

`This project contains code produced by the Web Informatics and Mapping (WIM) team at the United States Geological Survey (USGS). As a work of the United States Government, this project is in the public domain within the United States. https://wim.usgs.gov`


## About WIM
* This project authored by the [USGS WIM team](https://wim.usgs.gov)
* WIM is a team of developers and technologists who build and manage tools, software, web services, and databases to support USGS science and other federal government cooperators.
* WiM is a part of the [Upper Midwest Water Science Center](https://www.usgs.gov/centers/wisconsin-water-science-center).

=======
# lili
v2 LIMS for LIDE

