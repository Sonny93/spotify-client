db:
	docker compose -f dev.docker-compose.yml up -d

prod:
	docker compose up -d --build
