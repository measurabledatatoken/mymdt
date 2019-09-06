#/bin/bash

command=$1

dockerComposerYamlFile="$PWD/docker/docker-compose.yaml"
projectDir="$PWD"

case "${command}" in
init)
	sh create-docker-volumes.sh
	;;
build)
	docker-compose -f $dockerComposerYamlFile --project-directory $projectDir build
	;;
run)
	docker-compose -f $dockerComposerYamlFile --project-directory $projectDir up -d
	;;
clean)
	docker-compose -f $dockerComposerYamlFile --project-directory $projectDir down
	;;
logs)
	docker-compose -f $dockerComposerYamlFile --project-directory $projectDir logs -f
	;;
*)
	echo "Usage: ./docker.sh command"
	echo "Helpers to tstart the docker compose command"
	echo
	echo "Commands:"
	echo "init                Init the volumes need for docker"
	echo "build               Build the docker image"
	echo "run                 Run the docker image"
	echo "clean               Build the docker image"
	echo
	;;
esac
