const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

// API
// routes.add(route_name, pattern = /name, page_filename = name)

// Example
// routes.add('article', '/article/:id(\\d+)')

routes.add('home', '/', 'index')
routes.add('checkbill', '/checkbill')
routes.add('order', '/order')
routes.add('entry', '/:id(\\d+)/')
routes.add('category', '/category/:id(\\d+)/')
