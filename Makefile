PROJECT_NAME ?= mdtwallet-webapp
MDTWALLET_APP ?= mdtwallet-app
INDEX ?= 1

.PHONY: build-dev run-dev clean-dev build-staging run-staging clean-staging staging-logs app-logs

build-dev:
	${INFO} "Building development docker images..."
	@ docker-compose -f docker-compose.dev.yaml build
	${INFO} "Done"

run-dev:
	${INFO} "Running development environment..."
	@ docker-compose -f docker-compose.dev.yaml up $(BACKGROUND)

clean-dev:
	${INFO} "Cleaning development environment..."
	@ docker-compose -f docker-compose.dev.yaml down

build-staging:
	${INFO} "Building staging docker images..."
	@ docker-compose -f docker-compose.staging.yaml build
	${INFO} "Done"

run-staging:
	${INFO} "Running staging environment..."
	@ docker-compose -f docker-compose.staging.yaml up -d

clean-staging:
	${INFO} "Cleaning staging environment..."
	@ docker-compose -f docker-compose.staging.yaml down

staging-logs:
	@ docker-compose -f docker-compose.staging.yaml logs -f

app-logs:
	@ docker logs -f $(PROJECT_NAME)_$(MDTWALLET_APP)_$(INDEX)

# Cosmetics
YELLOW := "\e[1;33m"
NC := "\e[0m"

# Shell Functions
INFO := @bash -c '\
	printf $(YELLOW); \
	echo "=> $$1"; \
	printf $(NC)' SOME_VALUE

ifeq ($(background), true)
  BACKGROUND = -d
else
  BACKGROUND =
endif
