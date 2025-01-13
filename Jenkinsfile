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
}
