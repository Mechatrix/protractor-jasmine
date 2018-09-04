module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      jshint: {
        files: ['gruntfile.js'],
        options: {
          // options here to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true
          }
        }
      }, 
      protractor: {
        options: {
          keepAlive: true,
          configFile: "protractor.conf.js",
          noColor:false,
          debug:false,
          webdriverManagerUpdate:false         
        },
        singlerun: {},
        SIT:{
          options: {         
            args:{ baseUrl: "https://sit.propertyware.com/pw/login.jsp",
                   params:{
                     login:{Normaluser:'jhedrick@amgnevada.com',
                            Normalpass:'Realpage12',
                            Enterpriseuser:'jwood@msrenewal.com',
                            Enterprisepass:'Realpage12'},
                     Environment: 'SIT'     
                     },                          
                  }
          }
        },
        SAT:{
          options: {         
            args:{ baseUrl: "https://sat.propertyware.com/pw/login.jsp",
            params:{
              login:{Normaluser:'jhedrick@amgnevada.com',
                     Normalpass:'Realpage12',
                     Shareto:'Jeff Hedrick',
                     Enterpriseuser:'jwood@msrenewal.com',
                     Enterprisepass:'Realpage12'}, 
              Environment: 'SAT'
                    },
            
          }
          }
        },
        OCR:{
          options: {         
            args:{ baseUrl: "https://ocr.propertyware.com/pw/login.jsp",
            params:{
              login:{Normaluser:'sathish.gattu@realpage.com',
                     Normalpass:'Realpage12',
                     Shareto:'Gattu Sathish',
                     Enterpriseuser:'leelaK@realpage.com',
                     Enterprisepass:'Realpage12'}, 
              Environment: 'OCR'  
                    },
          }
         }
        },
        PROD:{
          options: {         
            args:{ baseUrl: "https://app.propertyware.com/pw/login.jsp",
            params:{
              login:{Normaluser:'sathish.gattu@realpage.com',
                     Normalpass:'Realpage12',
                     Enterpriseuser:'leelaK@realpage.com',
                     Enterprisepass:'Tester123!'},
              Environment: 'PROD'        
               },
            }
          }
        },
        auto: {
          keepAlive: true,
          options: {
            args: {
              seleniumPort: 4444
            }
          }
        },        
      },
      shell: {
        options: {
          stdout: true
        },
        protractor_install: {
          command: 'node ./node_modules/protractor/bin/webdriver-manager update'
        },
        npm_install: {
          command: 'npm install'
        },
        webdriver_start: {
          command: 'webdriver-manager start'
        },
        protractor_flake: {
          command: 'node ./node_modules/protractor-flake/bin/protractor-flake'

        },             
       }
  
    });
  
  
    grunt.loadNpmTasks('grunt-protractor-runner');
  
    grunt.loadNpmTasks('grunt-contrib-jshint');
  
    grunt.loadNpmTasks('grunt-shell-spawn');
      
    grunt.registerTask('install', ['shell:npm_install', 'shell:protractor_install']);

    grunt.loadNpmTasks('grunt-protractor-webdriver');

       
    grunt.registerTask('flake',['jshint','protractor_flake']); 
   
    grunt.registerTask('test', ['start-selenium-server', 'stop-selenium-server']);
    
    grunt.registerTask('smoke',['jshint','protractor:singlerun']);

    grunt.registerTask('SIT',['jshint','protractor:SIT']);
    grunt.registerTask('SAT',['jshint','protractor:SAT']);
    grunt.registerTask('OCR',['jshint','protractor:OCR']);
    grunt.registerTask('PROD',['jshint','protractor:PROD']);


    
  
  };