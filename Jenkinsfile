pipeline {
  agent any

  tools {
    nodejs 'nodejs'
  }
  environment {
    MONGO_URI = 'mongodb+srv://sasivadlani9:<db_password>@cluster0.hcvi6.mongodb.net/'
    MONGO_USERNAME = credentials('mongouser')
    MONGO_PASSWORD = credentials('mongopswd')
    }
  stages {
    stage('Installing Dependencies') {
      steps {
        sh 'npm install --no-audit'
        sh 'npm start'
      }
    }
    stage('Dependency Sanning') {
        parallel {
            // stage('Dependency Audit') {
            // steps {
            //     sh '''
            //         npm audit --audit-level-critical
            //         echo $?
            //     '''
            // }
            // }
            stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '''
                --scan \'./\'
                --out \'./\'
                --format \'ALL\'
                --prettyPrint''', odcInstallation: 'OWASP-DepCheck12'
                publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'HTML Report DepChkJenk', reportTitles: '', useWrapperFileDirectly: true])
                junit allowEmptyResults: true, keepProperties: true, stdioRetention: '', testResults: 'dependency-check-junit.xml'            }
            }
            }
        }

    stage('Unit Testing') {
      steps {
        sh 'npm start'
      }

    }
    stage('Code Coverage') {
      steps {
        sh 'npm run coverage'
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'coverage', reportFiles: 'index.html', reportName: 'HTML Code Cov Report', reportTitles: '', useWrapperFileDirectly: true])
      }
    }
}
}
