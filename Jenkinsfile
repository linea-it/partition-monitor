pipeline {
  environment {
    registry = "linea/partition-monitor"
    registryCredential = 'Dockerhub'
    dockerImage = ''
    deployment = 'partition-monitor'
    namespace = 'partition-monitor'
    namespace_prod = 'partition-monitor'
    commit = ''
  }
  agent any
  stages {
    stage('Creating version.json') {
      steps {
        sh './version.sh && cat ./src/assets/json/version.json'
      }
    }
    stage('Building and pushing image') {
      when {
        allOf {
          expression {
            env.TAG_NAME == null
          }
          expression {
            env.BRANCH_NAME.toString().equals('master')
          }
        }
      }
    }
    stage('Building and Pushing Image Release') {
      when {
        expression {
          env.TAG_NAME != null
        }
      }
      steps {
        script {
          sh 'docker build -t $registry:$TAG_NAME .'
          docker.withRegistry( '', registryCredential ) {
            sh 'docker push $registry:$TAG_NAME'
            sh 'docker rmi $registry:$TAG_NAME'
          }
        }
      }
    }
  }
}
