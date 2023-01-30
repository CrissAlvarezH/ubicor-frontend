
dev:
	docker run --rm --env-file .env.local -p 3000:3000 crissalvarezh/ubicor-frontend:latest

build:
	sh manage.sh build $(version)

publish:
	sh manage.sh publish $(version)

push-img:
	sh manage.sh push-img $(version)

deploy:
	sh manage.sh deploy
