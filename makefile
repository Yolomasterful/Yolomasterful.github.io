all:  sass html-server open-page

kill: kill-sass kill-html-server

sass:
	-tmux new -d -s sass sass --watch scss/:css/

kill-sass:
	-tmux kill-session -t sass

html-server:
	-tmux new -d -s http http-server

kill-html-server:
	-tmux kill-session -t http

open-page:
	xdg-open http://localhost:8080