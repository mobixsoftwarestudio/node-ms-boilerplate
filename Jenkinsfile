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
                sh 'yarn test' 
            }
        }
    }
}