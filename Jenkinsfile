pipeline {
    agent {
        docker {
            image 'node:12-slim'
            args '-p 3434:3434'
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
							}
						}
        }
    }
}