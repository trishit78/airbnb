package router

import (
	"AuthInGo/controllers"
	"AuthInGo/middlewares"

	"AuthInGo/utils"

	"github.com/go-chi/chi/v5"
)

type Router interface{
	Register(r chi.Router)
}


func SetupRouter(UserRouter Router,RoleRouter Router) *chi.Mux {
	chiRouter := chi.NewRouter()

	chiRouter.Use(middlewares.RateLimiterMiddleware)


	chiRouter.Get("/ping",controllers.PingController)
	
	chiRouter.HandleFunc("/photos/*",utils.ProxyToService("https://jsonplaceholder.typicode.com","/photos"))

	UserRouter.Register(chiRouter)
	RoleRouter.Register(chiRouter)
	
	return chiRouter
}




