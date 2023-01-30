
build:
	sh manage.sh build $(version)

publish:
	sh manage.sh publish $(version)

push-img:
	sh manage.sh push-img $(version)

deploy:
	sh manage.sh deploy
