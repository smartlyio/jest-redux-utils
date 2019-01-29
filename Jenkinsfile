@Library('smartly-jenkins-lib') _

pipeline {
  agent any
  options {
    timestamps()
    timeout(time:5, unit:'MINUTES', activity: true)
    disableConcurrentBuilds()
  }
  stages {
    stage('Build test image') {
      steps {
        sh 'docker-compose build test'
      }
    }
    stage('Test') {
      steps {
        script {
          def repoName = currentBuild.fullProjectName.tokenize('/')[1]
          env.COMPOSE_PROJECT_NAME="$repoName-$JOB_BASE_NAME-$BUILD_ID"
          sh 'docker-compose run test'
        }
      }
    }
  }
  post {
    always {
      sh "docker-compose down --volumes"
    }
  }
}
