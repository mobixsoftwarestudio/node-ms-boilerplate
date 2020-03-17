pipeline {
    agent none
    stages {
        stage ("Build & Tests"){
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
        stage('CD Development') {
            agent any
            stages {
                stage("Build/Publish Docker Image"){
                    steps {
                        script {
                            checkout scm
                            app = docker.build("ytalopigeon/node-ms-boilerplate:development")
                            docker.withRegistry('', 'docker-hub-credentials') {
                                app.push("development")
                            }
                        }
                    }
                }
                stage("Run Ansible"){
                    steps {
                        script {
                            sh 'ansible-playbook -i deploy/development/hosts deploy/development/deploy.yml'
                        }
                    }
                }
            }
        }
    }
}