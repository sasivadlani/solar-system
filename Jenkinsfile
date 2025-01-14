pipeline {
  agent any

  tools {
    nodejs 'nodejs'
  }
  stages {
    stage('Installing Dependencies') {
      steps {
        sh 'npm install --no-audit'
        sh 'npm audit fix --force'
      }
    }
    stage('Dependency Sanning') {
        parallel {
            stage('Dependency Audit') {
            steps {
                sh '''
                    npm audit --audit-level-critical
                    echo $?
                '''
            }
            }
            stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '''
                --scan \'./\'
                --out \'./\'
                --format \'ALL\'
                --prettyPrint''', odcInstallation: 'OWASP-DepCheck12'
                publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'HTML Report DepChkJenk', reportTitles: '', useWrapperFileDirectly: true])
                junit allowEmptyResults: true, keepProperties: true, stdioRetention: '', testResults: '/*xml'
            }
            }
            }
        }
    }
}
