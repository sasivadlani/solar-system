pipeline {
  agent any

  tools {
    nodejs 'nodejs'
  }
  stages {
    stage('Installing Dependencies') {
      steps {
        sh 'npm install --no-audit'
      }
    }

            stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '''
                --scan \'./\'
                --out \'./\'
                --format \'ALL\'
                --prettyPrint''', obcInstallation: 'OWASP-DepCheck12'
                
            }
            }
    }
}
