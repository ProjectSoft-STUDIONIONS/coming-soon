module.exports = function(grunt) {
	require('dotenv').config();
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	const fonts = parseInt(process.env.fonts) || false;
	var fs = require('fs'),
		chalk = require('chalk'),
		PACK = grunt.file.readJSON('package.json'),
		uniqid = function (file) {
			var md5 = require('md5');
			//console.log('READ:', file);
			if(file && fs.existsSync(file)) {
				result = md5(new Date(fs.statSync(file).mtime).getTime()).toString();
			}else{
				result = md5((new Date()).getTime()).toString();
			}
			//grunt.verbose.writeln("Generate hash: " + chalk.cyan(result) + " >>> OK");
			return result;
		};
	
	var gc = {
		default: [
			"ttf2eot",
			"ttf2woff",
			"ttf2woff2",
			"uglify",
			"less",
			"autoprefixer",
			"cssmin",
			"pug"
		],
	};

	if(fonts){
		gc.default.splice(0, 3);
	}

	grunt.log.oklns("");
	grunt.log.oklns(gc.default);
	grunt.log.oklns("");

	grunt.initConfig({
		globalConfig : gc,
		pkg : PACK,
		ttf2eot: {
			default: {
				src: 'assets/templates/comingsoon/fonts/*.ttf',
				dest: 'assets/templates/comingsoon/fonts/'
			}
		},
		ttf2woff: {
			default: {
				src: 'assets/templates/comingsoon/fonts/*.ttf',
				dest: 'assets/templates/comingsoon/fonts/'
			}
		},
		ttf2woff2: {
			default: {
				src: 'assets/templates/comingsoon/fonts/*.ttf',
				dest: 'assets/templates/comingsoon/fonts/'
			}
		},
		uglify: {
			options: {
				sourceMap: false,
				compress: {
					drop_console: false
	  			}
			},
			app: {
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/js/main.js'
						],
						dest: 'assets/templates/comingsoon/js',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + src.replace('.js', '.min.js');
						}
					}
				]
			}
		},
		less: {
			css: {
				options : {
					compress: false,
					ieCompat: false,
					plugins: [],
					modifyVars: {
						"hash": uniqid(),
					}
				},
				files : {
					'assets/templates/comingsoon/css/main.css' : [
						'src/less/main.less'
					],
					'src/pug/inline.css': [
						'src/less/inline.less'
					]
				}
			},
		},
		autoprefixer:{
			options: {
				browsers: [
					"last 4 version"
				],
				cascade: true
			},
			css: {
				files: {
					'assets/templates/comingsoon/css/main.css' : [
						'assets/templates/comingsoon/css/main.css'
					],
					'src/pug/inline.css' : [
						'src/pug/inline.css'
					],
				}
			},
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			minify: {
				files: {
					'assets/templates/comingsoon/css/main.min.css' : ['assets/templates/comingsoon/css/main.css'],
					'src/pug/inline.css': ['src/pug/inline.css'],
				}
			},
		},
		pug: {
			tpl: {
				options: {
					doctype: 'html',
					client: false,
					//pretty: '\t',
					//separator:  '\n',
					pretty: '',
					separator:  '',
					data: function(dest, src) {
						return {
							"dev":       false,
							"hash":      uniqid(),
							"hash_css":  uniqid(__dirname + "/assets/templates/comingsoon/css/main.min.css"),
							"hash_js": 	 uniqid(__dirname + "/assets/templates/comingsoon/js/main.min.js"),
						}
					}
				},
				files: [
					{
						expand: true,
						cwd: __dirname + '/src/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/assets/templates/comingsoon/',
						ext: '.tpl'
					},
				]
			},
			php: {
				options: {
					doctype: 'html',
					client: false,
					//pretty: '\t',
					//separator:  '\n',
					pretty: '',
					separator:  '',
					data: function(dest, src) {
						return {
							"dev":       true,
							"hash":      uniqid(),
							"hash_css":  uniqid(__dirname + "/assets/templates/comingsoon/css/main.min.css"),
							"hash_js": 	 uniqid(__dirname + "/assets/templates/comingsoon/js/main.min.js"),
						}
					}
				},
				files: [
					{
						expand: true,
						cwd: __dirname + '/src/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/',
						ext: '.php'
					}
				]
			}
		}
	});
	grunt.registerTask('default',	gc.default);
};
