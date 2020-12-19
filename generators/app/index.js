const Generator = require('yeoman-generator');
const chalk = require('chalk');
const assert = require('assert');
const { getGlobalGitConfig } = require('./util');

const gitUser = getGlobalGitConfig().user || {};

const tplPathMap = {
  'React + TypeScript': {
    path: 'typescript',
    prompt: [
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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['babelrc', 'gitignore', 'eslintrc', 'eslintignore', 'prettierrc'],
  },
  'npm-package': {
    path: 'npm-package',
    prompt: [
      {
        type: 'input',
        name: 'packageName',
        required: true,
        message: 'npm包名称',
        validate: (input) => !!input.trim(),
      },
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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['babelrc.js', 'gitignore', 'eslintrc', 'eslintignore', 'prettierrc', 'npmignore'],
  },
};

module.exports = class extends (
  Generator
) {
  _writeFile(templatePath, destinationPath, params) {
    if (!this.fs.exists(destinationPath)) {
      this.fs.copyTpl(templatePath, destinationPath, params);
    }
  }

  _initGit() {
    try {
      this.spawnCommandSync('git', ['init', '--quiet'], {
        cwd: this.destinationPath(this.config.applicationName),
      });
    } catch (e) {
      this.log(chalk.red('\nGit repo not initialized!\n'));
    }
  }

  async prompting() {
    const { templateName } = await this.prompt([
      {
        type: 'list',
        name: 'templateName',
        required: true,
        message: '请选择项目模板',
        choices: Object.keys(tplPathMap),
      },
    ]);
    const otherAttrs = await this.prompt(tplPathMap[templateName].prompt);
    this.config = { templateName, ...otherAttrs };
  }

  writing() {
    const { applicationName, templateName, applicationDesc, abcJson, authorName, authorEmail, packageName } = this.config;
    const { path: tplPath, ejsTplFiles = [], ruleFiles = [] } = tplPathMap[templateName] || {};
    const useAbcJson = abcJson.toLowerCase() === 'y';

    assert(tplPath, '还没有对应的模板哦~');

    const variables = {
      applicationName,
      applicationDesc,
      templateName,
      authorName,
      authorEmail,
      packageName,
    };

    this.fs.copy(this.templatePath(`${tplPath}/**/*`), this.destinationPath(applicationName), {
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
          ...ejsTplFiles.concat(ruleFiles).map((f) => `**/${f}`),
          !useAbcJson ? '**/abc.json' : null,
        ].filter(Boolean),
      },
    });

    ruleFiles.forEach((f) =>
      this._writeFile(this.templatePath(`${tplPath}/${f}`), this.destinationPath(applicationName, `.${f}`))
    );

    ejsTplFiles.forEach((f) =>
      this._writeFile(
        this.templatePath(`${tplPath}/${f}`),
        this.destinationPath(applicationName, f.replace('.ejs', '')),
        variables
      )
    );
  }

  install() {
    this._initGit();

    const { applicationName } = this.config;

    this.log(chalk.cyan('\nInstalling dependencies with npm...\n'));

    this.npmInstall(null, {}, { cwd: applicationName });
  }

  end() {
    const { applicationName } = this.config;

    this.log(chalk.cyan('\nSetup complete. Happy coding!\n'));
    this.log(chalk.yellow(`Tip: Build instructions can be found in the ${applicationName}/README.md file.\n`));
  }
};
