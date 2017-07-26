module.exports = function(grunt){

    grunt.initConfig({
        watch:{
            pug:{
                files:['views/**'],
                options:{
                    livereload:true
                }
            },
            js:{
                files:['public/js/**','models/**/*.js','schemas/**/*.js'],
                // tasks:['jshint'],
                options:{
                    livereload:true
                }
            },
            nodemon:{
                dev:{
                    script:'app.js',
                    options:{
                        // file:'app.js',
                        args:[],
                        nodeArgs:['--debug'],
                        // ignoreFiles:['README.md','node_modules/**','.DS_Store'],
                        ignore:['README.md','node_modules/**','.DS_Store'],
                        ext:'js',
                        watch:['./'],
                        delay:1000,
                        // watchedExtensions:['js'],
                        // watchedFolders:['app','config'],
                        // debug:true,
                        // delayTime:1,
                        env:{
                            PORT:'3000'
                        },
                        cwd:__dirname
                    }
                }
            },
            concurrent:{
                target:{
                    tasks:['nodemon','watch'],
                    options:{
                        logConcurrentOutput:true
                    }
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')


    grunt.option('force',true)
    grunt.registerTask('default',['concurrent:target'])
}