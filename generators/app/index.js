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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['babelrc', 'gitignore', 'eslintrc', 'eslintignore', 'prettierrc'],
  },
  'Nextjs + Koa + MUI + TypeScript': {
    path: 'nextjs-koa-mui',
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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['gitignore', 'eslintrc', 'prettierrc', 'stylelintrc.json'],
  },
  'Nextjs + MUI': {
    path: 'nextjs-mui',
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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['gitignore', 'eslintrc', 'prettierrc'],
  },
  'Nextjs + MUI + Prisma': {
    path: 'nextjs-mui-prisma',
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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['gitignore', 'eslintrc', 'prettierrc', 'env'],
  },
  'Vite + React + TypeScript': {
    path: 'vite-react-ts',
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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['gitignore', 'prettierrc'],
  },
  'Vite + React + Tailwind': {
    path: 'vite-react-tailwind',
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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['gitignore', 'eslintrc', 'eslintignore', 'prettierrc'],
  },
  'Vite + MUI + TypeScript': {
    path: 'vite-mui-ts',
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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['gitignore', 'eslintrc', 'eslintignore', 'prettierrc'],
  },
  'NPM Package': {
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
    ],
    ejsTplFiles: ['package.json.ejs', 'README.md.ejs'],
    ruleFiles: ['babelrc.js', 'gitignore', 'eslintrc', 'eslintignore', 'prettierrc', 'npmignore'],
  },
};

module.exports = class extends Generator {
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
    const initPrompt = await this.prompt([
      {
        type: 'confirm',
        name: 'initGit',
        required: true,
        message: '是否初始化 git 仓库',
        default: true,
      },
      {
        type: 'list',
        name: 'packageManager',
        required: true,
        message: '自动安装项目依赖',
        default: '',
        choices: [
          { name: '不安装', value: '' },
          { name: 'npm', value: 'npm' },
          { name: 'yarn', value: 'yarn' },
          { name: 'pnpm', value: 'pnpm' },
        ],
      },
    ]);
    this.config = { templateName, ...otherAttrs, ...initPrompt };
  }

  writing() {
    const { applicationName, templateName, applicationDesc, authorName, authorEmail, packageName } = this.config;
    const { path: tplPath, ejsTplFiles = [], ruleFiles = [] } = tplPathMap[templateName] || {};

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
          '**/README.md',
          '**/.npmignore',
          '**/.DS_Store',
          ...ejsTplFiles.concat(ruleFiles).map((f) => `**/${f}`),
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
    const { applicationName, initGit, packageManager } = this.config;
    if (initGit) {
      this._initGit();
    }

    if (packageManager) {
      this.log(chalk.cyan(`\nInstalling dependencies with ${packageManager}...\n`));
      // npm|yarn|pnpm install
      this.spawnCommandSync(packageManager, ['install'], {
        cwd: this.destinationPath(applicationName),
      });
    }
  }

  end() {
    const { applicationName } = this.config;
    this.log(chalk.cyan('\nSetup complete. Happy coding!'));
    this.log(chalk.yellow(`\nTips: Build instructions can be found in the ${applicationName}/README.md file.`));
    this.log(chalk.greenBright(`\n\ncd ${applicationName}\n\n`));
  }
};
