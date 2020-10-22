const Generator = require('yeoman-generator');
const chalk = require('chalk');
const assert = require('assert');
const { getGlobalGitConfig } = require('./util');

const reactTsTpl = 'React + TypeScript';
const templateList = [reactTsTpl];

const ruleFiles = ['babelrc', 'gitignore', 'eslintrc', 'eslintignore', 'prettierrc'];

const gitUser = getGlobalGitConfig().user || {};

module.exports = class extends Generator {
  _writeFile(templatePath, destinationPath, params) {
    if (!this.fs.exists(destinationPath)) {
      this.fs.copyTpl(templatePath, destinationPath, params);
    }
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'applicationName',
        required: true,
        message: '项目名称',
        validate: (input) => !!input.trim(),
      },
      {
        type: 'input',
        name: 'applicationDesc',
        message: '项目描述',
      },
      {
        type: 'input',
        name: 'authorName',
        message: '开发者名称',
        default: gitUser.name,
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: '开发者邮件',
        default: gitUser.email,
      },
      {
        type: 'input',
        name: 'abcJson',
        required: true,
        message: '是否使用 abc.json 文件? (y/n)',
      },
      {
        type: 'list',
        name: 'templateName',
        required: true,
        message: '请选择项目模板',
        choices: templateList,
      },
    ]).then((data) => {
      this.data = data;
    });
  }

  writing() {
    const { applicationName, templateName, applicationDesc, abcJson, authorName, authorEmail } = this.data;
    const path = templateName === reactTsTpl ? 'typescript' : null;
    const useAbcJson = abcJson.toLowerCase() === 'y';

    assert(path, '还没有对应的模板哦~');

    const variables = {
      applicationName,
      applicationDesc,
      templateName,
      authorName,
      authorEmail,
    };

    this.fs.copy(this.templatePath(`${path}/**/*`), this.destinationPath(applicationName), {
      globOptions: {
        dot: true,
        ignore: [
          '**/node_modules',
          '**/package.json',
          '**/package-lock.json',
          '**/yarn.lock',
          '**/index.html',
          '**/README.md',
          '**/.npmignore',
          '**/.DS_Store',
          ...ruleFiles.map((f) => `**/${f}`),
          !useAbcJson ? '**/abc.json' : null,
        ].filter(Boolean),
      },
    });

    ruleFiles.map((f) =>
      this._writeFile(this.templatePath(`${path}/${f}`), this.destinationPath(applicationName, `.${f}`))
    );

    this._writeFile(
      this.templatePath('common/package.json.ejs'),
      this.destinationPath(applicationName, 'package.json'),
      variables
    );

    this._writeFile(
      this.templatePath('common/README.md.ejs'),
      this.destinationPath(applicationName, 'README.md'),
      variables
    );
  }

  install() {
    const { applicationName } = this.data;

    this.log(chalk.cyan('\nInstalling dependencies with npm...\n'));

    this.npmInstall(null, {}, { cwd: applicationName });
  }

  end() {
    const { applicationName } = this.data;

    this.log(chalk.cyan('\nSetup complete. Happy coding!\n'));
    this.log(chalk.yellow(`Tip: Build instructions can be found in the ${applicationName}/README.md file.\n`));
  }
};
