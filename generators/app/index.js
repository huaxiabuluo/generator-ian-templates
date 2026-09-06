const Generator = require('yeoman-generator');
const chalk = require('chalk');
const assert = require('assert');
const { getGlobalGitConfig } = require('./util');

const gitUser = getGlobalGitConfig().user || {};

const ejsTplFiles = ['package.json.ejs', 'README.md.ejs'];

const applicationPrompts = [
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
];

const tplPathMap = {
  'Nextjs + MUI + TypeScript': {
    path: 'nextjs-mui',
    desc: 'Next.js App Router + MUI + TypeScript 前端项目',
    prompt: applicationPrompts,
    ejsTplFiles,
    ruleFiles: ['gitignore', 'prettierrc', 'prettierignore'],
  },
  'Nextjs + MUI + Prisma': {
    path: 'nextjs-mui-prisma',
    desc: 'Next.js + MUI + Prisma 7（SQLite）全栈项目，含数据模型与种子数据',
    prompt: applicationPrompts,
    ejsTplFiles,
    ruleFiles: ['gitignore', 'prettierrc', 'prettierignore', 'env'],
  },
  'Nextjs + Tailwind + shadcn': {
    path: 'nextjs-tailwind-shadcn',
    desc: 'Next.js App Router + Tailwind CSS v4 + shadcn/ui 前端项目',
    prompt: applicationPrompts,
    ejsTplFiles,
    ruleFiles: ['gitignore', 'prettierrc', 'prettierignore'],
  },
  'Vite + React + TypeScript + Antd': {
    path: 'vite-react-ts',
    desc: 'Vite + React 19 + Ant Design + MobX + Less 前端项目',
    prompt: applicationPrompts,
    ejsTplFiles,
    ruleFiles: ['gitignore', 'prettierrc', 'prettierignore'],
  },
  'Vite + React + Tailwind + TypeScript': {
    path: 'vite-react-tailwind',
    desc: 'Vite + React 19 + Tailwind CSS v4 + Ant Design 前端项目',
    prompt: applicationPrompts,
    ejsTplFiles,
    ruleFiles: ['gitignore', 'prettierrc', 'prettierignore'],
  },
  'Vite + MUI + TypeScript': {
    path: 'vite-mui-ts',
    desc: 'Vite + React 19 + MUI + MobX + i18n 前端项目',
    prompt: applicationPrompts,
    ejsTplFiles,
    ruleFiles: ['gitignore', 'prettierrc', 'prettierignore'],
  },
  'React 组件库（NPM Package）': {
    path: 'npm-package',
    desc: 'Babel + Rollup 构建 React 组件库，输出 CommonJS / ESM / UMD',
    prompt: [
      {
        type: 'input',
        name: 'packageName',
        required: true,
        message: 'npm包名称',
        validate: (input) => !!input.trim(),
      },
      ...applicationPrompts.slice(1),
    ],
    ejsTplFiles,
    ruleFiles: ['babelrc.js', 'gitignore', 'npmignore', 'prettierrc', 'prettierignore'],
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
        choices: Object.entries(tplPathMap).map(([name, tpl]) => ({
          name: `${name} - ${tpl.desc}`,
          value: name,
        })),
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
        message: '自动安装项目依赖（模板统一使用 pnpm）',
        default: '',
        choices: [
          { name: '不安装', value: '' },
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
          '**/pnpm-lock.yaml',
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
      // pnpm install
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
