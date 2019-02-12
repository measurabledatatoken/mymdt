#/bin/bash

MODE_ARRAY=("dev" "alpha" "beta" "staging" "production")

command=$1
mode=${MODE_ARRAY[0]}
if ! [ -z "$2" ]; then
  mode=$2
fi


dockerComposerYamlFile="$PWD/docker/$mode/docker-compose.yaml"
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
	echo "Usage: ./docker.sh command [mode]"
	echo "Helpers to tstart the docker compose command"
	echo
	echo "Mode:"
	echo "${MODE_ARRAY[*]} (default: ${MODE_ARRAY[0]})"
	echo
	echo "Commands:"
	echo "init				  Init the volumes need for docker"
	echo "build               Build the docker image"
	echo "run                 Run the docker image"
	echo "clean               Build the docker image"
	echo
	;;
esac
