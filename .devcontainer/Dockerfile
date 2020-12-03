# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.148.1/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version: bionic, focal
ARG VARIANT="bionic"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# install node v14.X
RUN apt-get update -yq && \
    apt-get upgrade -yq && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash && \ 
    apt-get install -yq nodejs
