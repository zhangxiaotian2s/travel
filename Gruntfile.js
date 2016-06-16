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
     ]
     }
    },
     concat: {
     options: {
        banner: '/*!zhangxiaotian2s  <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      basic_and_extras: {
        files: {
          'dest/angular.js': ['app/angular/angular.js', 'app/angular/angular-ui-router.js', 'app/angular/angular-touch.js','app/angular/angular-animate.js'],
          'dest/script.js': ['app/script/service/*.js','app/script/directive/*.js','app/script/filter/*.js','app/script/controller/*.js'],
        }
      }
    },
    uglify: {
      build: {
        src: 'dest/angular.js',
        dest: 'dest/angular.min.js'
      }
    }
  });
  // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // 默认任务
  grunt.registerTask('default', ['copy','concat']);
}