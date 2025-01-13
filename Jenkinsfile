pipeline {
  agent any

  tools {
    nodejs 'node236'
  }
  stages {
    stage('Installing Dependencies') {
      steps {
        sh 'npm install --no-audit'
      }
    }
  }
    stages {
    stage('Dependency Audit') {
      steps {
        sh '''
            npm audit --audit-level-critical
            echo $?
          '''
      }
    }
  }
  stages {
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
