mongodb:
	docker run --name mongodb -p 27017:27017 -d mongodb:lates


keycloack:
	docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:21.0.1 start-dev

server: 
	yarn start:dev

.PHONEY: mongodb server keycloack
