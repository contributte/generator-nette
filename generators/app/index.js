'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the delightful ' + chalk.red('Nette') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'composer',
      message: 'Would you like to install dependencies via Composer?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {

    this.fs.copy(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json')
    );

    this.fs.copy(
      this.templatePath('yo-rc.json'),
      this.destinationPath('.yo-rc.json')
    );

    this.directory(
      this.templatePath('app'),
      this.destinationPath('app')
    );
    this.directory(
      this.templatePath('www'),
      this.destinationPath('www')
    );
    this.directory(
      this.templatePath('log'),
      this.destinationPath('log')
    );
    this.directory(
      this.templatePath('temp'),
      this.destinationPath('temp')
    );
    // todo change chmod? fs.chmodr ?

  },

  install: function () {
    if (this.props.composer){
      this.spawnCommand('composer', ['install']);
    }
  }
});
