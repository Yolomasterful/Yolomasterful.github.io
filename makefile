all: html-server

sass:
	sass --watch scss/:css/

html-server:
	xdg-open http://localhost:8080
	-tmux new -d -s http http-server

kill-html-server:
	-tmux kill-session -t http

install-sass:
	sudo dnf install sass
