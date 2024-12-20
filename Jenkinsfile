pipeline {
    agent any
    tools {
        node 'NodeJs'
    }
    stages {
        stage("init") {
            steps {
                script {
                    gv = load "script.groovy"
                }
            }
        }
        stage("install packages") {
          steps {
            script {
              gv.installPackage()
            }
          }
        }
        stage("build dist") {
            steps {
                script {
                    gv.buildDist()
                }
            }
        }
        stage("build image") {
            steps {
                script {
                    gv.buildImage()
                }
            }
        }
        stage("deploy") {
            steps {
                script {
                    gv.deployApp()
                }
            }
        }
    }
}
