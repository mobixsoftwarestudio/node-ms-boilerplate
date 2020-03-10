pipeline {
  agent {
    docker {
      image 'node:12-slim'
    }
  }
  stages {
    stage('Configuration') {
      steps {
        sh 'yarn install'
      }
    }
    stage('Test') { 
      steps {
        sh 'yarn test-ci' 
      }
      post {
        always {
          step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/jest/cobertura-coverage.xml'])
          junit 'output/report/junit/junit.xml'
        }
      }
    }
  }
}