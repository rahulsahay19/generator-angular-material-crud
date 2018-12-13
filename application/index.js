var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var validate = require('validate-npm-package-name');
var uuid = require('uuid/v4');
var mkdirp = require('mkdirp');
var process = require('process');

module.exports = class extends yeoman {

    /** Ask for user input */
    prompting() {
        this.log(yosay('You are about to create a Sample Angular Material CRUD Application!'));
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your application name (Eg: my-application-name): ',
            validate: function (input) {
                if (!validate(input).validForNewPackages) {
                    return 'The name is not a valid npm package name. Please choose a valid name i.e. my-application-name';
                }
                return true;
            }
        },{
            type: 'input',
            name: 'port',
            message: 'Development port of the application: ',
            default: '4300',
            validate: function (input) {
                var portNumber = +input;
                var portNumberValid = portNumber >= 1 && portNumber <= 65535;
                if (!portNumberValid) {
                    return 'This is not a valid HTTP port number. Please choose a valid port i.e. 4300';
                }
                return true;
            }
        },{
            type: 'input',
            name: 'authorname',
            message: 'Author Name (Eg: Rahul Sahay): ',
            validate: function (input) {
                var validName = /^(?! )((?!  )(?! $)[a-zA-Z0-9 ]){3,64}$/.test(input);
                if (!validName) {
                    return 'Not a valid author name.  Max length is 64 characters.  Trailing or Forward spaces not allowed.';
                }
                return true;
            }
        },{
            type: 'input',
            name: 'version',
            message: 'Version: ',
            default: '1.0.0',
            validate: function (input) {
                var validVersion = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(\-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$/.test(input);
                if (!validVersion) {
                    return 'This is not a valid version number.';
                }
                return true;
            }
        }]).then(answers => {
            this.props = answers;
            this.log('Creating application: ' + answers.name);
        });
    }

    /** Writing files to disk */
    writing() {
        this.log('Copying files...');
        mkdirp.sync(this.props.name);
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath(this.props.name +'/package.json'), {
                name: this.props.name,
                version: this.props.version,
                authorname: this.props.authorname
            }
        );
        this.fs.copyTpl(
            this.templatePath('_package.publish.json'),
            this.destinationPath(this.props.name +'/package.publish.json'), {
                name: this.props.name,
                version: this.props.version,
                authorname: this.props.authorname
            }
        );
        this.fs.copyTpl(
            this.templatePath('_angular.json'),
            this.destinationPath(this.props.name +'/angular.json'), {
                name: this.props.name,
                port: this.props.port,
            }
        );
        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath(this.props.name +'/README.md'), {
                name: this.props.name,
                port: this.props.port,
            }
        );
        
		this.fs.copy(this.templatePath('_.editorconfig'), this.destinationPath(this.props.name +'/.editorconfig'));
        this.fs.copy(this.templatePath('_.gitignore'), this.destinationPath(this.props.name +'/.gitignore'));
        this.fs.copy(this.templatePath('_tsconfig.json'), this.destinationPath(this.props.name +'/tsconfig.json'));
        this.fs.copy(this.templatePath('_tslint.json'), this.destinationPath(this.props.name +'/tslint.json'));

        // Copy folders
        this.fs.copyTpl(this.templatePath('src'), this.destinationPath(this.props.name +'/src'), {
            name: this.props.name,
            port: this.props.port
        });
        this.fs.copyTpl(this.templatePath('e2e'), this.destinationPath(this.props.name +'/e2e'), {
            name: this.props.name,
            port: this.props.port
        });
    }

    install() {
        // Install npm dependencies
        this.log('Installing dependencies...');
        process.chdir(this.props.name);
        this.npmInstall();
    }

    end() {
        this.log('Application ' + this.props.name + ' created.');
        this.log('');
        this.log('For more info, you can check details on https://myview.rahulnivi.net. Application developed by Rahul Sahay!');
        this.log('Goodbye.');
    }
};