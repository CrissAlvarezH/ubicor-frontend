
build:
	sh manage.sh build $(version)

publish:
	sh manage.sh publish $(version)

deploy:
	sh manage.sh deploy
