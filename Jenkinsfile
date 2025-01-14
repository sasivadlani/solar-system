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
                
            }
            }
            }
        }
    }
}
