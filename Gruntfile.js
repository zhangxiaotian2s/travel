module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
     main: {
      files: [
        {expand: true,cwd: 'app', src: ['images/**'], dest: 'dest' },
        {expand: true,cwd: 'app', src: ['style/**'], dest: 'dest' },
        {expand: true,cwd: 'app', src: ['views/**'], dest: 'dest' },
        {expand: true,cwd: 'app', src: ['index.html'], dest: 'dest' },
        {expand: true,cwd: 'app', src: ['script/app.js'], dest: 'dest' },
        {expand: true,cwd: 'app', src: ['script/zeptoandtouch.js'], dest: 'dest' }
     ]
     }
    },
     concat: {
     options: {
        banner: '/*!zhangxiaotian2s  <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      basic_and_extras: {
        files: {
          'dest/script/angular.js': ['app/angular/angular.js', 'app/angular/angular-touch.js','app/angular/angular-animate.js','app/angular/angular-cookies.js','app/angular/angular-ui-router.js'],
          'dest/script/script.js': ['app/script/service/*.js','app/script/directive/*.js','app/script/filter/*.js','app/script/controller/*.js','app/script/app.js'],
        }
      }
    },
     uglify: {
      my_target: {
        files: {
          'dest/script/angular.min.js': ['dest/script/angular.js'],
            'dest/script/script.min.js':['dest/script/script.js']
        }
      }
    }
  });
  // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // 默认任务
  grunt.registerTask('default', ['copy','concat','uglify']);
}