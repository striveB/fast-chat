# fast-chat 开发记录

# 一、前端

## 1.1 技术栈

`vite` 、`vue3`、`pinia`、`vue-router`、`axios`、`less`

## 1.2 构建项目

```bash
# 创建vite项目
npm init vite@latest fast-chat-web -- --template vue-ts

# 安装pinia
npm i pinia -D

# 安装vue-router
npm i vue-router -D

# 安装axios
```

## 1.3 安装代码规范

- `eslint`：可组装的JavaScript和JSX检查工具，简单说就是一款语法检测工具。

- `prettier`：代码格式化工具。

- 区别：eslint更注重于语法，prettier更关注于格式

```
#安装eslint
npm install --save-dev eslint eslint-plugin-vue

#安装prettier
npm install --save-dev prettier eslint-plugin-prettier @vue/eslint-config-prettier

#安装typescript支持
npm install --save-dev @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

**版本**

> 版本要求比较高 这里列出所有版本 建议把这段直接复制到`package.json`中再使用`npm install`进行安装

```javascript
"devDependencies": {
    "@typescript-eslint/eslint-plugin": "^4.31.0",
    "@typescript-eslint/parser": "^4.31.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "@vue/eslint-config-typescript": "^7.0.0",
    "eslint": "^7.32.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^7.17.0",
    "prettier": "^2.4.0",
}
```

参考：[vite+vue3项目使用 eslint+prettier](https://talktocomputer.site/blogs/152/)

## 1.4 安装less

```bash
# 安装less
npm install less --save

# 安装less-loader
npm install less-loader@7.x --save-dev
```

在`vite.config.ts`文件配置全局less样式

```javascript
css: {
  // css预处理器
  preprocessorOptions: {
    less: {
      charset: false,
      additionalData: '@import "./src/assets/style/global.less";',
    },
  },
},
```

<mark>`@imort`最后的分号(;)一定要加上不然会报错</mark>

参考：[vite项目使用全局样式(less|scss) - 简书](https://www.jianshu.com/p/4dd7cb87eae3)

# 二、后端

## 2.1 技术栈

`nest`

## 2.2 构建项目

```bash
nest new fast-chat-server
```

# 三、遇到的问题

## 3.1 在ts中不可以使用require('XXX')

如果想在`ts`中写`node`需要安装如下依赖：

```bash
npm install @types/node --save-dev
```

## 3.2 使用require('xxx') eslint报错

错误信息：<mark># Require statement not part of import statement.(@typescript-eslint/no-var-requires)</mark>

需要在`.eslintrc.js`中配置：

```javascript
rules: {
	'@typescript-eslint/no-var-requires': 0
}
```

参考：[小草莓蹦蹦跳的博客-CSDN博客](https://blog.csdn.net/qq_38290251/article/details/112170092)

## 3.3 vite中配置"@"为路径别名

vite创建的vue3项目中默认不能时使用`@`，需要配置别名，首先安装如下依赖：

```bash
npm i @rollup/plugin-alias -D
```

然后在`vite.config.ts`中配置（[vite官方配置文档](https://vitejs.cn/config/#resolve-alias)）：

```javascript
const { resolve } = require('path');
const srcPath = resolve(__dirname, 'src');
export default defineConfig({
	//配置路径别名
	resolve: {
		alias: [
			{
				find: '@',
				replacement: srcPath
			}
		]
	}
});
```

# 四、插件安装

## 4.1 enquire.js

响应css媒体查询的轻量级Javascript库

**安装**

```bash
npm install enquire.js
```