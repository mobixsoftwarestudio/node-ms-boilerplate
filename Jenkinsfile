pipeline {
    agent any
    stages {
        stage('Configuration') {
            agent {
                docker {
                    image 'node:12-slim'
                    args '-p 3434:3434'
                }
            }
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') { 
            agent {
                docker {
                    image 'node:12-slim'
                    args '-p 3434:3434'
                }
            }
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
        stage('Publish Docker Image for development') {
            steps {
                script {
                    def dockerHome = tool 'myDocker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"
                    app = docker.build("ytalopigeon/node-ms-boilerplate:development")
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        app.push("ytalopigeon/node-ms-boilerplate:development")
                    }
                }
            }
        }
    }
}