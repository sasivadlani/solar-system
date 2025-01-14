pipeline {
  agent any

  tools {
    nodejs 'nodejs'
  }
  environment {
    MONGO_URI = 'mongodb://localhost:27017/solar_system'
    MONGO_USERNAME = credentials('mongouser')
    MONGO_PASSWORD = credentials('mongopswd')
    SONAR_SCANNER_HOME = tool 'SonaeQubeScanner62';
    }
  stages {
    stage('Installing Dependencies') {
      steps {
        sh 'npm install --no-audit'
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

    stage('SonarQube') {
      steps {
        sh 'echo $SONAR_SCANNER_HOME'
        sh '''
        sonar-scanner \
  -Dsonar.projectKey=SolarSystem \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=sqp_d650548b0c8fa53e4fd2d5cf940e6bd0110f59fd
        '''
      }

    }
    stage('Code Coverage') {
      steps {
        catchError(message: 'Unstable', stageResult: 'UNSTABLE') {
          sh 'npm run coverage'
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'coverage', reportFiles: 'index.html', reportName: 'HTML Code Cov Report', reportTitles: '', useWrapperFileDirectly: true])
    // some block
}
        
      }
    }
}
}
