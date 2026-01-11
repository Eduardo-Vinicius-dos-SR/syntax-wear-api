import { FastifyInstance } from "fastify";
import { listProducts } from "../controllers/products.controllers";
import { authenticate } from "../middlewares/auth.middleware";

export default async function productRoutes(fastify: FastifyInstance) {
	fastify.addHook("onRequest", authenticate);
	fastify.get("/", listProducts);
}
