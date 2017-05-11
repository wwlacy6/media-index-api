.DEFAULT_GOAL:= build
PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash

👍:
	@echo 👍

build:
	@babel src -d dist

clean:
	@rm -rf ./dist
	@rm -rf ./node_modules

install:
	@type yarn 2>/dev/null && yarn || npm set depth=0; npm install --silent $(ARGS)

lint:
	@eslint ./src

test:
	@ava --tap --serial
